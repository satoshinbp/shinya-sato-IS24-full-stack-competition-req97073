import express from 'express'
import createProduct from './controllers/createProduct.js'
import readProducts from './controllers/readProducts.js'
import updateProduct from './controllers/updateProduct.js'

const app = express()
app.use(express.json())

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/api/health', (_, res) => {
  res.status(200).send('OK')
})

app.get('/api/products', readProducts)
app.post('/api/product', createProduct)
app.put('/api/product/:id', updateProduct)

const port = 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
