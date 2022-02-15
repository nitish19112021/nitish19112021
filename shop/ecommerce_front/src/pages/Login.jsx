import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import {mobile} from '../responsive'
const Container = styled.div`
width:100vw;
height:100vh;
background:linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.5)),url("https://cdn2.hubspot.net/hubfs/53/ecommerce-10.jpg");
display:flex;
align-items:center;
justify-content:center;
background-size:cover;
`
const Wrapper = styled.div`
    padding:20px;
    width:25%;
    background-color:white;
    border-radius:10px;
    ${mobile({width:"75%"})}
`;
const Title = styled.h1`
font-size:30px;
font-weight:400;

`;
const Form = styled.form`    
    display:flex;
    flex-direction:column;
`;
const Input = styled.input`
    height:25px;    
    margin:20px 0px 0px 0px;
    
`;
const Button = styled.button`
    padding:10px 20px;
    margin: 20px 0px 10px 00px;   
    border:none;
    background-color:teal;
    color:white;
    width:40%;
    border-radius:10px;
    cursor:pointer;
    &:disabled{
        color:green;
        cursor:not-allowed;
    };
`;
const Links = styled.a`
margin:5px 0px;
font-size:15px;
text-decoration:underline;
cursor:pointer;
`
const Error = styled.span`
color:red;
`
const Login = () =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    
    const {isFetching, error} = useSelector((state) => state.user)

    const handleClick = (e) =>{
        e.preventDefault();
        login(dispatch, {username, password})
    }
    return(
        <Container>
            <Wrapper>
                <Title>Sign In</Title>
                <Form>
                    <Input placeholder="Enter UserName"
                     onChange={(e)=>setUsername(e.target.value)}/>
                    <Input placeholder="Enter Password" type="password"
                     onChange={(e)=>setPassword(e.target.value)}/>
                    <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
                    {error && <Error>Something went wrong...</Error>}
                    <Link to="/forgetPass">
                    <Links>Forgot Password</Links>
                    </Link>                    
                    <Link to="/register">
                    <Links>Create A New Account</Links>
                    </Link>
                </Form>                
            </Wrapper>            
        </Container>
    )
}

export default Login;