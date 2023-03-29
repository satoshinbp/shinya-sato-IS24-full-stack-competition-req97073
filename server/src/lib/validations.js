const validateDevelopers = (developers) => {
  if (!isArrLengthInRange(developers, 1, 5)) {
    throw new Error('Developers field must be an array with 1 to 5 elements')
  }

  if (developers.some((d) => !d)) {
    throw new Error('Each developer field must not be empty string')
  }

  function isArrLengthInRange(arr, min, max) {
    return Array.isArray(arr) && developers.length >= min && developers.length <= max
  }
}

const validateStartDate = (startDate) => {
  if (!isDateInValidFormat(startDate)) {
    throw new Error('Start date must be a valid date in YYYY/MM/DD format')
  }

  function isDateInValidFormat(date) {
    // Check if start date is a valid date in YYYY/MM/DD format
    const REGEX_DATE = /^\d{4}\/\d{2}\/\d{2}$/
    return REGEX_DATE.test(date)
  }
}

const validateMethodology = (methodology) => {
  const METHODOLOGY_OPTIONS = ['Agile', 'Waterfall']
  if (!METHODOLOGY_OPTIONS.includes(methodology)) {
    throw new Error('Methodology must be Agile or Waterfall')
  }
}

export { validateDevelopers, validateStartDate, validateMethodology }
