const createProduct = async (product) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  }
  const res = await fetch('http://localhost:3000/api/product', options)
  const data = await res.json()
  return data
}

export default createProduct
