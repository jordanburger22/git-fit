import NewWorkoutForm from "./NewWorkoutForm"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import UserExerciseList from "./UserExerciseList"

function AddUserExercise(props){

    const {userExercises, addNewExercise, getUserExercises, deleteOneExercise, editExercise} = props
    const{workoutId} = useParams()

    useEffect(() => {
        getUserExercises(workoutId)
    }, [])

    userExercises.reverse()

    

    const exerciseList = userExercises.map(exercise => {
        return <UserExerciseList 
            {...exercise}
            key={exercise._id}
            edit= {editExercise}
            deleteOne = {deleteOneExercise}
            id={exercise._id}
        />
    })



    return(
        <div className="add-workout-grid">
            <div className="add-workout-column1"></div>
            <div className="add-workout-container">
                <h1>Add Exercises</h1>

                <NewWorkoutForm
                {...userExercises} 
                onSubmit= {addNewExercise}
                id = {workoutId}
                btnText = 'Add Exercise'
                />

                {exerciseList}
            </div>
        </div>
    )
}

export default AddUserExercise