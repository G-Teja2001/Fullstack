import React, { useEffect, useState } from "react";
import Workoutdetails from "../src/Components/workoutDetails";
import Newform from "../src/Components/Newform";

import { useWorkoutContext } from "../src/hooks/useWorkoutContext";

function Home() {
    
    const {workouts,dispatch} = useWorkoutContext()  // this is custom hook  calling and here using reducer hook to change the state based on the condtion 
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/workouts/');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log(response)
          
            const json = await response.json();
            
            // if the response is okay changing the state using reducer 
            if(response.ok){

                dispatch({type:'SET_WORKOUTS',payload:json})

            }

        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="home">
            {error ? (
                <div>Error: {error}</div>
            ) : (
                <div className="workouts">
                    {workouts && workouts.map(workout => (
                        <Workoutdetails key={workout._id}
                            workout = {workout} />
                    ))}
                </div>

            )}

        
        <Newform/>
        </div>
    );
}

export default Home;
