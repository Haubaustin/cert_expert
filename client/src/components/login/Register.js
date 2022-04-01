import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const Register = () => {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [data, setData] = useState({
        userName: "",
        email: "",
        password: ""
    })


    const handleRegister = (e) => {
        const value = e.target.value
        setData({
        ...data,
        [e.target.name]: value
        })
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const {data: res} = await axios.post("http://localhost:3001/api/register", data)
            navigate("/login")
            console.log(res.message)
            alert(res.message)
        }
        catch (error) {
            console.log(error.response)
            console.log(error.response.status)
            setError(error.response.data.message)
        }   
        
}

    return (
        <div>
            <div className="welcomeBack">
                <h1>Returning?</h1>
                <Link to="/login">
                <button>Login</button>
                </Link>
            </div>
            <div className="createAcc">
                <h1>Create an Account</h1>
                <form onSubmit={handleSignUp}>
                    <input type="text" placeholder="Username" name="userName" value={data.userName} onChange={handleRegister} />
                    <input type="text" placeholder="Email" name="email" value={data.email} onChange={handleRegister}/>
                    <input type="password" placeholder="Password" name="password" value={data.password} onChange={handleRegister}/>
                    <button type="submit" >Register</button>
                </form>
                    <h5>{error}</h5>
            </div>
        </div>
    )
}

export default Register