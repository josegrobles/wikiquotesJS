let wiki = require('./main.js')

wiki.getUrl("henry Ford").then(result => {
  return wiki.getQuotes(result)
}).then(result => {
  console.log(result)
})
