import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import {popularProducts} from "../data"
import Product from "./Product";
import axios from "axios"

const Container = styled.div`
    display:flex;
    padding:20px;
    flex-wrap:wrap;
    justify-content:space-between;
    
`
const Products = ({cat,filters,sort})=>{
    const[products,setProducts] = useState([]);
    const[filteredProducts, setFilteredProducts] = useState([])
    
    useEffect(()=>{     
        const getProducts = async () =>{
            try{
                const res = await axios.get(cat ? `http://localhost:4000/api/product/findAllProduct?category=${cat}`
                :`http://localhost:4000/api/product/findAllProduct`);
                setProducts(res.data)
                console.log(res.data)
            }catch(err){
                console.log(err);
            }
        }
        getProducts();
    },[cat])
    useEffect(()=>{
        cat && setFilteredProducts(
            products.filter(item=> Object.entries(filters).every(([key,value])=>
                item[key].includes(value)
            )
        )
        )
},[products,cat, filters])
    return(
        <Container>
            {filteredProducts.map(item =>(
                <Product item={item} key={item.id}/>
            ))}
        </Container>
    )
}

export default Products




