import { EmailOutlined, Facebook, Instagram, LocationOn, Phone, Twitter } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";

const Container = styled.div`      
    display:flex;
`
const Left = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    padding:20px;
    margin-left:30px;
`
const Logo = styled.h1`

`
const Desc = styled.p`
    margin:20px 0px;
`
const SocialContainer = styled.div`
    display:flex;
`
const SocialIcons = styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    color:white;
    background-color:#${props=>props.color};
    display:flex;
    align-items:center;
    justify-content:center;
    margin-right:5px;
`

const Center = styled.div`
flex:1;
padding:20px;
text-align:center;
align-items:center;
justify-content:center;
`


const Title = styled.h3`
Margin-bottom:30px;
`;

const List = styled.ul`
margin:0;
padding:0;
list-style:none;
display:flex;
flex-wrap:wrap;

`

const ListItem = styled.li`
    width:50%;
    margin-bottom:10px
`
const Right = styled.div`
flex:1;
padding:20px;
width:30%;
margin-left:40px;
flex-wrap:wrap;
align-items:center;
 justify-content:center;
 text-align:center;
`
// const Contact = styled.div`
// display:flex;
// flex-wrap:wrap;
// align-items:center;
// justify-content:center;
// `

const ContactItem = styled.p`
    display:flex;
    align-items:center;
    justify-content:center;
`
const Payment = styled.img`
height:20%;
`

const Footer = () =>{
    return(
        <Container>
            <Left>
                <Logo>Ecom</Logo>
                <Desc>Checkout Our Collection</Desc>
                <SocialContainer>
                <SocialIcons color="3B5999">
                    <Facebook/>
                </SocialIcons>
                <SocialIcons color="E4405F">
                    <Instagram/>
                </SocialIcons>
                <SocialIcons color="55ACEE">
                    <Twitter/>
                </SocialIcons>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links:</Title>               
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>WhishList</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Women Fahion</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Terms</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                </List>
            </Center>
            <Right>
             <Title>Address:</Title>
                                    
                    <ContactItem>
                        <LocationOn style={{marginRight:"10px"}}/> plot no: abc, sector: abc 
                    </ContactItem>
                    <ContactItem>
                        <Phone style={{marginRight:"10px"}}/> 9911252629
                    </ContactItem>
                    <ContactItem>
                        <EmailOutlined style={{marginRight:"10px"}}/> abc@chetu.com
                    </ContactItem>
                    <Payment src="https://www.kindpng.com/picc/m/48-480088_payment-method-credit-card-master-card-hd-png.png"/>
                
            </Right>
        </Container>
    )
}

export default Footer;