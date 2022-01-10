import { Badge } from "@material-ui/core";
import { Search, ShoppingCart } from "@material-ui/icons";
import React from "react";
import { useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
height:60px;
// @media only screen and (max-width:380px){
//     display:none;
// };
// 

${mobile({
    height:"50px"
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
    ${mobile({display:'none'})}    
`
const SearchContainer = styled.div`
border: 1px solid lightgray;
display:flex;
align-items:center;
margin-left:25px;
padding:5px;
${mobile({marginLeft:'1px'})}

`;

const Input = styled.input`
border:none;
${mobile({width:'50px'})}
`

const Center = styled.div`
    flex:1;
    text-align:center;

`;
const Logo = styled.h1`
font-weight: bold;
${mobile({fontSize:'24px', marginLeft:"20px"})};
`
const Right = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content: flex-end;
    ${mobile({flex:2})}
`;

const MenuItem = styled.div`
font-size:14px;
cursor:pointer;
margin-left:25px;
${mobile({fontSize:'12px', marginLeft:"10px"})}
`;
const Navbar = () =>{
    const quantity = useSelector(state=>state.cart.quantity)
    
    return (
        <Container>
            <Wrapper>
                <Left><Language>EN</Language>
                <SearchContainer>
                    <Input placeholder="search"/>
                    <Search style={{color:'gray', fontSize:'18px'}}/>
                </SearchContainer>
                </Left>
                <Center>
                    <Link to="/" style={{textDecoration:'none'}}>
                         <Logo>ECOM</Logo>
                    </Link>
                </Center>
                <Right>
                    <MenuItem>REGISTER</MenuItem>
                    <MenuItem>LOGIN</MenuItem>
                    <Link to='/cart' >
                        <MenuItem>
                        <Badge badgeContent={quantity} color="primary">
                            <ShoppingCart/>
                        </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
            
        </Container>
    )
}

export default Navbar