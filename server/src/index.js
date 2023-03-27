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
