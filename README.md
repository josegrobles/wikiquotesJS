# wikiquotesJS
A fun way to obtain quotes from your favourite people
#Installing
```
npm install wikiquotesjs
```
#How to use
##Import
```javascript
let wiki = require('wikiquotesjs')
```
##Getting a Random Quote
```javascript
wiki.getRandomQuote().then(result => {
  console.log(result)
})
```
##Getting QOTD
```javascript
wiki.QOTD().then(result => {
  console.log(result)
})
```
##Getting a Quote from your favourite person
```javascript
let name = "Albert Einstein"
wiki.getQuotesName(name).then(result => {
  console.log(result)
})
```
### Method usage:
####``` wiki.getQuotesName(name,max_length)```
- name => **Name of the person you want to get quotes from**
- max_length => **Maximum length for a quote**
