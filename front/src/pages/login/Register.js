import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./login.css"

function Register(){
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const navigate = useNavigate();

	async function submit(e){
		e.preventDefault();

		try{
			await axios.post("http://localhost:3001/auth/register", {
				email,password
			}).then( res =>{
				if(res.data){
					alert("User already registerd")
				}
				else if(!res.data){
					navigate('/')
				}
			})
		}catch(e){
			alert("wrong details")
		}
	}

	return(
		<div className="register">
			<h1 className="logrej"> Register </h1>
			<form className="logform"action="POST">
				<input className="log-input" type="email" onChange={(e) => {setEmail(e.target.value)}}/>
				<input className="log-input" type="password" onChange={(e) => {setPassword(e.target.value)}}/>
				<input type="submit" className="button"  onClick={submit}/>
			</form>
			<br/>
			<Link to="/login"> Login Page</Link>
		</div>
	)
}

export default Register;