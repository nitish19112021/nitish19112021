import React from "react"
import styled from "styled-components"
import Announcement from "../component/Announcement"
import Footer from "../component/Footer"
import Navbar from "../component/Navbar"
import Newsletter from "../component/Newsletter"
import Products from "../component/Products"
import {mobile} from '../responsive'


const Container = styled.div`
`
const Title = styled.h2`
    margin:20px;
`

const FilterContainer = styled.div`
display:flex;
justify-content:space-between;
`

const Filter = styled.div`
margin:20px;
${mobile({margin:"0px 14px", flexDirection:"column", display:'flex'})}
`   

const FilterText = styled.span`
    font-size:20px;
    font-weight:600;
    margin-right:25px;
    ${mobile({marginRight:"0px"})}
`
const Select = styled.select`
    padding:10px;
    margin-right:20px;
    font-size:20px;
    ${mobile({margin:"10px 0px"})}
`

const Option = styled.option`
    font-size:20px;
`
const ProductList = ()=>{
    return(
        <Container>
            <Navbar/>
            <Announcement/>
            <Title>Dresses</Title>
            <FilterContainer>                
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select>
                        <Option disabled selected>color</Option>
                        <Option>White</Option>
                        <Option>Black</Option>
                        <Option>Red</Option>
                        <Option>Blue</Option>
                        <Option>Yellow</Option>
                    </Select>
                    <Select>
                        <Option disabled selected>Size</Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                        <Option>XXL</Option>
                    </Select>

                    </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                        <Select>
                            <Option selected>Newest</Option>
                            <Option>Price inc</Option>
                            <Option>Price Desc</Option>
                        </Select>
                    </Filter>
            </FilterContainer>
            <Products/>
            <Newsletter/>
            <Footer/>
        </Container>
    )
}

export default ProductList

