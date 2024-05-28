import workoutSchema from '../models/workoutmodel.js';
import mongoose from 'mongoose';
// get all workouts 

const getWorkouts = async(req,res)=>{
    console.log("data is fetched")
    const allWorkouts = await workoutSchema.find({}).sort({createdAt:-1})
    res.status(200).json(allWorkouts)
}

// get single workout 

const getSingleWorkout = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)){ // checking the id is correct or not 
            return res.status(404).json({error:"No such workout found"})
        }
        const workout = await workoutSchema.findById(id);
        if (!workout) {
            return res.status(404).json({ error: "No such workout found" });
        }
        res.status(200).json(workout);
    } catch (err) {
        console.error("Error in fetching the workout", err);
        res.status(500).json({ error: "Internal server error" });
    }
};



// creating  a new workout 
const createWorkout = async(req,res)=>{
const {title,reps,load} = req.body;

// handling the error that when title or reps or load  not entered
let emptyFields = [];

if(!title){
    emptyFields.push('title')
}

if(!reps){
    emptyFields.push('reps')
}

if(!load){
    emptyFields.push('load')
}
// cheking if the emptyFields length is greater than 0 that means we found something that user not entered 

if(emptyFields.length > 0){
    console.log("ERROR EMPTY FIELDS")
    return res.status(400).json({error:"Please fill the all the fields",emptyFields})   
}

  try{
    const workout = await workoutSchema.create({title,reps,load})
    res.status(200).json(workout)
  }catch(err){
    console.error("Error in creating the data ",err)
  }

}




// delete a work out 


const deleteWorkout = async(req,res)=>{

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"ENtered wrong document id "})
    }
    const workouttodelete = await workoutSchema.findById(id)

    if(!workouttodelete){
        return res.status(404).json({error:"There is no document found this id"})
    }
    await workoutSchema.deleteOne(workouttodelete)
    
    const allWorkouts = await workoutSchema.find({}).sort({createdAt:-1})
    res.status(200).json(allWorkouts)
}


// Update a workout 

const updateWorkout = async(req,res)=>{
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"ENtered wrong document id "})
    }
    const workouttoupdate = await workoutSchema.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!workouttoupdate){
        return res.status(404).json({error:"There is no document found this id"})
    }
    res.status(200).json(workouttoupdate)
    
 }


export {createWorkout,getWorkouts,getSingleWorkout,deleteWorkout,updateWorkout};