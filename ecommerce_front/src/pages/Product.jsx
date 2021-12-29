import { Add, Remove } from "@material-ui/icons"
import React from "react"
import styled from 'styled-components'
import Announcement from "../component/Announcement"
import Footer from "../component/Footer"
import Navbar from "../component/Navbar"
import Newsletter from "../component/Newsletter";
import {mobile} from '../responsive'

const Container = styled.div`

`
const Wrapper = styled.div`
    padding:50px;
    display:flex;
    ${mobile({padding:"20px", flexDirection:"column"})}
`
const ImageContainer = styled.div`
flex:1
`
const Image = styled.img`
    width:100%;
    height:90vh;
    object-fit:cover;
    ${mobile({height:"40vh"})}
`
const InfoContainer = styled.div` 
    flex:1;
    padding: 0px 50px;
    ${mobile({padding:"10px"})}
`
const Title = styled.h2`
    font-weight:600;

`
const Desc = styled.p`
    margin: 20px 0;
`
const Price = styled.span`
    font-weight:100;
    font-size:40px;
`
const FilterContainer = styled.div`
display:flex;
justify-content:space-between;
width:50%;
margin:50px 0px;
${mobile({width:"100%"})}
`
const Filter = styled.div`
display:flex;
align-items:center;
`
const FilterTitle = styled.span`
font-size:20px;
font-weight:400;
margin-right:5px;
`
const FilterColor = styled.div`
width:20px;
height:20px;
border-radius:50%;
background-color:${props=>props.color};
margin:0px 5px; 
cursor:pointer;
`
const FilterSize = styled.select`
padding:4px;
font-size:15px;
`;
const FilterSizeOption = styled.option``


const AddContainer = styled.div`
display:flex;
align-items:center;
width:50%;
justify-content:space-between;
${mobile({width:"100%"})}
`
const AmountContainer = styled.div`
    display:flex;
    align-items:center;
    font-weight:700;
`
const Amount = styled.span`
    width:30px;
    height:30px;
    border-radius:10px;
    border:1px solid teal;
    display:flex;
    align-items:center;
    justify-content:center;
    margin:0px 5px;
`
const Button = styled.button`
padding:15px;
border:2px solid teal;
background-color:white;
cursor:pointer; 
font-weight:500;

&:hover{
    background-color:#f8f4f4;
};
border-radius:10px;
`


const Product = ()=>{
    return(
        <Container>
            <Navbar/>
            <Announcement/>
                <Wrapper>
                    <ImageContainer>
                        <Image src="https://m.media-amazon.com/images/I/51fS7KGb1ML._AC_UX679_.jpg"/>
                    </ImageContainer>
                    <InfoContainer> 
                        <Title>Denim Jumpsuit</Title>
                        <Desc>soft and comfort cloth soft and comfort cloth soft and comfort cloth soft and comfort cloth soft and comfort cloth soft and comfort cloth </Desc>
                        <Price>$ 20</Price>
                        <FilterContainer>
                            <Filter>
                                <FilterTitle>Color</FilterTitle>
                                <FilterColor color="black"/>
                                <FilterColor color="darkblue"/>
                                <FilterColor color="gray"/>
                            </Filter>
                            <Filter>
                                <FilterTitle>Size:</FilterTitle>
                                <FilterSize>
                                    <FilterSizeOption>XS</FilterSizeOption>
                                    <FilterSizeOption>S</FilterSizeOption>
                                    <FilterSizeOption>M</FilterSizeOption>
                                    <FilterSizeOption>L</FilterSizeOption>
                                    <FilterSizeOption>XL</FilterSizeOption>
                                </FilterSize>
                            </Filter>
                        </FilterContainer>
                        <AddContainer>
                            <AmountContainer>
                                <Remove/>
                                <Amount>1</Amount>
                                <Add/>
                            </AmountContainer>
                            <Button>Add To Cart</Button>
                        </AddContainer>
                    </InfoContainer>
                </Wrapper>
            <Newsletter/>
            <Footer/>
        </Container>
    )
}

export default Product

