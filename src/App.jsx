export default function App() {
  
  const products = [
    { name: "Apple", price: 0.5 },
    { name: "Bread", price: 1.2 },
    { name: "Milk", price: 1.0 }, 
    { name: "Pasta", price: 0.7 },
  ];


  return(
    <>
      <h1>Choose any product</h1>

      <ul>
        {
          products.map((product, index) =>(
            <li key={index}>
              <p>{product.name}  ({product.price.toFixed(2)})</p>
            </li>
          ))
        }
      </ul>
    </>
  )
}
