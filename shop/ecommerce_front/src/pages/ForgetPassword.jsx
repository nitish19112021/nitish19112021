import React, { useState } from "react";
 import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { mobile } from '../responsive'

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
    ${mobile({ width: "75%" })}
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
// const Links = styled.a`
// margin:5px 0px;
// font-size:15px;
// text-decoration:underline;
// cursor:pointer;
// `
// const Error = styled.span`
// color:red;
// `

const ForgetPassword = () => {

    const [mobile, setMobile] = useState("");
    const [mobileData, setMobileData] = useState([])
    const [otpData, setOtpData] = useState({
        otp: '',
        newpassword: '',
    });
    // const [newpassword, setNewpassword] = useState("");
    // const [mobiledata, setMobileData] = useState([])

    const handleChange = (e) =>{
        const name =  e.target.name;
        const value = e.target.value;

        const otpD = {...otpData}
        otpD[name]=value;
        setOtpData(otpD)
    }

    let navigate = useNavigate();

    const getOtp = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:4000/api/user/forgetPassword/getOtp/${mobile}`)
        .then((resp)=>{
            console.log(resp)            
            setMobileData(resp)
            
        })
        
    }

    const verifyOtp = (e) => {
        e.preventDefault();
        // const formData = {
        //     otp : otpData.otp,
        //     updatePassword : otpData.newpassword,
        // }
        // console.log("Form Data", formData)
        axios.post(`http://localhost:4000/api/user/forgetPassword/verifyOtp/${mobile}`, {"otp": otpData.otp, "updatePassword": otpData.newpassword})
        .then((resp)=>{
            console.log(resp)                     
        })
        navigate("/successmess")
    }
   
    return (
        <Container>
            <Wrapper>
                <Title>OTP</Title>
                <Title>Forget Password</Title>
                {mobileData.length<=0?<Form onSubmit={getOtp}>
                    <Input placeholder="Enter Mobile Number"
                        onChange={(e) => setMobile(e.target.value)} />
                    <Button type="submit">Genrate OTP</Button>
                </Form>:""}
                {mobileData.length >= 0 ? ''
                :  <Form onSubmit={verifyOtp}>
                    <Input  value={mobile} readOnly/>
                <Input placeholder="Enter otp here" name="otp" onChange={handleChange} />
                    <Input placeholder="Enter the updated password" name="newpassword" onChange={handleChange} />
                <Button type="submit" >Change Password</Button>
            </Form>}
        
            </Wrapper>
        </Container>
    )
}

export default ForgetPassword;