import React, { useState } from 'react'
import createProduct from '../api/createProduct'
import updateProduct from '../api/updateProduct'
import '../styles/App.css'

function ProductForm({ product, setOpen, setProducts }) {
  const [productName, setProductName] = useState(product ? product.productName : '')
  const [scrumMasterName, setScrumMasterName] = useState(product ? product.scrumMasterName : '')
  const [productOwnerName, setProductOwnerName] = useState(product ? product.productOwnerName : '')
  const [developers, setDevelopers] = useState(product ? product.developers : [''])
  const [startDate, setStartDate] = useState(product ? product.startDate.replace(/\//g, '-') : '')
  const [methodology, setMethodology] = useState(product ? product.methodology : '')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newProduct = {
      productName,
      scrumMasterName,
      productOwnerName,
      developers,
      methodology,
    }

    product ? await updateAndSetProduct(newProduct) : await createAndSetProduct(newProduct)

    setOpen(false)

    async function updateAndSetProduct(newProduct) {
      try {
        const data = await updateProduct(product.productId, newProduct)
        setProducts((prev) => {
          const index = prev.findIndex((p) => p.productId === data.productId)
          prev[index] = data
          return prev
        })
      } catch (err) {
        console.error('Error updating product:', err)
      }
    }

    async function createAndSetProduct(newProduct) {
      try {
        const data = await createProduct({
          ...newProduct,
          startDate: startDate.replace(/-/g, '/'),
        })
        setProducts((prev) => [...prev, data])
      } catch (err) {
        console.error('Error creating product:', err)
      }
    }
  }

  const handleClose = () => setOpen(false)

  const handleDevelopersChange = (e, index) => {
    const newDevelopers = [...developers]
    newDevelopers[index] = e.target.value
    setDevelopers(newDevelopers)
  }

  const addDeveloperField = () => {
    if (developers.length >= 5) return
    setDevelopers([...developers, ''])
  }

  const removeDeveloperField = (index) => () => {
    if (developers.length === 1) return
    const newDevelopers = [...developers]
    newDevelopers.splice(index, 1)
    setDevelopers(newDevelopers)
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{`${product ? 'Update' : 'Create'} Product`}</h2>
          <span className="close" onClick={handleClose}>
            &times;
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-with-label">
            <label htmlFor="name">Name</label>
            <input
              id="product-name"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          <div className="input-with-label">
            <label htmlFor="scrum-master">Scrum Master</label>
            <input
              id="scrum-master"
              type="text"
              value={scrumMasterName}
              onChange={(e) => setScrumMasterName(e.target.value)}
              required
            />
          </div>

          <div className="input-with-label">
            <label htmlFor="owner">Owner</label>
            <input
              id="product-owner"
              type="text"
              value={productOwnerName}
              onChange={(e) => setProductOwnerName(e.target.value)}
              required
            />
          </div>

          <div className="input-with-label">
            <label htmlFor="developers">Developers</label>
            <div className="inputs-container">
              {developers.map((name, index) => (
                <div key={index} className="input-with-clear">
                  <input type="text" value={name} onChange={(e) => handleDevelopersChange(e, index)} required />
                  <span className="close" onClick={removeDeveloperField(index)}>
                    &times;
                  </span>
                </div>
              ))}
              {developers.length < 5 && (
                <button type="button" onClick={addDeveloperField}>
                  Add Developer
                </button>
              )}
            </div>
          </div>

          <div className="input-with-label">
            <label htmlFor="start-date">Start Date</label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              disabled={!!product}
            />
          </div>

          <div className="input-with-label">
            <label htmlFor="methodology">Methodology</label>
            <select id="methodology" value={methodology} onChange={(e) => setMethodology(e.target.value)} required>
              <option value="">Select Methodology</option>
              <option value="Agile">Agile</option>
              <option value="Waterfall">Waterfall</option>
            </select>
          </div>

          <div className="modal-action">
            <button type="submit">Save</button>
            <button type="button" className="button-secondary" onClick={handleClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductForm
