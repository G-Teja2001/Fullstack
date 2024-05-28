import React from "react";
import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

export  const useWorkoutContext = ()=>{

    const context = useContext(WorkoutContext)

    if(!context){
        throw Error('useWorkoutcontext must be used inside the WorkoutcontextProvider ')
    }

    return context 
}