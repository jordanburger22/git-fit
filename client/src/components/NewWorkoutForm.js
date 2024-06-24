import { useState } from "react"




function NewWorkoutForm(props){

    const {onSubmit, name, weightLifted, reps, sets, distance, time, id, btnText} = props

    const [exerciseInputs, setExerciseInputs] = useState({
        name: name || '',
        weightLifted: weightLifted || '',
        reps: reps || '',
        sets: sets || '',
        distance: distance || '',
        time: time || ''
    })

    function handleSubmit(e){
        e.preventDefault()
        onSubmit(id, exerciseInputs)
        props.changeToggle && props.changeToggle()
        setExerciseInputs({
            name: name || '',
            weightLifted: weightLifted || '',
            reps: reps || '',
            sets: sets || '',
            distance: distance || '',
            time: time || ''
        })
    }

 
    function handleChange(e){
        const {name, value} = e.target
        setExerciseInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    return(
        <form className="exercise-inputs" onSubmit={handleSubmit}>
            <label htmlFor="exercise">Exercise: </label>
            <input 
                id="exercise"
                type='text'
                name="name"
                onChange={handleChange}
                value= {exerciseInputs.name}
                />

            <h1>Weight Lifting Logs</h1>
            <label htmlFor="weightLifted">Weight: </label>
            <input 
                id="weightLifted"
                type='text'
                name="weightLifted"
                onChange={handleChange}
                value={exerciseInputs.weightLifted}
                />

            <label htmlFor="reps">Reps: </label>
            <input 
                id="reps"
                type='number'
                name="reps"
                onChange={handleChange}
                value={exerciseInputs.reps}
                />
            
            <label htmlFor="sets">Sets: </label>
            <input 
                id="sets"
                type='number'
                name="sets"
                onChange={handleChange}
                value={exerciseInputs.sets}
                />
            
            <h1>Cardio Logs</h1>

            <label htmlFor="distance">Distance: </label>
            <input 
                id="distance"
                type='text'
                name="distance"
                onChange={handleChange}
                value={exerciseInputs.distance}
            />

            <label htmlFor="Time">Time: </label>
            <input 
                id="Time"
                type='text'
                name="time"
                onChange={handleChange}
                value={exerciseInputs.time}
            />
            <button>{btnText}</button>
        </form>
    )
}

export default NewWorkoutForm
