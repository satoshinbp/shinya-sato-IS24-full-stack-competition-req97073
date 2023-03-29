import { faker } from '@faker-js/faker'
import { format } from 'date-fns'
import { writeProductsFile } from '../lib/fs.js'

// This is used to pre-populate sample products.
const mockProducts = (length = 40) => {
  const developerOptions = Array.from({ length: 10 }, () => faker.name.fullName())
  const scrumMasterNameOptions = Array.from({ length: 5 }, () => faker.name.fullName())
  const methodologyOptions = ['Agile', 'Waterfall']

  return Array.from({ length }, () => {
    const productId = faker.datatype.uuid()
    const productName = faker.commerce.productName()
    const productOwnerName = faker.name.fullName()
    const developers = generateRandomArrayFromOptions(developerOptions, 1, 5)
    const scrumMasterName = faker.helpers.arrayElement(scrumMasterNameOptions)
    const startDate = format(faker.date.past(), 'yyyy/MM/dd')
    const methodology = faker.helpers.arrayElement(methodologyOptions)

    return {
      productId,
      productName,
      productOwnerName,
      developers,
      scrumMasterName,
      startDate,
      methodology,
    }
  })

  function generateRandomArrayFromOptions(options, min = 1, max = 5) {
    const result = []
    const tempOptions = [...options]
    for (let i = 0; i < generateRandomInt(min, max); i++) {
      const randomIndex = Math.floor(Math.random() * tempOptions.length)
      result.push(tempOptions[randomIndex])
      tempOptions.splice(randomIndex, 1)
    }
    return result

    function generateRandomInt(min, max) {
      return Math.floor(Math.random() * max) + min
    }
  }
}

const products = mockProducts(40)
writeProductsFile(products)
