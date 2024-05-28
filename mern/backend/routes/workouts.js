import express from 'express';

import {createWorkout,getWorkouts,getSingleWorkout,deleteWorkout,updateWorkout} from "../controllers/workoutControllers.js";
const router = express.Router();





// GET all workouts  
router.get('/', getWorkouts);



// GET a single workout
router.get('/:id', getSingleWorkout);




// POST a new workout
router.post('/', createWorkout);





// DELETE a workout
router.delete('/:id', deleteWorkout);




// UPDATE a workout
router.patch('/:id', updateWorkout);

export default router;


// mongodb+srv://gollateja93:<password>@cluster0.otujizr.mongodb.net/