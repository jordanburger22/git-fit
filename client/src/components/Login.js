import { useContext, useState } from "react"
import { userContext } from "../UserContext/UserProvider"
import AuthForm from "./AuthForm"



const initInputs = { username: '', password: ''}

function Login(){

    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(true)

    const {signup, login, errMsg, resetAuthErr} = useContext(userContext)

    function toggleForm(){
        setToggle(prev => !prev)
        resetAuthErr()
    }

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSignup(e){
        e.preventDefault()
        signup(inputs)
    }

    function handleLogin(e){
        e.preventDefault()
        login(inputs)
    }

    return(
        <div className="login-container">
            <h1>GitFit</h1>
            {toggle && 
            <>
                <AuthForm 
                    btnText = 'Sign Up'
                    inputs= {inputs}
                    handleChange = {handleChange}
                    errMsg = {errMsg}
                    handleSubmit = {handleSignup}
                />
                <p onClick={toggleForm}>Already a Member?</p>
            </>}

            {!toggle && 
            <>
                <AuthForm 
                    btnText = 'Log In'
                    inputs= {inputs}
                    handleChange = {handleChange}
                    errMsg = {errMsg}
                    handleSubmit = {handleLogin}
                />
                <p onClick={toggleForm}>Need to Sign Up?</p>
            </>}

        </div>
    )
}

export default Login