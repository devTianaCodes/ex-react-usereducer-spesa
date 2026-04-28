import { useReducer } from "react";

const products = [
  { name: "Apple", price: 0.5 },
  { name: "Bread", price: 1.2 },
  { name: "Milk", price: 1.0 },
  { name: "Pasta", price: 0.7 },
];

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const productInCart = state.find(
        product => product.name === action.payload.name
      );

      if (productInCart) {
        return state.map(product =>
          product.name === action.payload.name
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      }

      return [...state, { ...action.payload, quantity: 1 }];
    }

    case "REMOVE_PRODUCT":
      return state.filter(product => product.name !== action.payload.name);

    default:
      return state;
  }
}

export default function App() {
  const [addedProducts, dispatch] = useReducer(cartReducer, []);

  const total = addedProducts.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);




  
  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">Mini Shop</p>
        <h1>Choose any product</h1>
        <p className="subtitle">
          Add a few groceries to your cart with soft pastel vibes.
        </p>

        <ul className="product-list">
          {products.map((product, index) => (
            <li key={index} className="product-item">
              <div>
                <p className="product-name">{product.name}</p>
                <p className="product-price">{product.price.toFixed(2)} euro</p>
              </div>

              <button
                className="primary-button"
                onClick={() =>
                  dispatch({ type: "ADD_PRODUCT", payload: product })
                }
              >
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="card cart-card">
        <div className="cart-header">
          <div>
            <p className="eyebrow">Shopping Cart</p>
            <h2>Your cart</h2>
          </div>
          <span className="cart-count">{addedProducts.length} items</span>
        </div>

        {addedProducts.length > 0 ? (
          <>
            <ul className="cart-list">
              {addedProducts.map((product, index) => (
                <li key={index} className="cart-item">
                  <div>
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">
                      {product.quantity} x {product.price.toFixed(2)} euro
                    </p>
                  </div>

                  <button
                    className="secondary-button"
                    onClick={() =>
                      dispatch({ type: "REMOVE_PRODUCT", payload: product })
                    }
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="total-box">
              <span>Total</span>
              <strong>{total.toFixed(2)} euro</strong>
            </div>
          </>
        ) : (
          <p className="empty-cart">Your cart is still empty.</p>
        )}
      </section>
    </main>
  );
}
