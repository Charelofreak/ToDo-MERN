const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const validator = require("validator")
const Schema = mongoose.Schema;


const N = new Schema({
      user : {
        type :String 
      } , 
      sender : {
        type : Object 
      }
      , 
      msg : {
        type : String 
      }
})
const U = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  association: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  color : {
    type : String 
  }
     , 
     ImageProfile : {
       type : Object  , 
       default : null
     }
});
const T = new Schema({
  taskName: {
    type: String,
    require: true,
  },
  
    users :{
       type : Object,
       require : false  
    }
  
  ,
  admin: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
    require: true,
  },
  
  priority: {
    type: Number,
    require: false,
  },
  status: {
    type: String
  },
  endDate: {
    type: Date,
    require: true,
  },
} , {
  timestamps : true
});


U.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Incorrect email or password');
  }
  const match = await bcrypt.compare(password, user.password);
  console.log(`Password match: ${match}`); // Log the match result

  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};
U.statics.signup = async function (name, email, association, password, color , defaultPic) {
  let pass = String(password).trim();

  // Validation
  if (!name || !association || !email || !password) {
    throw Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }
  if (!validator.isStrongPassword(pass)) {
    throw Error('Password not strong');
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(pass, salt);
  console.log(`Generated hash: ${hash}`); // Log the generated hash

  const user = await this.create({ name, association, email, password: hash, color  ,ImageProfile :  defaultPic});
  return user;
};

const user = mongoose.model("user", U);
const task = mongoose.model("task", T);
class Task {
  static model = task;
  constructor({Tname, admin ,Tusers = [] , status = 0 , desc, date , priority}) {
    const u = new Task.model({
      taskName: Tname,
      admin : admin,
      users: Tusers,
      desc,
      status ,  
      priority ,
      endDate: date,
    });
    u.save();
  }
}
const Notification = mongoose.model("Notification" , N)



/* for (let index = 0; index < 30 ; index++) {
    new User('nabil'+index , "filalinabil0"+index+"@gmail.com" , "nabil1234","nabilTeam")
} */
module.exports = {
  user, 
  Task,
  Notification
};
  