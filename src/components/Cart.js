import React, { useContext } from 'react';
import {ShopContext} from '../context/shopContext'
import {Div, SideDrawer, Text, Row, Col, Anchor} from 'atomize'



const Cart = () => {

    const { isCartOpen, closeCart, checkout } = useContext(ShopContext)

//  display message in cart if cart is empty   
    // if (!checkout.lineItems) 
    // return <div>No Items In Cart</div>
    
return (
    <SideDrawer isOpen = {isCartOpen} onClose={closeCart} >
        <Div d="flex" flexDir="column" m={{b:"4rem"}}/>
            {checkout.lineItems && checkout.lineItems.map(items => (
                
                <Row key={items.id}>
                    <Col>
                    <Div bgImg={items.variant.image.src} bgSize="cover" bgPos="center cnenter" h="5rem" w="4rem" ></Div>
                    </Col>
                    <Col>
                    <Text>{items.title} </Text>
                    <Text>{items.variant.title} </Text>
                    <Text>Quantity:{items.quantity}</Text>
                    </Col>
                    <Col>
                    <Text>${items.variant.price}</Text>
                    </Col>
                </Row>
                    ))}  
                    
                    <Anchor href={checkout.webUrl} target="_blank">Checkout</Anchor>
    </SideDrawer>

    )
    
}

export default Cart