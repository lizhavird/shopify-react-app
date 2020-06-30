import React, {useContext} from 'react'
import {Container, Anchor} from 'atomize'
import {Link} from 'react-router-dom'
import {ShopContext} from "../context/shopContext"
import cart from "../cart-outline.svg"
import home from "../home-outline.svg"

const Navbar = () => {
    const { openCart } = useContext(ShopContext)
    return (
        <Container d="flex" flexDir="row" p="2rem" justify="space-between" >
            <Link to ="/"><img src={home} style={{height:"30px"}}/></Link>
            <Anchor onClick={() => openCart()}><img src={cart} style={{height:"30px"}}/></Anchor>
        </Container>

    )
}

export default Navbar

