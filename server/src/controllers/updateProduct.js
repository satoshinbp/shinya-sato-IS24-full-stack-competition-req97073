import { readProductsFile, writeProductsFile } from '../lib/fs.js'
import { validateDevelopers, validateMethodology } from '../lib/validations.js'

const updateProduct = (req, res) => {
  try {
    const { productName, productOwnerName, developers, scrumMasterName, methodology } = req.body

    validateInput({ developers, methodology })

    // Write the updated product to the file
    const products = readProductsFile()
    const index = products.findIndex((p) => p.productId === req.params.id)
    if (index === -1) {
      return res.status(404).send({ error: 'Product not found' })
    }
    products[index] = updateProductFields(products[index], {
      productName,
      productOwnerName,
      developers,
      scrumMasterName,
      methodology,
    })
    writeProductsFile(products)

    res.status(200).json(products[index])
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const validateInput = ({ developers, methodology }) => {
  if (developers) {
    validateDevelopers(developers)
  }
  if (methodology) {
    validateMethodology(methodology)
  }
}

const updateProductFields = (product, { productName, productOwnerName, developers, scrumMasterName, methodology }) => {
  const updatedProduct = { ...product }

  // Loop through the new product fields and update the product if a value is provided
  Object.entries({ productName, productOwnerName, developers, scrumMasterName, methodology }).forEach(
    ([field, value]) => {
      if (value) {
        updatedProduct[field] = value
      }
    }
  )

  return updatedProduct
}

export default updateProduct
