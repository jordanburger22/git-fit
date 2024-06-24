

function AuthForm(props){

    const {
        btnText, 
        handleChange, 
        inputs: { username, password },
        handleSubmit, 
        errMsg
    } = props

    return(
        <form className="auth-form-container" onSubmit={handleSubmit}>
            <input 
                name="username"
                placeholder="Username"
                type='text'
                onChange={handleChange}
                value={username}
            />

            <input 
                name="password"
                placeholder="Password"
                type="password"
                onChange={handleChange}
                value={password}
            />

            <button>{btnText}</button>
            <p>{ errMsg }</p>
        </form>
    )
}

export default AuthForm