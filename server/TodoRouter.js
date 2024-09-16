const app = require('express').Router()
const mongoose = require('mongoose')
const multer = require("multer")
const path = require('path')
const {Task, user, Notification } = require("./Modules")
const fs = require('fs')
const storage = multer.diskStorage({
     destination : (req , file , cb ) =>{
            cb(null , "./public/images")
            
     },
     filename : (req , file , cb ) =>{
        cb(null, 'Profile'+ Date.now() + "."+ file.originalname.split('.')[1] )
     }
}) 
const upload = multer({
    storage ,
    limits : {
        fileSize : 1000000
    }
    , 
    fileFilter : (req , file , cb)=>{
         ( function(file , cb){
                const validExtions = /jpeg|png|jpg|svg/
               if( validExtions.test(path.extname(file.originalname))){
                cb(null , true)
               }
               else{
                cb(null , false)
               }


          })(file , cb)
    }
})



  app.get("/", async (req ,res)=>{
                try{
                    let tt = []
                   let tasks =  await  Task.model.find( {admin : req.user._id}).sort({status :1}).sort({priority : 1}) 
                   let t = await Task.model.find();

                    let userTasks = t.filter(task =>
    task.users.some(user => user._id == req.user._id)

);
    const nt = await  Notification.find({ user : req.user._id})         
                   res.json({tasks : tasks.concat(userTasks) , nt })
                }
                catch(e){
                    console.log(e.message)
                }

        
  })
  app.get("/users", async (req ,res)=>{
                try{
                   let users =  await user.find({$and : [{ association : req.user.association }, { _id :{ $ne :  req.user._id} }]}).select(["name" ,"_id" , "color"])
      
                   res.json(users)
                }
                catch(e){
                    console.log(e.message)
                }

        
  })
  app.get("/MyProfile/:id", async (req ,res)=>{
    try{
        
      const {name , email , association , ImageProfile} = req.user
   
      const path = `${__dirname +"\\public\\images\\" + ImageProfile.fileName}`
       let imageBase64 = '' ;
        const reader = fs.createReadStream(path , {encoding : 'base64' } )
        let i = 0 ; 
              reader.on("data" , (chunk)=>{
                imageBase64 += chunk  
              }).on("end" ,  ()=>{
                res.status(200).json({name , email , association , ImageProfile :{ imageBase64  , mineType : ImageProfile.mineType  }})
              })
    }
    catch(e){
        console.log(e.message)
    }


})
app.patch("/MyProfile/:id", upload.single('profile') ,async (req ,res)=>{
    try{
         const d = !req.file ? {  ...req.body } : {...req.body , ImageProfile : {fileName :  req.file.filename , mimeType : req.file.mimetype} }
         user.findByIdAndUpdate(req.user._id ,d).then(
            res.status(200).json({userUpdate : true})
          )  
         
    }
    catch(e){
        console.log(e.message)
    }


})
  /* app.get("/CreateGroupe", async (req ,res)=>{
    try{
       let data =  await  user.find({association : "nabilTeam"})
       res.json(data)
    }
    catch (e){
        console.log("error",e.message)
    }
} ) */
app.post("/CreateTask",(req,res)=>{
   try{
    const   data  =  req.body
    new Task(
            {
                admin : req.user._id
                , 
                Tusers : data.users ,
                date : data.endDate , 
                Tname : data.taskName,
                priority : data.priority,
                desc : data.desc , 
          

            }
        )
        res.status(200).send("add successful")
   }
   catch(e){
    console.log(e)
   }
})
app.delete('/:id' ,(req , res)=>{
       Task.model.deleteOne({_id : req.params.id }).then(
       )
       .catch(err =>console.error(err))
       res.json({delete : 'success'})
})
app.patch('/:id' ,  (req , res)=>{
     const {id } = req.params
    if(mongoose.isValidObjectId(id)){
     Task.model.findByIdAndUpdate(id ,{...req.body},{new : true}).then(
          res.status(200).json({update : true })
     )     
    }
    
})
app.get('/details/:id' , async (req , res)=>{
    const {id} = req.params
    const {name , color }  = req.user
      try{
        const task = await Task.model.findOne({_id : id})
           res.json({task , admin  : {name  , color} })
      }
      catch(e){
        console.log(e.message)
      }
})

module.exports = app