import React, { Component, useEffect, useContext } from 'react';
import {useParams} from 'react-router-dom';
import {Container, Text, Div, Row, Col, Button,} from 'atomize';

import {ShopContext} from '../context/shopContext';
const ProductPage = () => {
    let { id } = useParams();
   
    const { fetchProductWithId, addItemToCheckout, product, openCart } = useContext(ShopContext)
   useEffect(() => {
    fetchProductWithId(id)
    //fetchData()
    return () => {
        //setProduct(null)
        };
     }, [fetchProductWithId, id]
    )
    if (!product.title) return <div>loading...</div>
console.log('return start')

console.log(typeof(product.images))
    return (
        <Container>
            <Row m={{ b: "2rem" }} p="2rem">
                <Col>
                <Div bgImg={product.images[0].src} key={product.images.src} value={product.images.src} shadow="3" bgSize="cover" w="100%" bgPos="center center" h="40rem"/>
                </Col>
                <Col>
                <Text tag="h1" textColor="black500" textWeight="200" m={{ y: '2rem' }}>{product.title}</Text>
                    <Text tag="h3" m={{ y: '2rem' }} textWeight="200">${product.variants[0].price}</Text>
                    <Text tag="p" textSize="paragraph" textColor="gray900" textWeight="200">{product.description}</Text>
                    <Button rounded="0" shadow="3" bg="black500" m={{ y: '2rem' }} onClick={() => {addItemToCheckout(product.variants[0].id, 1)
                    openCart()
                    }}>Add To Cart</Button>
                                                                                        {/* //normal website would allow for variant to select quantity for now quantity is set to 1 */}
                </Col>
            </Row>
        </Container>

    )
}

export default ProductPage;