import React, { Component } from 'react';
import Client from 'shopify-buy'

const ShopContext = React.createContext()

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
    storefrontAccessToken: "dd4d4dc146542ba7763305d71d1b3d38",
    domain: "graphql.myshopify.com",
  });

class ShopProvider extends Component{
    state = {
        products: [],
        product: {},
        checkout: {},
        isCartOpen: false,
    }
componentDidMount(){
    //check if localstorage has checkout id saved
    if (localStorage.checkout){
        this.fetchCheckout(localStorage.checkout)
    }
    //if there is no checkout_id, then create a new checkout
    else{
        this.createCheckout()
    }
    //else fetch checkout from shopify
}

createCheckout = async () => {
    const checkout = await client.checkout.create();
    localStorage.setItem("checkout",checkout.id)
    this.setState({checkout : checkout})
    console.log("checkout",checkout)
}

fetchCheckout = async (checkoutId) => {
    client.checkout.fetch(checkoutId).then((checkout) => {
        this.setState({ checkout: checkout });
      })
      .catch((err) => console.log(err));
  };
//adding lineitems to cart
addItemToCheckout= async (variantId, quantity) => {
    const lineItemsToAdd = [{
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];
    const checkout = await client.checkout.addLineItems(this.state.checkout.id, lineItemsToAdd);
    this.setState({ checkout: checkout });
    console.log(checkout.lineItems);
  };


      fetchAllProducts = async () => {
        const products = await client.product.fetchAll();
        console.log("all products", products)
        this.setState({ products: products });
      };  


    fetchProductWithId = async (id) => {
        const product = await client.product.fetch(id);
        console.log("single product",product)
        this.setState({product: product});
        // console.log(JSON.stringify(product));

        // return product;
    };




    closeCart = () => {this.setState({isCartOpen:false})};

    openCart = () =>{this.setState({isCartOpen:true})};

    render(){
        return (
            <ShopContext.Provider value={{
                ...this.state,
                fetchAllProducts: this.fetchAllProducts,
                fetchProductWithId: this.fetchProductWithId,
                closeCart: this.closeCart,
                openCart:this.openCart,
                addItemToCheckout: this.addItemToCheckout,
            }}>
              {this.props.children}
            </ShopContext.Provider>
        )
    }
}

const ShopConsumer = ShopContext.Consumer

export {ShopConsumer, ShopContext };
export default ShopProvider;