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
  const [developer, setDeveloper] = useState('')

  const scrumMasterNames = _.uniq(products.map((p) => p.scrumMasterName))
  const developers = _.uniq(products.flatMap((p) => p.developers))

  const filteredProducts = products
    .filter((p) => !scrumMasterName || p.scrumMasterName === scrumMasterName)
    .filter((p) => !developer || p.developers.includes(developer))

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        const data = await fetchProducts()
        setProducts(data)
      } catch (err) {
        console.error('Error fetching product:', err)
      }
    }
    fetchAndSetProducts()
  }, [])

  return (
    <div className="wrapper">
      {open && <ProductForm setOpen={setOpen} product={product} setProducts={setProducts} />}
      <Header />
      <Toolbar />
      <Table />
    </div>
  )

  function Header() {
    return (
      <header>
        <h1>IMB Products ({filteredProducts.length})</h1>
      </header>
    )
  }

  function Toolbar() {
    return (
      <div className="toolbar">
        <Filter />
        <button
          onClick={() => {
            setProduct(null)
            setOpen(true)
          }}
        >
          Create Product
        </button>
      </div>
    )

    function Filter() {
      return (
        <div className="filter">
          <div className="input-with-label">
            <label htmlFor="scrum-master">Scrum Master</label>
            <select
              id="filter-scrum-master"
              value={scrumMasterName}
              onChange={(e) => setScrumMasterName(e.target.value)}
            >
              <option value="">Select Scrum Master</option>
              {scrumMasterNames.map((name, i) => (
                <option value={name} key={i}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-with-label">
            <label htmlFor="scrum-master">Developer</label>
            <select id="filter-developer" value={developer} onChange={(e) => setDeveloper(e.target.value)}>
              <option value="">Select Developer</option>
              {developers.map((dev, i) => (
                <option value={dev} key={i}>
                  {dev}
                </option>
              ))}
            </select>
          </div>
        </div>
      )
    }
  }

  function Table() {
    return (
      <table>
        <thead>
          <tr>
            <th />
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
            <tr key={i}>
              <td>
                <button
                  onClick={() => {
                    setProduct(product)
                    setOpen(true)
                  }}
                >
                  Edit
                </button>
              </td>
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
    )
  }
}

export default App
