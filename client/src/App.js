import Login from './components/Login';
import Navbar from './components/Navbar';
import './App.css';
import { useContext, useEffect } from 'react';
import { userContext } from './UserContext/UserProvider';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import WorkoutLog from './components/WorkoutLog';
import LogWorkout from './components/LogWorkout';
import AllExercises from './components/AllExercises';
import WorkoutDetails from './components/WorkoutDetails';
import AddUserExercise from './components/AddUserExercise';

function App() {


  const {
    token, 
    getBaseExercises,
    baseExercises,
    filterExercises,
    getWorkouts,
    workouts,
    logout,
    getUserExercises,
    userExercises,
    addNewWorkout, 
    newWorkoutId,
    addNewExercise,
    deleteExercisesbyWorkout,
    deleteWorkout,
    deleteOneExercise,
    editExercise
  } = useContext(userContext)


  return (
    <div className="App">

      {token && <Navbar logout={logout} getWorkouts= {getWorkouts} />}
      
      <Routes>

        <Route path='/' element= { token ? <Navigate to='/home'/> : <Login /> } />


        <Route path='/home' element={
          <ProtectedRoute token={token}>
            <Home getBaseExercises={getBaseExercises} getWorkouts= {getWorkouts}/>
          </ProtectedRoute>} 
        />

        <Route path='/log' element={
          <ProtectedRoute token={token}>
            <LogWorkout addNewWorkout={addNewWorkout} newWorkoutId={newWorkoutId}/>
          </ProtectedRoute>}
        />

        <Route path='/pastworkouts' element={
          <ProtectedRoute token={token}>
            <WorkoutLog 
              workouts={workouts}
              getWorkouts={getWorkouts}
            />
          </ProtectedRoute>}
        />

        <Route path='/allexercises' element={
          <ProtectedRoute token={token}>
            <AllExercises 
            baseExercises={baseExercises} 
            filterExercises = {filterExercises}
            
            />
          </ProtectedRoute>}
        />

        <Route path='/pastworkouts/:workoutId' element={
          <ProtectedRoute token={token}>
            <WorkoutDetails 
              getUserExercises={getUserExercises} 
              userExercises = {userExercises}
              deleteWorkout= {deleteWorkout}
              deleteExercisesbyWorkout= {deleteExercisesbyWorkout}
              deleteOneExercise= {deleteOneExercise}
              editExercise = {editExercise}
              />
              
          </ProtectedRoute>}
        />

        <Route path='/log/addexercise/:workoutId' element={
          <ProtectedRoute token={token}>
            <AddUserExercise 
              userExercises= {userExercises} 
              addNewExercise = {addNewExercise} 
              getUserExercises= {getUserExercises}
              deleteOneExercise ={deleteOneExercise}
              editExercise = {editExercise}
              />
          </ProtectedRoute>}/>


      </Routes>
    </div>
  );
}

export default App;
