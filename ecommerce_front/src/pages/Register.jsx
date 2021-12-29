import React from "react";
import styled from "styled-components";
import {mobile} from '../responsive'
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
const Register = () =>{
    return(
        <Container>
            <Wrapper>
                <Title>Create An Account</Title>
                <Form>
                    <Input placeholder="name"/>
                    <Input placeholder="lastname"/>
                    <Input placeholder="username"/>
                    <Input placeholder="email"/>
                    <Input placeholder="password"/>
                    <Input placeholder="confirm password"/>
                    <Agreement>Creating and account with all privacy</Agreement>
                    <Button>CREATE</Button>
                </Form>
            </Wrapper>

        </Container>
    )
}

export default Register;