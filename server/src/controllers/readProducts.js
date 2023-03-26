import { readProductsFile } from '../lib/fs.js'

const readProduct = (_, res) => {
  try {
    const products = readProductsFile()
    res.status(200).json(products)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export default readProduct
