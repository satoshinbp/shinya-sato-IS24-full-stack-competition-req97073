import React, { useEffect, useState } from 'react'
import fetchProducts from './api/fetchProducts'
import './App.css'
import ProductForm from './components/ProductForm'

function App() {
  const [products, setProducts] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      const data = await fetchProducts()
      setProducts(data)
    }
    fetchAndSetProducts()
  }, [])

  return (
    <div>
      {open && <ProductForm setOpen={setOpen} setProducts={setProducts} />}

      <div className="wrapper">
        <header>
          <h1>IMB Products ({products.length})</h1>
          <button onClick={() => setOpen(true)}>Create Product</button>
        </header>
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
                  {product.developers.map((developer, i) => (
                    <div key={i}>{developer}</div>
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
