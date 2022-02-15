import { Badge } from "@material-ui/core";
import { Search, ShoppingCart } from "@material-ui/icons";
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";

import { update } from "../redux/apiCalls";

const Container = styled.div`
height:60px;
// @media only screen and (max-width:380px){
//     display:none;
// };
// 

${mobile({
    height: "50px"
})};
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display:flex;
  justify-content:space-between;
  
  `;


const Left = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    
`;
const Language = styled.span`
    font-size:14px;
    cursor:pointer;
    ${mobile({ display: 'none' })}    
`
const SearchContainer = styled.div`
border: 1px solid lightgray;
display:flex;
align-items:center;
margin-left:25px;
padding:5px;
${mobile({ marginLeft: '1px' })}

`;

const Input = styled.input`
border:none;
${mobile({ width: '50px' })}
`

const Center = styled.div`
    flex:1;
    text-align:center;

`;
const Logo = styled.h1`
font-weight: bold;
${mobile({ fontSize: '24px', marginLeft: "20px" })};
`
const Right = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content: flex-end;
    ${mobile({ flex: 2 })}
`;

const MenuItem = styled.div`
font-size:14px;
cursor:pointer;
margin-left:25px;
${mobile({ fontSize: '12px', marginLeft: "10px" })}
`;


const Form = styled.form`
display:flex;
flex-wrap:wrap;
`
const INPUT = styled.input`
flex:1;
min-width:40%;
margin:20px 10px 0px 0px;
padding:10px;
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
// &:disabled{
//     color:green;
//     cursor:not-allowed;
// };
`


const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity)
    const user = useSelector(state => state.user.currentUser);

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);   
    // const handleClick = () => {
    //     setShow(true);
    // }
    const handleClick1 = () => {
        setShow(false);
        setShow1(true)
    }    
    const dispatch = useDispatch();
    

    const[firstname, setFirstname] = useState('')
    const[lastname, setLastname] = useState('')
    const[username, setUsername] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const handleupdate = (e)=>{
        e.preventDefault();
        update(dispatch,{firstname,lastname,username,email,password})
        console.log(firstname,lastname,username,email, password)
        
    }
    
    
    // const [updateData, setUpadteData] = useState({
    //     firstname: '',
    //     lastname: '',
    //     username: '',
    //     email: '',
    //     password: '',

    // })    
    
    // const handleChange = (e) => {
    //     var name = e.target.name;
    //     var value = e.target.value;
    //     var dataUpdate = { ...updateData }
    //     dataUpdate[name] = value;
    //     setUpadteData(dataUpdate);
    // }   
    
    // const {isFetching, error} = useSelector((state) => state.update)

    // const handleupdateData = (e) => {
    //     e.preventDefault();
    //     const formdata = {
    //         firstname: updateData.firstname,
    //         lastname: updateData.lastname,
    //         username: updateData.username,
    //         email: updateData.email,
    //         password: updateData.password,
    //     }
    //     console.log("Update form data", formdata)
    //     update(dispatch, {formdata})
    // }
    
    
       
    
    // const regUser = useSelector(state => state.register.currentUser)
    // console.log("reguser", regUser)

    const logout = () => {
        localStorage.clear();
        window.location.href = "/"
    }


    return (
        <Container>
            <Wrapper>
                <Left><Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder="search" />
                        <Search style={{ color: 'gray', fontSize: '18px' }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Logo>ECOM</Logo>
                    </Link>
                </Center>
                <Right>
                    {                        
                      <Link to="/register" style={{ textDecoration: "none" }}><MenuItem>REGISTER</MenuItem></Link>
                    }
                    {/* {
                        user ?
                            <menuItem style={{ color: 'green', cursor: 'pointer' }} onClick={handleClick}>Welcome <span style={{ color: 'red' }}>
                                {`${user.username.charAt(0).toUpperCase() + user.username.substr(1).toLowerCase()}`}</span></menuItem> :
                            <Link to="/register" style={{ textDecoration: "none" }}><MenuItem>REGISTER</MenuItem></Link>
                            } */}
                        
                            <Link to="/login" style={{ textDecoration: "none" }}><MenuItem>LOGIN</MenuItem></Link>
                    
                    {/* {
                        user ? <Link to='/' style={{ textDecoration: "none" }}><MenuItem onClick={logout}>LOGOUT</MenuItem></Link>
                            : <Link to="/login" style={{ textDecoration: "none" }}><MenuItem>LOGIN</MenuItem></Link>
                    } */}
                    <Link to='/cart'>
                        <MenuItem>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCart />
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>

            <Modal
                size="sm"
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        hello
                        {/* Hello <span style={{ color: 'red' }}>
                            {`${user.username.charAt(0).toUpperCase() + user.username.substr(1).toLowerCase()}`}</span> */}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MenuItem onClick={handleClick1}>Update Profile or Reset Password</MenuItem>
                    {/* <button onClick={handleClick1}>Show Me</button> */}
                </Modal.Body>
            </Modal>

            <Modal
                size="sm"
                show={show1}
                onHide={() => setShow1(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        <MenuItem>Update Profile or Reset Password</MenuItem>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {/* <Form>
                        <INPUT name="firstname" placeholder="First Name" onChange={handleChange}/>
                        <INPUT name="lastname" placeholder="Last Name" onChange={handleChange}/>
                        <INPUT name="username" placeholder="User Name" onChange={handleChange}/>
                        <INPUT name="email" placeholder="Email" onChange={handleChange}/>
                        <INPUT name="password" placeholder="Password" onChange={handleChange}/>
                        <Button onClick={handleupdateData} disabled={isFetching}>Update</Button> 
                        {error && <span>error</span>}
                        
                    </Form> */}
                    <Form>
                        <INPUT name="firstname" placeholder="First Name" onChange={(e)=>setFirstname(e.target.value)}/>
                        <INPUT name="lastname" placeholder="Last Name" onChange={(e)=>setLastname(e.target.value)}/>
                        <INPUT name="username" placeholder="User Name" onChange={(e)=>setUsername(e.target.value)}/>
                        <INPUT name="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                        <INPUT name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                        <Button onClick={handleupdate}>Update</Button> 
                        
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    )
}

export default Navbar