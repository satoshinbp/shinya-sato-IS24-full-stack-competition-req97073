import fs from 'fs'

// Define the path to the file which stores products data
const pathToDataFile = 'src/data/products.json'

const readProductsFile = () => {
  const data = fs.readFileSync(pathToDataFile)
  const products = JSON.parse(data) // parse the data as JSON
  return products
}

const writeProductsFile = (products) => {
  const json = JSON.stringify(products) // convert the products to a JSON string
  fs.writeFileSync(pathToDataFile, json)
}

export { readProductsFile, writeProductsFile }
