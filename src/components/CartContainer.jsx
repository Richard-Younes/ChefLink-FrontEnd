import { useEffect, useState } from 'react';
import { url } from '../values.js';
import Spinner from './Spinner.jsx';

function CartContainer() {
    const [cartInfo, setCartInfo] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${url}cart/get_cart_details`, 
            {
                credentials: 'include',
            });
            const data = await response.json();
            console.log(data);
            setCartInfo(data.data);
        }
        fetchData();
    }, []);
    
    async function removeItem(id_bundle) {
        const response = await fetch(`${url}cart/remove_from_cart`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ bundle_id: id_bundle }),
        });
        const data = await response.json();
        console.log(data);
    }

    async function getBundleInfo(id_bundles) {
        const response = await fetch(`${url}cart/get_bundle_info`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ bundle_ids: id_bundles }),
        });
        const data = await response.json();
        console.log(data);
    }

    if (!cartInfo) {
        return <Spinner />;
    }
    const bundle = cartInfo.bundles;
    
    const cartId = cartInfo.cart.iD;

    return (
        <div>
            <h1>My Cart</h1>
            <p>-------------------------------------</p>
            {bundle.map((item) => (
                <div key={item.id_bundle}>
                    <p>Name: {item.name}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Special Instructions: {item.special_instruction}</p>
                    <p>Options</p>
                    {item.id_options.map((option, index) => (
                        <div key={index}>
                            <p>option name: {option}</p>
                        </div>
                    ))}
                    <h4>Bundle Price: {item.total_bundle_price}</h4>
                    <button onClick={() => getBundleInfo([item.id_bundle])}>GetInfo</button>
                    <button onClick={() => removeItem(item.id_bundle)}>Remove</button>
                    <p>-------------------------------------</p>
                </div>
            ))}
            <div>
                <h3>Price: {cartInfo.cart.price}</h3>
                
            </div>
        </div>
    )
}


export default CartContainer
