import "./Products.css";
import React, { useState, useEffect } from "react";
import { getProducts, addToCart, getCart } from "../util";

function Products({ cart, setCart }) {
  const [products, setProducts] = useState();
  const [staticProducts, setStaticProducts] = useState();

  const handleCategoryClick = (e) => {
    setProducts(staticProducts.filter((product) => product.category === e.currentTarget.id));
  };

  const handleProductClick = async (e) => {
    e.preventDefault();
    const productId = e.currentTarget.id;
    const price = products.find(object => object.id === productId).price;
    const cartId = cart.id;
    // console.log(`
    //   cartId: ${cartId}\n
    //   productId: ${productId}\n
    //   price: ${price}
    // `)
    try {
      await addToCart(cartId, productId, price);
      setCart(await getCart());
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const obtainProducts = async () => {
      try {
        const productList = await getProducts();
        setProducts(productList);
        setStaticProducts(productList);
      } catch (e) {
        console.log(e);
      }
    };
    obtainProducts();
  }, []);

  return (
    <div id="products">
      <div id="categories">
        <h5>Categories</h5>
        <p id="CPU" onClick={handleCategoryClick}>
          Processors &gt;
        </p>
        <p id="GPU" onClick={handleCategoryClick}>
          Graphics Cards &gt;
        </p>
        <p id="Memory" onClick={handleCategoryClick}>
          Memory &gt;
        </p>
        <p id="HD" onClick={handleCategoryClick}>
          Storage &gt;
        </p>
        <p id="MB" onClick={handleCategoryClick}>
          Mainboards &gt;
        </p>
        <p id="PSU" onClick={handleCategoryClick}>
          Power Supplies &gt;
        </p>
        <p id="Case" onClick={handleCategoryClick}>
          Cases &gt;
        </p>
      </div>
      <div id="product-list">
        {products &&
          products.map((product) => {
            return (
              <div className="product-listing" key={product.id}>
                <img
                  src={require(`../../resources/${product.image}.jpg`)}
                  alt={product.image}
                />
                <p className="name">{product.name}</p>
                <span className="price">{product.price}</span>
                <span className="vat">Including VAT</span>
                <div className="button" id={product.id} onClick={handleProductClick} >
                  <p>ADD TO BASKET</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Products;
