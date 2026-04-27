import { useState } from "react";

export default function App() {
  
  const products = [
    { name: "Apple", price: 0.5 },
    { name: "Bread", price: 1.2 },
    { name: "Milk", price: 1.0 }, 
    { name: "Pasta", price: 0.7 },
  ];

  const[addedProducts, setAddedProducts] = useState([]);
  console.log(addedProducts);

  const addToCart = product => {
    const isProductAlreadyAdded = addedProducts.some(
      addedProduct => addedProduct.name === product.name
    );

    if (isProductAlreadyAdded) {
      setAddedProducts(curr =>
        curr.map(addedProduct =>
          addedProduct.name === product.name
            ? { ...addedProduct, quantity: addedProduct.quantity + 1 }
            : addedProduct
        )
      );
      return;
    }

    setAddedProducts(curr => [
      ...curr,
      {
        ...product,
        quantity: 1
      }
    ]);
  }

  return(
    <>
      <h1>Choose any product</h1>

      <ul>
        {
          products.map((product, index) =>(
            <li key={index}>
              <p>{product.name}  ({product.price.toFixed(2)})</p>
              <button onClick={() => addToCart(product)}>Add to cart</button>
            </li>
          ))
        }
      </ul>

      {addedProducts.length > 0 && (<>
        <h1>Your cart</h1>
        <ul>
          {addedProducts.map((p,i) => (
            <li key={i}>
              <p>{p.quantity} * {p.name} ({p.price.toFixed(2) + "euro"})</p>

            </li>
          ))}
        </ul>
      </>)}
    </>
  )
}
