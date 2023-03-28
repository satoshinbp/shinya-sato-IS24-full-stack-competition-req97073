import { readProductsFile, writeProductsFile } from '../lib/fs.js'
import { validateDevelopers, validateMethodology } from '../lib/validations.js'

const updateProduct = (req, res) => {
  try {
    validateInput()
    const products = readProductsFile()
    const index = products.findIndex((p) => p.productId === req.params.id)
    if (index === -1) {
      return res.status(404).send({ error: 'Product not found' })
    }
    products[index] = updateProduct(products[index])
    writeProductsFile(products)
    res.status(200).json(products[index])
  } catch (err) {
    res.status(400).json({ error: err.message })
  }

  function validateInput() {
    const { developers, methodology } = req.body
    if (developers) {
      validateDevelopers(developers)
    }
    if (methodology) {
      validateMethodology(methodology)
    }
  }

  function updateProduct(product) {
    const { productName, productOwnerName, developers, scrumMasterName, methodology } = req.body
    const newProduct = { ...product }
    if (productName) {
      newProduct.productName = productName
    }
    if (productOwnerName) {
      newProduct.productOwnerName = productOwnerName
    }
    if (developers) {
      newProduct.developers = developers
    }
    if (scrumMasterName) {
      newProduct.scrumMasterName = scrumMasterName
    }
    if (methodology) {
      newProduct.methodology = methodology
    }
    return newProduct
  }
}
export default updateProduct
