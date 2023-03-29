import React, { useEffect, useState } from 'react'
import ProductForm from './ProductForm'
import fetchProducts from '../api/fetchProducts'
import '../styles/App.css'
import _ from 'lodash'

function App() {
  const [open, setOpen] = useState(false)
  const [product, setProduct] = useState(null)
  const [products, setProducts] = useState([])
  const [scrumMasterName, setScrumMasterName] = useState('')

  const scrumMasterNames = _.uniq(products.map((p) => p.scrumMasterName))
  const filteredProducts = products.filter((p) => !scrumMasterName || p.scrumMasterName === scrumMasterName)

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      const data = await fetchProducts()
      setProducts(data)
    }
    fetchAndSetProducts()
  }, [])

  return (
    <div>
      {open && <ProductForm setOpen={setOpen} product={product} setProducts={setProducts} />}

      <div className="wrapper">
        <header>
          <h1>IMB Products ({filteredProducts.length})</h1>
          <button
            onClick={() => {
              setProduct(null)
              setOpen(true)
            }}
          >
            Create Product
          </button>
        </header>
        <div className="input-with-label">
          <label htmlFor="scrum-master">Scrum Master</label>
          <select id="filter-scrum-master" value={scrumMasterName} onChange={(e) => setScrumMasterName(e.target.value)}>
            <option value="">Select Scrum Master</option>
            {scrumMasterNames.map((name, i) => (
              <option value={name} key={i}>
                {name}
              </option>
            ))}
          </select>
        </div>
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
            {filteredProducts.map((product, i) => (
              <tr
                key={i}
                onClick={() => {
                  setProduct(product)
                  setOpen(true)
                }}
              >
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
