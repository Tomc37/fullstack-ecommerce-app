export const createAccount = async (user) => {
  try {
    const res = await fetch(`/auth/register`, {
      method: "POST",
      body: user,
    });
    return res.json();
  } catch (e) {
    console.log(e);
    return { e };
  }
};

export const loginAccount = async (email, password) => {
  try {
    const res = await fetch(`/auth/login`, {
      method: "POST",
      body: new URLSearchParams({
        email: email,
        password: password,
      }),
      credentials: "include",
    });
    return res.json();
  } catch (e) {
    console.log(e);
    return { e };
  }
};

export const logOut = async () => {
  try {
    const res = await fetch(`/auth/logout`, {
      method: "GET",
      credentials: "include",
    });
    return res;
  } catch (e) {
    console.log(e);
    return { e };
  }
};

export const changeEmail = async (data) => {
  try {
    const res = await fetch(`/account/email`, {
      credentials: "include",
      method: "PUT",
      body: data,
    });
    return res.json();
  } catch (e) {
    console.log(e);
    return { e };
  }
};

export const changePassword = async (data) => {
  try {
    const res = await fetch(`/account/password`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    return res.json();
  } catch (e) {
    console.log(e);
    return { e };
  }
};

export const getCart = async () => {
  try {
    const res = await fetch(`/cart`, {
      credentials: "include",
      method: "GET",
    });
    return res.json();
  } catch (e) {
    console.log(e);
    return { e };
  }
};

export const getProducts = async () => {
  try {
    const res = await fetch(`/products/getproducts`, {
      method: "GET",
      credentials: "include",
    });
    return res.json();
  } catch (e) {
    console.log(e);
    return { e };
  }
};

export const addToCart = async (cartId, productId, price) => {
  try {
    //   console.log(`
    //   cartId: ${cartId}\n
    //   productId: ${productId}\n
    //   price: ${price}
    // `)
    const res = await fetch(`/products/addtocart`, {
      method: "POST",
      credentials: "include",
      body: new URLSearchParams({
        cartId: cartId,
        productId: productId,
        price: price,
      }),
    });
    return res.json();
  } catch (e) {
    console.log(e);
    return { e };
  }
};

export const retrieveCartProducts = async (cartId) => {
  try {
    // console.log(cartId);
    const res = await fetch(`/cart/checkout`, {
      method: "POST",
      body: new URLSearchParams({
        cartId: cartId,
      }),
    });
    return res.json();
  } catch (e) {
    console.log(e);
    return { e };
  }
};

export const updateCartAmount = async (
  newValue,
  oldValue,
  cartId,
  productId,
  price
) => {
  try {
    console.log(`
    newValue: ${newValue}\n
    oldValue: ${oldValue}\n
    productId: ${productId}\n
    cart.id: ${cartId}\n
    price: ${price}
    `);
    const res = await fetch(`/cart/checkout/updateamount`, {
      method: "PUT",

      body: new URLSearchParams({
        newValue: newValue,
        oldValue: oldValue,
        cartId: cartId,
        productId: productId,
        price: price,
      }),
    });
    return res.status;
  } catch (e) {
    console.log(e);
    return { e };
  }
};

export const deleteFromCart = async (cartId, productId, price, cartAmount) => {
  try {
    const res = await fetch(`/cart/checkout/delete`, {
      method: "DELETE",
      body: new URLSearchParams({
        cartId: cartId,
        productId: productId,
        price: price,
        cartAmount: cartAmount,
      }),
    });
    return res.status;
  } catch (e) {
    console.log(e);
    return { e };
  }
};

export const submitOrder = async (orderPrice, cartProducts, cartId) => {
//   console.log(`
//   orderPrice: ${orderPrice}\n
//   cartProducts: ${cartProducts}\n
//   cartId: ${cartId}\n
// `);
  try {
    const res = await fetch(`/cart/checkout/submitorder`, {
      method: "POST",
      body: new URLSearchParams({
        orderPrice: orderPrice,
        cartProducts: cartProducts,
        cartId: cartId,
      }),
      credentials: "include"
    });
    return res.status;
  } catch (e) {
    console.log(e);
    return { e };
  }
};

export const retrieveOrders = async () => {
  try {
    const res = await fetch(`/orders/getorders`, {
      method: "GET",
      credentials: "include"
    })
    return res.json()
  } catch (e) {
    console.log(e);
    return { e };
  }
}

export const retrieveOrder = async (id) => {
  try {
    const res = await fetch(`/orders/${id}`, {
      method: "GET",
      credentials: "include"
    })
    return res.json();
  } catch (e) {
    console.log(e);
    return { e, };
  }
}