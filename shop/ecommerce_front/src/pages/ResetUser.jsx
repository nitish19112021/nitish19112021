// import React, { useState } from "react";
// // import { useSelector } from "react-redux";
// import styled from "styled-components";
// import Footer from "../component/Footer";
// import Navbar from "../component/Navbar";

// import "bootstrap/dist/css/bootstrap.min.css";
// import Modal from "react-bootstrap/Modal";

// const Container = styled.div``;

// const ResetUser = () => {
//     const [show, setShow] = useState(false);
//     const [show1, setShow1] = useState(false);
//     // const user = useSelector(state=>state.user.currentUser)

//     const handleClick = ()=>{
//         setShow(true);
//     }
//     const handleClick1 = ()=>{
//         setShow(false);
//         setShow1(true);
//     }
//     return (
//         <>
//             <Container>
//                 <Navbar />
//                 <button onClick={handleClick}>Show Me</button>
//                 <Modal
//                     size="sm"
//                     show={show}
//                     onHide={() => setShow(false)}
//                     aria-labelledby="example-modal-sizes-title-sm"
//                 >
//                     <Modal.Header closeButton>
//                         <Modal.Title id="example-modal-sizes-title-sm">
//                             Small Modal
//                         </Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>Link
//                     <button onClick={handleClick1}>Show Me</button>
//                     </Modal.Body>
//                 </Modal>
//                 <Modal
//                     size="sm"
//                     show={show1}
//                     onHide={() => setShow1(false)}
//                     aria-labelledby="example-modal-sizes-title-sm"
//                 >
//                     <Modal.Header closeButton>
//                         <Modal.Title id="example-modal-sizes-title-sm">
//                             Small Modal
//                         </Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>Link</Modal.Body>
//                 </Modal>
//                 {/* Welcome <span style={{color:'red'}}>{`${user.username.charAt(0).toUpperCase() + user.username.substr(1).toLowerCase()}`}</span> */}

//                 <Footer />
//             </Container>
//         </>
//     );
// };

// export default ResetUser;
