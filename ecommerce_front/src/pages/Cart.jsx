import { Add, Remove } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import Announcement from "../component/Announcement";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

const Container = styled.div`

`;
const Wrapper = styled.div`
padding:20px;
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
const TopTexts = styled.div``
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
`
const Info = styled.div`
flex:3;
`

const Product = styled.div`
display:flex;
justify-content:space-between;
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
`;
const ProductPrice = styled.div`
font-size:24px;
    font-weight:300
`;

const Hr = styled.hr`
background-color:#eee;
border:none;
height:1px;
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
    
`
const SummaryItemText = styled.span`
font-weight: ${props=>props.type==="total" && "700"}
`
const SummaryItemPrice = styled.span`
    font-weight:${props=>props.type==="price" && "700"}
`
const Button = styled.button`
padding:5px 10px;
border:none;
background-color:teal;
border-radius:10px;
`



const Cart = () =>{
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
                            <Product>
                                <ProductDetails>
                                    <Image src="https://m.media-amazon.com/images/I/51a8Uk5olfL._UL1100_.jpg"/>
                                    <Details>
                                        <ProductName><b>Product:</b>Thunder Shoe</ProductName>
                                        <ProductId><b>Id:</b>123584584852</ProductId>
                                        <ProductColor color="black"/>
                                        <ProductSize><b>Size:</b>37.5</ProductSize>
                                    </Details>
                                </ProductDetails>
                                <PriceDetails>
                                    <ProductAmountContainer>
                                        <Add/>
                                        <ProductAmount>2</ProductAmount>
                                        <Remove/>
                                    </ProductAmountContainer>
                                    <ProductPrice>30</ProductPrice>
                                </PriceDetails>
                            </Product>
                            <Hr/>
                            <Product>
                                <ProductDetails>
                                    <Image src="https://us.123rf.com/450wm/nadyanadal/nadyanadal1707/nadyanadal170700017/82928123-men-s-shirts-set-folded-on-a-white-background-.jpg?ver=6"/>
                                    <Details>
                                        <ProductName><b>Product:</b>Thunder Shoe</ProductName>
                                        <ProductId><b>Id:</b>123584584852</ProductId>
                                        <ProductColor color="black"/>
                                        <ProductSize><b>Size:</b>37.5</ProductSize>
                                    </Details>
                                </ProductDetails>                                
                                <PriceDetails>
                                    <ProductAmountContainer>
                                        <Add/>
                                        <ProductAmount>2</ProductAmount>
                                        <Remove/>
                                    </ProductAmountContainer>
                                    <ProductPrice>30</ProductPrice>
                                </PriceDetails>
                            </Product>
                            <Hr/>
                            <Product>
                                <ProductDetails>
                                    <Image src="https://rukminim1.flixcart.com/image/714/857/ko0d6kw0/wallet-card-wallet/7/o/4/brown-gh1700-wallet-go-hide-original-imag2kayeh7xrvky.jpeg?q=50"/>
                                    <Details>
                                        <ProductName><b>Product:</b>Thunder Shoe</ProductName>
                                        <ProductId><b>Id:</b>123584584852</ProductId>
                                        <ProductColor color="black"/>
                                        <ProductSize><b>Size:</b>37.5</ProductSize>
                                    </Details>
                                </ProductDetails>                                
                                <PriceDetails>
                                    <ProductAmountContainer>
                                        <Add/>
                                        <ProductAmount>2</ProductAmount>
                                        <Remove/>
                                    </ProductAmountContainer>
                                    <ProductPrice>30</ProductPrice>
                                </PriceDetails>
                            </Product>
                        </Info>
                        <Summary>
                            <SummaryTitle>Order Summary</SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>SubTotal</SummaryItemText>
                                <SummaryItemPrice>80</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Estimate Shipping</SummaryItemText>
                                <SummaryItemPrice>10</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Discount Shipping</SummaryItemText>
                                <SummaryItemPrice>-10</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText type="total">Total</SummaryItemText>
                                <SummaryItemPrice type="price">80</SummaryItemPrice>
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