import { useState } from "react"
import { useNavigate } from "react-router-dom"
import NewWorkoutForm from "./NewWorkoutForm"

const initInputs =({
    name: '',
    day: ''
})

function LogWorkout(props){

    const navigate = useNavigate()

    const {addNewWorkout, newWorkoutId} = props

    const [workoutInputs, setWorkoutInputs] = useState(initInputs)

    const [isIdSaved, setIsIdSaved] = useState(false)

    function handleChange(e){
        const {name, value} = e.target
        setWorkoutInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function HandleSubmit(e){
        e.preventDefault()
        addNewWorkout(workoutInputs)
        setIsIdSaved(true)
    }


    return(
        <div className="log-workouts-grid">
            <div className="log-workouts-column1"></div>    
            <div className="log-workouts-container">
                <h1>Log Workout</h1>
                
                    {!isIdSaved && 
                    <form className="new-workout-form" onSubmit={HandleSubmit}>
                        <h4>Add a Name For Easier Searching Later</h4>
                        <label htmlFor="name">Optional</label>
                        <input 
                            placeholder="Ex. Chest Day"
                            id="name"
                            name="name"
                            value={workoutInputs.name}
                            onChange={handleChange}
                            />
                        <h4>Choose Date to Start Logging Your Workout</h4>
                        <label htmlFor="date-input">Date: </label>
                        <input 
                            type='date'
                            id="date-input"
                            name= "day"
                            value={workoutInputs.day}
                            onChange={handleChange}
                            required= {true}
                            />
                        <button>Confirm Date</button>
                    </form>}

                    {isIdSaved && 
                    <button onClick={() => navigate(`/log/addexercise/${newWorkoutId._id}`)}
                    >Add Exercises</button>}
                
            </div>
        </div>
    )
}

export default LogWorkout