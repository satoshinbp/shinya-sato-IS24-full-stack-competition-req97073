import { faker } from '@faker-js/faker'
import { format } from 'date-fns'

const generateRandomInt = (min = 1, max = 5) => Math.floor(Math.random() * max) + min

// This is used to pre-populate sample products.
const mockProducts = (length = 40) =>
  Array.from({ length }, () => {
    const productId = faker.datatype.uuid()
    const productName = faker.commerce.productName()
    const productOwnerName = faker.name.fullName()
    const developerNames = Array.from({ length: generateRandomInt(1, 5) }, () => faker.name.fullName())
    const scrumMasterName = faker.name.fullName()
    const startDate = format(faker.date.past(), 'yyyy/MM/dd')
    const methodology = faker.helpers.arrayElement(['Agile', 'Waterfall'])

    return {
      productId,
      productName,
      productOwnerName,
      developerNames,
      scrumMasterName,
      startDate,
      methodology,
    }
  })

export default mockProducts
