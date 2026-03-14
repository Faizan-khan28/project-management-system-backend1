import Task from "../model/task.js";

export const createTask = async (req,res)=>{
    try {

        const {projectId,title,description,dueDate,priority,assignedTo} = req.body;

        const task = await Task.create({
            projectId,
            title,
            description,
            dueDate,
            priority,
            assignedTo
        })

        res.status(201).json({
            success:true,
            message:"Task created successfully",
            task
        })

    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
} 

export const getProjectTasks = async (req,res)=>{
    try {

        const {projectId} = req.params;

        const tasks = await Task.find({projectId})
        .populate("assignedTo","name email")

        res.status(200).json({
            success:true,
            tasks
        })

    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}

export const updateTaskStatus = async (req,res)=>{
    try {

        const {status} = req.body;
        const {taskId} = req.params;

        const task = await Task.findByIdAndUpdate(
            taskId,
            {status},
            {new:true}
        )

        res.status(200).json({
            success:true,
            message:"Status updated",
            task
        })

    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}

export const assignUsersToTask = async (req,res)=>{
    try {

        const {taskId} = req.params;
        const {assignedTo} = req.body;

        const task = await Task.findByIdAndUpdate(
            taskId,
            {assignedTo},
            {new:true}
        )

        res.status(200).json({
            success:true,
            message:"Users assigned successfully",
            task
        })

    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}


export const getMyTasks = async (req,res) => {

 try {
   console.log("USER ID:", req.userId)
   const tasks = await Task.find({
   assignedTo: { $in: [req.userId] }
  })
  .populate("projectId","projectName")

  res.status(200).json({
   success:true,
   tasks
  })

 } catch (error) {

  console.log("MY TASK ERROR:", error)

  res.status(500).json({
   message:"Error fetching tasks"
  })

 }

}