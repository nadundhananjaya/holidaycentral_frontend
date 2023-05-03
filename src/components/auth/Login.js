import react from "react"

const Login = () => {

    const loginFormContainer = {
        height : '100vh',
        width : '100%',
        display : 'grid',
        placeItems : 'center'
    }
    const handleSubmit = (event) => {
        event.preventDefault()
    }
    return <div style={loginFormContainer}>
        <div className={`card w-50 mx-auto`}>
            <div className={`card-body `}>
                <h3 className={`mb-3`}>Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>

                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-dark">Login</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
}

export default Login
