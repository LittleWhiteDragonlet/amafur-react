const { length } = require('ramda')

module.exports = p =>
  new Promise((resolve, reject) => {
    const phone = p.trim().replace(/^\D+/g, '').replace(/ /g,'')
    if (length(phone) === 11 && phone.startsWith('1')) {
      resolve('+' + phone)
    }
    if (length(phone) === 10) {
      resolve('+1' + phone)
    }
    reject('bad number')
  })
