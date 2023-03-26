import express from 'express'
import createProduct from './controllers/createProduct.js'
import readProducts from './controllers/readProducts.js'
import updateProduct from './controllers/updateProduct.js'

const app = express()
app.use(express.json())

app.get('/health', (_, res) => {
  res.status(200).send('OK')
})

app.get('/products', readProducts)

app.post('/product', createProduct)

app.put('/product/:id', updateProduct)

const port = 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
