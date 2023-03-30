import { v4 as uuidv4 } from 'uuid'
import { readProductsFile, writeProductsFile } from '../lib/fs.js'
import { validateDevelopers, validateMethodology, validateStartDate } from '../lib/validations.js'

const createProduct = (req, res) => {
  try {
    const { productName, productOwnerName, developers, scrumMasterName, startDate, methodology } = req.body

    validateInput({ productName, productOwnerName, developers, scrumMasterName, startDate, methodology })

    const newProduct = generateProduct({
      productName,
      productOwnerName,
      developers,
      scrumMasterName,
      startDate,
      methodology,
    })

    // Write the new product to the file
    const products = readProductsFile()
    products.push(newProduct)
    writeProductsFile(products)

    res.status(201).json(newProduct)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const validateInput = ({ productName, productOwnerName, developers, scrumMasterName, startDate, methodology }) => {
  if (!productName || !productOwnerName || !developers || !scrumMasterName || !startDate || !methodology) {
    throw new Error('All fields are required')
  }
  validateDevelopers(developers)
  validateStartDate(startDate)
  validateMethodology(methodology)
}

const generateProduct = ({ productName, productOwnerName, developers, scrumMasterName, startDate, methodology }) => {
  return {
    productId: uuidv4(),
    productName,
    productOwnerName,
    developers,
    scrumMasterName,
    startDate,
    methodology,
  }
}

export default createProduct
