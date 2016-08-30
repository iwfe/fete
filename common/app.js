const crypto = require('crypto')
let md5sum = crypto.createHash('md5')
md5sum.update('111111' + 'fete') //config.passwordKey
md5sum = md5sum.digest('hex')

console.log(crypto)
// console.log(md5sum)
// d04a711547058ed0efe27d8c5203f58f
// d04a711547058ed0efe27d8c5203f58f

