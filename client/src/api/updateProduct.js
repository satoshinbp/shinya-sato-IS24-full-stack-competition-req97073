const updateProduct = async (productId, product) => {
  try {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    }
    const res = await fetch(`http://localhost:3000/api/product/${productId}`, options)
    const data = await res.json()
    return data
  } catch (err) {
    console.error('Error updating product:', err)
  }
}

export default updateProduct
