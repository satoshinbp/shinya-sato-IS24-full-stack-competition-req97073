import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('http://localhost:3000/products')
      const data = await res.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <div>
      <div className="Wrapper">
        <h1>IMB Products ({products.length})</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Scrum Master</th>
              <th>Owner</th>
              <th>Developers</th>
              <th>Start Date</th>
              <th>Methodology</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={i}>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.scrumMasterName}</td>
                <td>{product.productOwnerName}</td>
                <td>
                  {product.developerNames.map((n) => (
                    <div>{n}</div>
                  ))}
                </td>
                <td>{product.startDate}</td>
                <td>{product.methodology}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
