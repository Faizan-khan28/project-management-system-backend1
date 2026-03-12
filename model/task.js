import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({

  projectId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Project"
  },

  title:{
    type:String,
    required:true
  },

  description:{
    type:String
  },

  dueDate:{
    type:Date
  },

  priority:{
    type:String,
    enum:["Low","Medium","High"]
  },

  status:{
    type:String,
    enum:["Pending","Started","Completed"],
    default:"Pending"
  },

  assignedTo:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }]

},{timestamps:true})

const Task = mongoose.model("Task",taskSchema);
export default Task;