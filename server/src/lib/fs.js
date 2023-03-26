import fs from 'fs'

const PATH_DATA_PRODUCTS = 'src/data/products.json'

const readProductsFile = () => {
  const data = fs.readFileSync(PATH_DATA_PRODUCTS)
  return JSON.parse(data)
}

const writeProductsFile = (products) => {
  const json = JSON.stringify(products)
  fs.writeFileSync(PATH_DATA_PRODUCTS, json)
}

export { readProductsFile, writeProductsFile }
