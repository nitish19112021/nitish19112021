import { Send } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
const Container = styled.div`
height:60vh;
background-color:#fcf5f5;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;

`;
const Title = styled.h1`
font-size:70px;
margin-bottom:25px;
`;
const Desc = styled.div`
font-size:24px;
font-weight:300;
margin-bottom:20px;
`
const InputContainer = styled.div`
width:50%;
height:40px;
background-color:white;
display:flex;
justify-content:space-between;
border:1px solid lightgray;
`
const Input = styled.input`
border:none;
flex:5;
margin-left:5px;

`
const Button = styled.button``
const Newsletter = () =>{
    return (
        <Container>
            <Title>NewsLetter</Title>
            <Desc>get time updates get time updates get time updates get time updates</Desc>  
            <InputContainer>
                <Input placeholder="enter your email"/>
                <Button>
                    <Send/>
                </Button>
            </InputContainer>
        </Container>
    )
}

export default Newsletter;