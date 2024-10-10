import './shop.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function Shop() {
    const [products, setProducts] = useState([]);
    const URL="https://effective-guide-pjjq5xv46xpqc5xj-5000.app.github.dev";
    useEffect(()=>{
        axios.get(URL+'/api/products')
        .then(response=>{
            setProducts(response.data);
        })
        .catch(error=>{
            console.log("error");
        });
    }
    ,[]);
    const Item=(props)=>{
        return (
            <div key={props.id} onClick={()=>props.callback(props)}>
                <img src={props.img} width={200} height={200}></img><br></br>
                id: {props.id} <br></br>
                Name: {props.name} <br></br>
                Price: {props.price} <br></br>
            </div>
        );
    }
    
    const [cart, setCart] = useState([]);
    function addCart(item){
        setCart([...cart, {id:item.id, name:item.name,price:item.price,img:item.img }]);
    }
    const productsList = products.map(item=><Item {...item} callback={addCart}/>);
    const cartList = cart.map((item,index)=><li>{item.id} {item.name} {item.price} 
    <button onClick={()=>{
        setCart(cart.filter((i,_index)=>index!=_index));
    }}>
    Remove</button>
    </li>);
    let totalPrice = 0;
    for(let i = 0; i < cart.length; i++){
        totalPrice+=cart[i].price;
    }
    return (<>
        <div className='grid-container'>{productsList}</div>
        <h1>Cart</h1>
        <ol>{cartList}</ol>
        <h1>Summary: {totalPrice} </h1>
        <button onClick={()=>setCart([])}>Clear</button>
        </>
    );
}