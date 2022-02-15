import React from "react";
import styled from "styled-components";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";



const Container = styled.div`

`;

const SuccessMess = () =>{
    return(
        <Container>
            <Navbar/>
            Successfully done
            <Footer/>
        </Container>
    )
}

export default SuccessMess;