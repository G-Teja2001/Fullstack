import { useState } from "react"
import { useWorkoutContext} from "../hooks/useWorkoutContext"
function Newform(){
    
    const {dispatch} = useWorkoutContext();
    const [title,setTitle] = useState('')
    const [load,setload] = useState('')
    const [reps,setreps] = useState("")
    const [error,setError] = useState(null)
    
    // for cheking the form if it is empty and user submitting it so we are taking control and sending error 

    const [emptyFields,setemptyFields] = useState([])

    const handleSubmit = async(e)=>{

        e.preventDefault()
        
        const workout = {title,load,reps}

        const response = await fetch("http://localhost:3000/api/workouts/",{
            method:"POST",
            body: JSON.stringify(workout),
            headers:{

                'Content-Type':'application/json'
            }
        })


        const json = await response.json();

        if(!response.ok){
            setError(json.error)
            setemptyFields(json.emptyFields)
            console.log(json.emptyFields)
            return;
        }


            
            setTitle('')
            setload('')
            setreps('')
            // if the respose is okay we setting that or showing that emptyfields is none by giving empty lst to avoid error on the ui 
            setError(null)
            setemptyFields([])
            
            console.log('new workout added:', json)

            dispatch({type:'CREATE_WORKOUT',payload:json})
          
      
        

    }




    return (
    <form className="create" onSubmit={handleSubmit}>
        <h3> Add a New workout</h3>

        <label>Exercise Title:</label>
        <input type="text"
        onChange={(e)=>setTitle(e.target.value)}
        value = {title}

        // we can use the emptyFilds array to conditionally style this different inputs that means not entred means showing red border 

        className={emptyFields.includes('title') ? 'error' : ''} 
        />

        <label>Load in Kg:</label>
        <input type="text"
        onChange={(e)=>setload(e.target.value)}
        value = {load}

        className={emptyFields.includes('load') ? 'error' : ''} 
        />

        <label>Number of Reps:</label>
        <input type="text"
        onChange={(e)=>setreps(e.target.value)}
        value = {reps}
        className={emptyFields.includes('reps') ? 'error' : ''} 
        />


    <button>Add Workout</button>
      {error && <div className="error">{error}</div>}

    </form>
    )
}


export default Newform;