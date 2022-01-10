import { Add, Remove } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import Announcement from "../component/Announcement";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import {mobile} from '../responsive';
import { useSelector } from "react-redux";


const Container = styled.div`

`;
const Wrapper = styled.div`
padding:20px;
${mobile({padding:"10px"})}
`
const Title = styled.h1`
font-weight:300;
text-align:center;
`
const Top = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
`
const TopButton = styled.button`
padding:10px;
font-weight:600;
cursor:pointer;
border-radius:10px;
border:${props=>props.type==="filled" && "none"};
// border-radius:${props=>props.type==="filled" && "10px"};
background-color:${props=>props.type==='filled' ? "black" : "transparent"};
color:${props=>props.type==='filled' && "white"};
`
const TopTexts = styled.div`
${mobile({display:"none"})}
`
const TopText = styled.span`
    text-decoration:underline;
    cursor:pointer;
    margin:0px 10px;    
`
const Bottom = styled.div`
padding:20px 0px;
display:flex;
align-items:center;
justify-content:space-between;
${mobile({flexDirection:"column"})}
`
const Info = styled.div`
flex:3;
`

const Product = styled.div`
display:flex;
justify-content:space-between;
${mobile({flexDirection:"column"})}
`
const ProductDetails =styled.div` 
flex:2;
display:flex;
`;
const Image = styled.img`
    width:200px;
`
const Details = styled.div`
padding:20px;
display:flex;
flex-direction:column;
justify-content:space-around;
`
const ProductName = styled.span``
const ProductId = styled.span``
const ProductColor = styled.div`
width:20px;
height:20px;
border-radius:50%;
background-color:${props=>props.color}
`
const ProductSize = styled.span``
const PriceDetails = styled.div`
flex:1;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`
const ProductAmountContainer = styled.div`
display:flex;
align-items:center;
margin-bottom:10px;
`;
const ProductAmount = styled.div`
    font-size:24px;
    margin:5px;
    ${mobile({margin:"15px"})}
`;
const ProductPrice = styled.div`
font-size:24px;
    font-weight:300;
    ${mobile({marginBottom:"15px"})}
`;

const Hr = styled.hr`
background-color:#eee;
border:none;
height:1px;
${mobile({margin:"15px"})}
`



const Summary = styled.div`
padding:10px 15px;
flex:1;
border:0.5px solid lightgray;
border-radius:10px;
height:50vh;
`
const SummaryTitle = styled.h1`
    font-weight:400;

`
const SummaryItem = styled.div`
    margin:30px 0px;
    display:flex;
    justify-content:space-between;
    font-weight: ${props=>props.type==="total" && "700"};
    font-size:${props=>props.type==="total" && "24px"};
`
const SummaryItemText = styled.span`

`
const SummaryItemPrice = styled.span`
    
`
const Button = styled.button`
padding:5px 10px;
border:none;
background-color:black;
border-radius:10px;
color:white;
font-weight:500;
`



const Cart = () =>{
    

    const cart = useSelector(state=>state.cart);
    return(
        <Container>
            <Navbar/>
            <Announcement/>
                <Wrapper>
                    <Title>Your Cart</Title>
                    <Top>
                        <TopButton>Countinue Shopping</TopButton>
                            <TopTexts>
                                <TopText>Shopping Bags</TopText>
                                <TopText>Your WishLists</TopText>
                            </TopTexts>
                        <TopButton type="filled">CheckOut Now</TopButton>
                    </Top>
                    <Bottom>
                        <Info>
                            {cart.products.map(product=>(

                                <Product>
                                <ProductDetails>
                                    <Image src={product.img}/>
                                    <Details>
                                        <ProductName><b>Product:</b>{product.title}</ProductName>
                                        <ProductId><b>Id:</b>{product._id}</ProductId>
                                        <ProductColor color={product.color}/>
                                        <ProductSize><b>Size:</b>{product.size}</ProductSize>
                                    </Details>
                                </ProductDetails>
                                <PriceDetails>
                                    <ProductAmountContainer>
                                        <Add/>
                                        <ProductAmount>{product.quantity}</ProductAmount>
                                        <Remove/>
                                    </ProductAmountContainer>
                                    <ProductPrice>{product.price*product.quantity}</ProductPrice>
                                </PriceDetails>
                                </Product>
                                ))
                            }
                            <Hr/>                            
                        </Info>
                        <Summary>
                            <SummaryTitle>Order Summary</SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>SubTotal</SummaryItemText>
                                <SummaryItemPrice>{cart.total}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Estimate Shipping</SummaryItemText>
                                <SummaryItemPrice>10</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Discount Shipping</SummaryItemText>
                                <SummaryItemPrice>-10</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                                <SummaryItemText>Total</SummaryItemText>
                                <SummaryItemPrice>{cart.total}</SummaryItemPrice>
                            </SummaryItem>
                            <Button>CheckOut Now</Button>
                        </Summary>
                    </Bottom>
                </Wrapper>
            <Footer/>
        </Container>
    )
}

export default Cart;