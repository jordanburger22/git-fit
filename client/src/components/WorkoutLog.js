import { useEffect } from "react"
import { Link } from "react-router-dom"

function WorkoutLog(props){
    const {workouts, getWorkouts} = props

    workouts.reverse()


    useEffect(() => {
        getWorkouts()
    },[])

    const workoutList = workouts.map(workout => (
         
        <Link className="workout-log-link" to={`/pastworkouts/${workout._id}`}>
            <div className="workout-log">
                
                <h1>Workout on {workout.day}</h1>

                {workout.name && 
                <h1>{workout.name}</h1>}

            </div>
        </Link>
    ))

    return(
        <div className="workout-log-grid">
            <div className="workout-log-column1"></div>
            <div className="log-container">
                <h1>Workout Log</h1>
                {workouts.length > 0 && 
                workoutList
            }
                {workouts.length === 0 &&
                    <div className="no-workouts">
                        <h3>No Workouts Logged</h3>
                        <h3>Go to</h3>
                        <Link to='/log'><h3>Log Workout</h3></Link>
                        <h3>To Log Your First Workout</h3>
                    </div>
                }
            </div>
        </div>
    )
}

export default WorkoutLog