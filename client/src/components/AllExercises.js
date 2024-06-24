import { useState } from "react"


function AllExercises(props){
    const {baseExercises, filterExercises} = props
 
    const exerciseList = baseExercises.map(exercise => (
        <div className="exercise-info"> 
            <h1>{exercise.name}</h1>
            <h3>Main Muscle Group: {exercise.mainMuscleWorked}</h3>
            {exercise.secondaryMuscleWorked && 
            <h3>Secondary Muscle Group: {exercise.secondaryMuscleWorked}</h3>}
        </div>   
    ))


    return(
        <div className="all-exercises-container">
            <div className="all-exercises-filter">
                <h1>Exercises</h1>
                <label htmlFor="select">Filter by Muscle Group </label>
                <select id="select" onChange={filterExercises}>
                    <option>All</option>
                    <option>Chest</option>
                    <option>Back</option>
                    <option>Legs</option>
                    <option>Shoulders</option>
                    <option>Biceps</option>
                    <option>Triceps</option>
                    <option>Cardio</option>
                </select>
            </div>

            <div className="all-exercises-list">
                {exerciseList}
            </div>
            <div className="all-exercises-container-column2">

            </div>
        </div>
    )
}

export default AllExercises