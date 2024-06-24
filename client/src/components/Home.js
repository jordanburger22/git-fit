import { useEffect } from "react"

function Home(props){

    const {getBaseExercises} = props

    useEffect(() => {
        getBaseExercises()
      }, [])

    return(
        <div className="home-container-div">
            <div className="column1"></div>

            <div className="column2">
                <h1>GitFit</h1>
                <h3>Workout Tracking App</h3>
                <h2>Services Include</h2>
                <ul>
                    <li>Log Workouts</li>
                    <li>See Past Workouts</li>
                    <li>List of Common Exercises That Can Be Filtered by Muscle Group</li>
                </ul>
            </div>
        </div>
    )
}

export default Home