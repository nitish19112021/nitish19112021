import React, { useState } from "react";
import styled from "styled-components";
import {mobile} from '../responsive'
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
// import message from "../pages/SuccessMess"

import { useNavigate } from "react-router-dom";

const Container = styled.div`
    width:100vw;
    height:100vh;
    background:linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("https://cdn2.hubspot.net/hubfs/53/ecommerce-10.jpg");
    display:flex;
    align-items:center;
    justify-content:center;
`
const Wrapper = styled.div`
padding:20px;
width:40%;
background-color:white;
${mobile({width:"75%"})}
`
const Title = styled.h1`
font-size:25px;
font-weight:400;
`

const Form = styled.form`
display:flex;
flex-wrap:wrap;
`
const Input = styled.input`
flex:1;
min-width:40%;
margin:20px 10px 0px 0px;
padding:10px;
`
const Agreement = styled.span`
margin:20px 0px;
width:100%;
text-align:center;
`
const Button = styled.button`
width:30%;
border:none;
padding:15px 20px;
background-color:teal;
color:white;
cursor:pointer;
border-radius:10px;
display:flex;
align-items:baseline;
justify-content:center;
margin:auto;
&:hover{
    opacity:0.9;
    color:lightgray;
}
`
const Error = styled.span`
color:red;
`
const Register = () =>{
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const dispatch = useDispatch();
    const {isFetching, error} = useSelector((state)=> state.register)

    let navigate = useNavigate();
    
    const handleclick = (e) =>{
        
        e.preventDefault();
        register(dispatch, {firstname,lastname,username,email,password,confirmpassword})
        navigate("/successmess")

    }
    return(
        <Container>
            <Wrapper>
                <Title>Create An Account</Title>
                <Form>
                    <Input name="fisrtname" placeholder="First Name" onChange={(e)=>setFirstname(e.target.value)}/>
                    <Input name="lastname" placeholder="Last Name" onChange={(e)=>setLastname(e.target.value)}/>
                    <Input name="username" placeholder="User Name" onChange={(e)=>setUsername(e.target.value)}/>
                    <Input name="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                    <Input name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                    <Input name="confirmpassword" placeholder="Confirm Password" onChange={(e)=>setConfirmpassword(e.target.value)}/>
                    <Agreement>Creating and account with all privacy</Agreement>
                    <Button onClick={handleclick} disabled={isFetching}>CREATE</Button>
                    {error && <Error>You are not Registered..</Error>}
                </Form>
            </Wrapper>

        </Container>
    )
}

export default Register;