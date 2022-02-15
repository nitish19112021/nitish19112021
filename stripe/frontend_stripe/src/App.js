import './App.css';
import React, {useState} from 'react'
import StripeCheckout from 'react-stripe-checkout'


function App() {
  const [product,setProduct]  = useState({
    name:'React product',
    price:10,
    productBy:'facebook',
  })
  const makePayment = async (token) =>{
    const body = {
      token,
      product
    }
    const headers = {
      'Content-type': "application/json"
    }
    return await fetch(`http://localhost:5000/payment`,{
      method:'POST',
      headers,
      body:JSON.stringify(body)
    }).then(res=>{
      console.log("response",res)
      const {status} = res;
      console.log('status', status);
    }).catch(err=>{
      console.log("eror",err);
    })
  }

  return (
    <StripeCheckout
     stripeKey="pk_test_51KMrD1SAicAzV7UxLHoli4AtMWw783Scw0L1qROQg1fGDhnRwO63WAZYx6cizdm3bJNJR1TuMfv10sp7UCSdBWun00Hw7lDHlO"
      token={makePayment}
       name='Secure Payment Here'
       amount={product.price * 100}
       >
        <button className='btn-btn-large red'>Order For Just {product.price}$</button>

    </StripeCheckout>
  );
}

export default App;
