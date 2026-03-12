import Project from "../model/project.js"

export const createProject = async (req,res) => {

    const { projectName, Description, startDate, endDate, status } = req.body

    if(!projectName || !Description || !startDate || !endDate || status === undefined){
        return res.status(400).json({
            message:"All fields are required"
        })
    }

    try {

       

        const project = await Project.create({
            projectName,
            Description,
            startDate,
            endDate,
            status,
            userId: req.userId
        })
        console.log(req.userId)

        return res.status(201).json({
            message:"Project created successfully",
            project
        })

    } catch (error) {
         console.log(error.message)
        return res.status(500).json({
            message:"Error creating project"
        })

    }
}

export const getProjects = async (req,res)=>{
 try {

   const projects = await Project.find().populate("members")

   res.status(200).json(projects)

 } catch (error) {
   res.status(500).json({message:error.message})
 }
}

export const getProjectById = async (req,res)=>{
 try {

   const project = await Project.findById(req.params.id)
   .populate("members")

   res.status(200).json(project)

 } catch (error) {
   res.status(500).json({message:error.message})
 }
}

export const assignUsers = async (req,res)=>{
 try {

   const {members} = req.body;

   const project = await Project.findByIdAndUpdate(
     req.params.id,
     {members},
     {new:true}
   )

   res.status(200).json(project)

 } catch (error) {
   res.status(500).json({message:error.message})
 }
}

export const updateProject = async (req,res)=>{
 try {

   const project = await Project.findByIdAndUpdate(
     req.params.id,
     req.body,
     {new:true}
   )

   res.status(200).json(project)

 } catch (error) {
   res.status(500).json({message:error.message})
 }
}