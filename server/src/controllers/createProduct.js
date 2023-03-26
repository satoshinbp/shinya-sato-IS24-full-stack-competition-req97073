import { v4 as uuidv4 } from 'uuid'
import { readProductsFile, writeProductsFile } from '../lib/fs.js'
import { validateDeveloperNames, validateMethodology, validateStartDate } from '../lib/validations.js'

const createProduct = (req, res) => {
  try {
    validateInput()
    const products = readProductsFile()
    const newProduct = generateProduct()
    products.push(newProduct)
    writeProductsFile(products)
    res.status(201).json(newProduct)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }

  function validateInput() {
    const { productName, productOwnerName, developerNames, scrumMasterName, startDate, methodology } = req.body
    if (!productName || !productOwnerName || !developerNames || !scrumMasterName || !startDate || !methodology) {
      throw new Error('All fields are required')
    }
    validateDeveloperNames(developerNames)
    validateStartDate(startDate)
    validateMethodology(methodology)
  }

  function generateProduct() {
    const { productName, productOwnerName, developerNames, scrumMasterName, startDate, methodology } = req.body
    return {
      productId: uuidv4(),
      productName,
      productOwnerName,
      developerNames,
      scrumMasterName,
      startDate,
      methodology,
    }
  }
}

export default createProduct
