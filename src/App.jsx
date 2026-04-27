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
    <>
      <h1>Choose any product</h1>

      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <p>
              {product.name} ({product.price.toFixed(2)})
            </p>
            <button
              onClick={() =>
                dispatch({ type: "ADD_PRODUCT", payload: product })
              }
            >
              Add to cart
            </button>
          </li>
        ))}
      </ul>

      {addedProducts.length > 0 && (
        <>
          <h1>Your cart</h1>

          <ul>
            {addedProducts.map((product, index) => (
              <li key={index}>
                <p>
                  {product.quantity} * {product.name} (
                  {product.price.toFixed(2) + "euro"})
                </p>
                <button
                  onClick={() =>
                    dispatch({ type: "REMOVE_PRODUCT", payload: product })
                  }
                >
                  Remove from cart
                </button>
              </li>
            ))}
          </ul>

          <h2>Total: {total.toFixed(2)} euro</h2>
        </>
      )}
    </>
  );
}
