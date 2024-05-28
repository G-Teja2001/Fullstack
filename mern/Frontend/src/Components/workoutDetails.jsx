import { useWorkoutContext} from '../hooks/useWorkoutContext'

// date fns used to tell a minute ago or hour ago ( npm install date-fns)

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function Workoutdetails(props){
    const { workout } = props;

    const {dispatch} = useWorkoutContext();
    const handleClick = async()=>{

        const response = await fetch('http://localhost:3000/api/workouts/'+ workout._id,{
            method:'DELETE'

        })

        const json = await response.json()

        console.log(json);

        console.log(workout._id);

        if(response.ok){
            dispatch({type:'DELETE_WORKOUT',payload:workout._id})
        }
        else{
            throw Error(response.Error)
        }
    }
   
  

    return(
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg):</strong>{workout.load}</p>
            <p><strong>Reps:</strong> {workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})  }</p>
            <span className= "material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )

}

export default Workoutdetails;