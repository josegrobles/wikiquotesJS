let wiki = require('./lib/main.js')

wiki.getRandomQuote().then(result => {
  console.log(result)
})
