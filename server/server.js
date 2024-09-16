require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const jwt  = require('jsonwebtoken');
const { user, Groupe, Task , Notification} = require("./Modules");
const app = express();
const cors = require('cors');
const { Server } = require("socket.io");
const TodoRouter = require("./TodoRouter");
const { error } = require('console');
const { send } = require('process');
const server = require('http').createServer(app);
let  usersConnected = []

// Properly setup CORS middleware
app.use(cors({}));
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"]
    }
});

function createToken(id){
    return jwt.sign(id, process.env.SECRET);
}

function generateColor(){
    let color = 0;
    while(color < 300){
        color = Math.random() * 1000;
    }
    return '#' + parseInt(color).toString(16);
}

app.use(express.json());

app.post("/login", async function (req, res){
    const { email, password } = req.body; 
    try {
        const u = await user.login(email, password);
        const t = createToken({ id: u._id });
        res.json({ login: t, user: u._id });
    } catch(e) {
        res.status(400).json
        ({ error: e.message });
    }
});

app.post("/signup", async function (req, res){
    const { name, email, association, password   } = req.body; 
    const defaultPic = { fileName  : "default.jpeg" , mimeType : "image/jpeg"}
    try {
        const u = await user.signup(name, email, association, password, generateColor() ,defaultPic );
        const t = createToken({ id: u._id });
        res.json({ login: t, user: u._id });
    } catch(e) {
        console.log(e);
        res.status(400).json({ error: e.message });
    }
});

app.use(async (req, res, next) => {
    const { auth } = req.headers;
    try {
        if (!auth) {
            throw new Error('access denied');
        }

        const { id } = jwt.verify(auth, process.env.SECRET);

        if (!id) {
            throw new Error('authorization denied');
        }

        req.user = await user.findOne({ _id: id });
        next();
    } catch(e) {
        res.json({ err: e.message });
    }
});

io.on('connection', (sc) => {
   console.log(sc.id)


  sc.on("newUser" , async (u)=>{
    if( !usersConnected.some(e => e.userId  === u ))
      usersConnected.push({socketId : sc.id , userId : u }) 
        const notifica = await Notification.find({user : u})
   io.to(sc.id).emit("getOldNotification" , JSON.stringify(notifica))
  }) 
  sc.on("disconnect" , (reason)=>{
    console.log(reason)
    usersConnected = usersConnected.filter(e => e.socketId !== sc.id)

  })
  sc.on("deleteTask" , async (data)=>{
    const {task , u} = JSON.parse(data)
    console.log( "id" , task , "u", u)
          const users = []
          const sender  = await user.findOne({_id : u }).select(["name" , "_id"])
       if ( task && sender){
                   task.users.forEach( e => {
                    users.push(e._id)
                        Notification.create({
                            user : e._id , 
                            sender , 
                            msg : "deleteTask"
                        })
                   })
             
               usersConnected.forEach( e => {
                users.forEach (u =>{
                       if(u == e.userId){
                        io.to(e.socketId).emit("getNotification" ,JSON.stringify({ task : task._id  ,sender}))
                    }
                })
               })
                   
       }
  })
  

  


    sc.on("addTask" ,  async (data )=>{
           const task = await Task.model.find( {admin : data }).sort({_id : -1 }).limit(1)
           const u = await user.find({_id : data }).limit(1).select(["name" , "_id"])
               const users = task[0] ? task[0].users : []

             Array.from(users).forEach((e,i )=>
                {
          
                       Notification.create({
                        sender : u[0],
                        msg : "add" , 
                        user :   e._id
                       })
                }
                )
         const addedUsers = usersConnected.filter(e =>  users.some(t =>  t._id === e.userId))
         addedUsers.forEach( e =>   {
          

            io.to(e.socketId).emit("getNotification" ,JSON.stringify({ task : task._id  ,sender :u[0]}))
         })
        }
       
        )
        sc.on("readAll" , async(u)=>{
            const res = await Notification.deleteMany({user : u})
        })
        sc.on('taskStateChange' ,  async(data)=>{
                 const {u  , status , taskId  } = JSON.parse(data)
                 try{
                 const Id = [ ]
                   let task =  await  Task.model.findOne( {_id : taskId}).sort({status :1}).select(['admin' , 'users'])
                     const sender = await  user.findOne({_id : u}).select(["name" , "_id"])
             

                   if (u !== task?.admin) 
                        Id.push(task?.admin)
                       task.users.forEach(e =>{
                        if (u !== e._id)
                        Id.push(e._id)
                      })
                      
                      
                        Id.forEach( e =>{
                                console.log(JSON.stringify(sender))
                                Notification.create({
                                    user :  e,
                                    sender : sender , 
                                    msg  : 'status'+status
                                   })
                        })



                     usersConnected.forEach(( e ,i)=> {
                        Id.forEach(( t, j)=>{
                           if(e.userId == t){
                               io.to(e.socketId).emit("getNotification" , JSON.stringify({ task : task._id , msg :"status" + status  , sender}))
                           }
                        }) 
                     }
                      )
                      
                } 
                    catch(e){
                        console.log(e.message)
                    }

        })


        sc.on("updateTask" ,  async (data)=>{
        try{
            const {id , oldUsers , admin} =  JSON.parse(data) ; 
            const task = await Task.model.findById(id)
            const u = await user.find({_id : admin }).limit(1).select(["name" , "_id"])
                  if (!task){
                         throw error("no task with this id")  
                  }
                 
                 const addUsers =   task.users.filter(e => oldUsers.every(element => e._id !== element._id ))
                 const removeUsers =  oldUsers.filter(e => task.users.every(element => e._id !== element._id ))
            addUsers.forEach(element => {
                    Notification.create({
                            sender : u[0] ,
                            msg   : "add" , 
                            user :  element._id
                    })
            });
            removeUsers.forEach(element => {
                Notification.create({
                        sender :u[0]  ,
                        msg   : "remove" , 
                        user :   element._id
                })
        });

          removeUsers.forEach( e =>{
            const socketIds  =  usersConnected.filter( t => t.userId === e._id)
          
            io.to(socketIds[0].socketId).emit('getNotification' ,JSON.stringify({ task : task._id  ,sender :u[0]}))
          })
          addUsers.forEach( e =>{
            const socketIds  =  usersConnected.filter( t => t.userId === e._id)
          
            io.to(socketIds[0].socketId).emit('getNotification' ,JSON.stringify({ task : task._id  ,sender :u[0]}))
          })  
      

        }
        catch(e){
            console.log(e)
        }

         }
        
         )
    
});

app.use("/todos/", TodoRouter);

mongoose.connect('mongodb://localhost:27017/PFE')
    .then(() => {
        server.listen(4000, () => {
            console.log("server is listening on port 4000");
        });
    })
    .catch(err => console.log("error in connection", err));
