import { useState } from "react"
import NewWorkoutForm from "./NewWorkoutForm"

function UserExerciseList(props){

    const{ name, weightLifted, reps, id, sets, distance, time, deleteOne, edit} = props

    const [toggle, setToggle] = useState(true)

    function changeToggle(){
        setToggle(prevToggle => !prevToggle)
    }


    return(
        <div className="detailed-exercise-container">
            {toggle && <>
            <div  className="detailed-exercise">
                <h1>{name}</h1>

                {weightLifted && 
                <p>Weight: {weightLifted}</p>}

                {reps && 
                <p>Reps: {reps}</p>}

                {sets && 
                <p>Sets: {sets}</p>}

                {distance && 
                <p>Distance: {distance}</p>}

                {time && 
                <p>Time: {time}</p>}
                <button onClick={changeToggle}>Edit</button>
                <button onClick={() => deleteOne(id)}>Delete</button>
            </div>
            </>}
            {!toggle && <>
                <NewWorkoutForm 
                    name = {name}
                    weightLifted= {weightLifted}
                    reps= {reps}
                    id = {id}
                    sets = {sets}
                    distance = {distance}
                    time = {time}
                    btnText = 'Save'
                    onSubmit = {edit}
                    changeToggle= {changeToggle}
                />
            </>}
        </div>
        

    )
}

export default UserExerciseList