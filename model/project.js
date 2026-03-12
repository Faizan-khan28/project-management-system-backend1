import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({

  projectName:{
    type:String,
    required:true
  },

  Description:{
    type:String,
    required:true
  },

  startDate:{
    type:String
  },

  endDate:{
    type:String
  },

  status:{
    type:String,
    enum:["Pending","Active","Completed"],
    default:"Pending"
  },

  members:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }]

},{timestamps:true})

const Project = mongoose.model("Project",projectSchema);
export default Project;