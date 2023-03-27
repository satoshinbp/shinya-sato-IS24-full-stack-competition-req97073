import React, { useState } from 'react'
import createProduct from '../api/createProduct'
import '../App.css'

function ProductForm({ setOpen, setProducts }) {
  const [productName, setProductName] = useState('')
  const [scrumMasterName, setScrumMasterName] = useState('')
  const [productOwnerName, setProductOwnerName] = useState('')
  const [developerNames, setDeveloperNames] = useState([])
  const [startDate, setStartDate] = useState('')
  const [methodology, setMethodology] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await createProduct({
      productName,
      scrumMasterName,
      productOwnerName,
      developerNames,
      startDate: startDate.replace(/-/g, '/'),
      methodology,
    })
    setProducts((prev) => [...prev, data])
    setOpen(false)
  }

  const handleClose = () => setOpen(false)

  const handleDeveloperNameChange = (e, index) => {
    const newDeveloperNames = [...developerNames]
    newDeveloperNames[index] = e.target.value
    setDeveloperNames(newDeveloperNames)
  }

  const addDeveloperNameField = () => {
    if (developerNames.length >= 5) return
    setDeveloperNames([...developerNames, ''])
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create Product</h2>
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
              {developerNames.map((name, index) => (
                <input
                  key={index}
                  type="text"
                  value={name}
                  onChange={(e) => handleDeveloperNameChange(e, index)}
                  required={index === 0}
                />
              ))}
              {developerNames.length < 5 && (
                <button type="button" onClick={addDeveloperNameField}>
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
            <button type="submit">Submit</button>
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
