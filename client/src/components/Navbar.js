import { Link } from "react-router-dom"

function Navbar(props){
    const {logout, getWorkouts} = props
    return(
        <nav className="nav-bar">
            <h1>GitFit</h1>
            <Link className="nav-link" to='/home'>Home</Link>
            <Link className="nav-link" to='/log'>Log Workout</Link>
            <Link className="nav-link" to='/pastworkouts'>Past Workouts</Link>
            <Link className="nav-link" to='/allexercises'>Exercises</Link>
            <button onClick={logout}>Log Out</button>
        </nav>
    )
}

export default Navbar