import { length } from 'ramda'

export const normalizePrice = value => {
  if (!value) {
    return value
  }

  if (!value.includes('.')) {
    return value
  }
  const onlyNums = value.replace(/^[0-9]([.,][0-9]{1,3})?$/g, '').toString()
  const integers = onlyNums.split('.')[0]
  const decimals = onlyNums.split('.')[1]

  const fullNum = integers.concat('.').concat(decimals)
  if (length(decimals) > 2) {
    const numVals = parseFloat(fullNum, 10)
    const withDecimals = numVals.toFixed(2)
    return withDecimals.toString()
  }

  return fullNum
}
