import axios from 'axios'
import { createContext, useState } from 'react'

export const userContext = createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props){

    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || "",
        workouts: [],
        errMsg: ""
    }

    const latestWorkout = {
        name: '',
        date: Date

    }

    const [userState, setUserState] = useState(initState)

    const [baseExercises, setBaseExercises] = useState([])

    const [userExercises, setUserExercises] = useState([])

    const [newWorkoutId, setNewWorkoutId] = useState(latestWorkout)

    function handleAuthErr(errMsg){
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg
        }))
    }

    function resetAuthErr(){
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg: ''
        })
        )
    }

    function signup(cred){
        axios.post('/auth/signup', cred)
            .then(res => {
                const {user, token} = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user, 
                    token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function login(cred){
        axios.post('/auth/login', cred)
            .then(res => {
                console.log(res)
                const {user, token} = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user, 
                    token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({
            user: {},
            token: '',
            workouts: []
        })
    }

    function getBaseExercises(){
        userAxios.get('/profile/allExercises')
            .then(res => setBaseExercises(res.data))
            .catch(err => console.dir(err.response.data.errMsg))
    }

    function filterExercises(e){
        if(e.target.value === "All"){
            getBaseExercises()
        } else{
            userAxios.get(`/profile/allExercises/muscleWorked?muscleWorked=${e.target.value}`)
                .then(res => setBaseExercises(res.data))
                .catch(err => console.dir(err.response.data.errMsg))
        }
    }

    function getWorkouts(){
        userAxios.get("/profile/workouts")
            .then(res => setUserState(prevUserState => ({
                ...prevUserState,
                workouts: [...res.data]
            })))
            .catch(err => console.dir(err.response.data.errMsg))
    }

    function getUserExercises(workoutId){
        userAxios.get(`/profile/exercises/${workoutId}`)
            .then(res => {
                setUserExercises(res.data)
                setUserState(prevUserState => ({
                    ...prevUserState,
                    workouts: [...prevUserState.workouts, res.data]
                }))
            })
            .catch(err => console.dir(err.response.data.errMsg))
    }

    function addNewWorkout(newWorkout){
        userAxios.post("/profile/workouts", newWorkout)
            .then(res => setNewWorkoutId(res.data))
            .catch(err => console.dir(err.response.data.errMsg))
    }

    function addNewExercise(workoutId, newExercise){
        userAxios.post(`/profile/exercises/${workoutId}`, newExercise)
            .then(res => setUserExercises(prevExercises => [...prevExercises, res.data]))
            .catch(err => console.dir(err.response.data.errMsg))
    }

    function deleteExercisesbyWorkout(workoutId){
        userAxios.delete(`/profile/exercises/workout/${workoutId}`)
            .then(res => console.log(res))
            .catch(err => console.dir(err.response.data.errMsg))
    }

    function deleteWorkout(workoutId){
        userAxios.delete(`/profile/workouts/${workoutId}`)
            .then(res => setUserState(prevUserState => ({...prevUserState, workouts: prevUserState.workouts.filter(workout => workoutId !== workout._id)})))
            .catch(err => console.dir(err.response.data.errMsg))
    }

    function editExercise(exerciseId, update){
        userAxios.put(`/profile/exercises/${exerciseId}`, update)
            .then(res => setUserExercises(prevExercises => prevExercises.map(exercise => exerciseId !== exercise._id ? exercise : res.data)))
            .catch(err => console.dir(err.response.data.errMsg))
    }

    function deleteOneExercise(exerciseId){
        userAxios.delete(`/profile/exercises/${exerciseId}`)
            .then(res => setUserExercises(prevExercises => prevExercises.filter(exercise => exerciseId !== exercise._id)))
            .catch(err => console.dir(err.response.data.errMsg))
    }

    return(
        <userContext.Provider 
            value={{
                ...userState,
                signup,
                login,
                logout,
                resetAuthErr,
                getBaseExercises,
                baseExercises,
                filterExercises,
                getWorkouts,
                getUserExercises,
                userExercises,
                addNewWorkout,
                newWorkoutId,
                addNewExercise,
                deleteExercisesbyWorkout,
                deleteWorkout,
                deleteOneExercise,
                editExercise
                
            }}
        >
            {props.children}
        </userContext.Provider>
    )
}