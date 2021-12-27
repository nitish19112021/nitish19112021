import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";

const Container = styled.div`
height:80vh;
width:100%;
display:flex;
position:relative;
overflow:hidden;
`;

const Arrow = styled.div`
    width:50px;
    height:50px;
    background-color: #fff7f7;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    position:absolute;
    top:0;
    bottom:0;
    left:${props=>props.direction === "left" && "10px" };
    right:${props=>props.direction === "right" && "10px"};
    margin:auto;
    cursor:pointer;
    opacity:0.5;
    z-index:2;
`
const Wrapper = styled.div`
    height:100%;
    display:flex;
    transform:translateX(${props=>props.slideIndex * -100}vw);
    transition: all 0.5s ease;
`
const Slide = styled.div`
    display:flex;
    align-items:center;    
    width:100vw;
    height:80vh;
    background-color:#${props=>props.bg}
    
`;
const ImageContainer = styled.div`
    flex:1;
    height:100%
    
`

const Image = styled.img`
    height:100%
`
const InfoContainer = styled.div`
    text-align:center;
    flex:1;
    margin-top:70px;
`
const Title = styled.h1`
    font-size:70px;
`
const Desc = styled.h1`
    margin:60px;
    font-size:20;
    font-weight:500;
`
const Button = styled.button`
    font-size:25px;
    font-weight:bold;
    cursor:pointer;
    background-color:transparent;
`
const Slider = () =>{
    const [slideIndex, setSlideIndex] = useState(0)
    const handleClick =(direction)=>{
        if(direction === "left"){
            setSlideIndex(slideIndex > 0 ? slideIndex -1 : 2)
        }else{
            setSlideIndex(slideIndex < 2 ? slideIndex +1: 0)
        }
    }
    return(
        <Container>
            <Arrow direction="left" onClick={()=>handleClick("left")}>
                <ArrowLeft/>
            </Arrow>
             <Wrapper slideIndex={slideIndex}>
                 {sliderItems.map(item=>(
                    <Slide bg={item.bg} key={item.id}>
                        <ImageContainer>
                            <Image src={item.img}/>
                        </ImageContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.desc}</Desc>
                            <Button>Shop Now</Button>
                        </InfoContainer>
                    </Slide>
                    ))}
                </Wrapper>         
            <Arrow direction="right" onClick={()=>handleClick("right")}>
                <ArrowRight/>
            </Arrow>
            
        </Container>
    )
}



export default Slider