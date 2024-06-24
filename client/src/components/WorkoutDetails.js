import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import UserExerciseList from "./UserExerciseList"



function WorkoutDetails(props){

    const navigate = useNavigate()

    const {
        getUserExercises,
        userExercises,
        deleteWorkout, 
        deleteExercisesbyWorkout,
        editExercise,
        deleteOneExercise
    } = props

    const {workoutId} = useParams()

    userExercises.reverse()

    const exerciseList = userExercises.map(exercise => {
        return <UserExerciseList
                {...exercise}
                edit = {editExercise}
                deleteOne = {deleteOneExercise}
                id = {exercise._id}
            />
    })


    function handleDelete(){
        deleteWorkout(workoutId)
        deleteExercisesbyWorkout(workoutId)
        navigate('/pastworkouts')
    }

    useEffect(() => {
        getUserExercises(workoutId)
    }, [])

    return(
        <div className="workout-details-grid">
            <div className="workout-details-column1"></div>
            <div className="workout-details-container">
                <h1>Workout Details</h1>
                {exerciseList}
                <button onClick={() => handleDelete()}>Delete Workout</button>
            </div>
        </div>
    )
}

export default WorkoutDetails