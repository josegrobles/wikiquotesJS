'use strict'
let request = require('request')
let cheerio = require('cheerio')

var getQuotes = (url, max_length) => {
    return new Promise((fulfill, reject) => {
        request("https://en.wikiquote.org" + url, function(error, response, html) {
            if (error) reject(error)
            const $ = cheerio.load(html)
            let final = []
            let count = 0;
            const name = $('h1#firstHeading').text()
            $('div#mw-content-text').children().each(function(i, elem) {
                try {
                    if ($(this).get(0).tagName == 'h2') count++
                        if (count < 2) {
                            const str = $(this).children('li').text()
                            let author = $(this).children('li').children('ul').children().last().children('i').text()
                            let text = str.substr(0, str.search(author.substr(0, 10)))
                            text = text.replace(/^[\n\s]+/g,"") //Start of String
                            text = text.replace(/[\s\n]+$/g,"") //End of String
                            text = text.replace(/\n/g," ") //Replace spaces
                            text =  text.replace(/[\']+/g,"")
                            addInformation(text,author, max_length, name,final)
                        }
                } catch (ex) {
                    if(ex instanceof SyntaxError) console.error("Error parsing text")
                }
            });
            fulfill(final)
        })
    })
}

var getUrl = name => {
    return new Promise((fulfill, reject) => {
        request("https://en.wikiquote.org/w/index.php?title=Special:Search&profile=default&fulltext=Search&search=" + name, function(error, response, html) {
            const $ = cheerio.load(html)
            const url = $("div.mw-search-result-heading").children('a').prop('href')
            if (error) reject(err)
            else fulfill(url)
        })
    })
}

var addInformation = (text, from, max_length = 200, name,array) => {
    if (from.length > 5 && text.length > 10 && text.length <= max_length) array.push({
        text: text,
        from: from,
        author:name
    })
    else if (from.length === 0 && text.length > 10 && text.length <= max_length) array.push({
        text: text,
        author:name
    })
}

var getQuotesName = (name,max_length=200) => {
    return new Promise((fulfill, reject) => {
        getUrl(name).then(result => {
            return getQuotes(result,max_length)
        }).then(result => {
            fulfill(result)
        }).catch(ex => {
            reject(ex)
        })
    })
}

var getQOTD = () => {
  return new Promise((fulfill, reject) => {
      request("https://en.wikiquote.org/wiki/Main_Page", function(error, response, html) {
          if (error) reject(error)
          const $ = cheerio.load(html)
          let text = $('div#mf-qotd').children('div').children('div').children('table').text()
          //Clean data [1.Start of string 2.Delete static message 3.End of string 4.Get Author 5.End of String 6.Replace for spaces]
          text = text.replace(/^[\n\s]+/g,"")
          text = {text:text.substr(0, text.search("There is a page for each month where previous"))}
          text.text = text.text.replace(/[\s\n]+$/g,"")
          let author = text.text.match(/[a-zA-Z\s]+/g)
          author = author[author.length-1]
          author = author.substr(1,author.length-2)
          text.text = text.text.substr(0,text.text.search(/~[a-zA-Z\s]+/g))
          text.text = text.text.replace(/[\s\n]+$/g,"")
          text.text = text.text.replace(/\n/g," ")
          fulfill({text:text,author:author})
      })
  })
}

var getRandomQuote = () => {
  return new Promise((fulfill,reject) => {
    const authors = [
        "Mahatma Gandhi",
        "Albert Einstein",
        "Martin Luther King, Jr.",
        "Leonardo da Vinci",
        "Walt Disney",
        "Edgar Allan Poe",
        "Sigmund Freud",
        "Thomas A. Edison",
        "Robin Williams",
        "Steve Jobs"
    ]
    const randomAuthor = Math.round(Math.random()*authors.length)
    getQuotesName(authors[randomAuthor]).then(result => {
      let choosen = undefined
      while(choosen === undefined){
        const randomQuote = Math.round(Math.random()*result.length)
        choosen = result[randomQuote]
      }
      fulfill(choosen)
    }).catch(error => {
      reject(error)
    })
  })
}

module.exports = {
    getQuotesName: getQuotesName,
    getQOTD: getQOTD,
    getRandomQuote:getRandomQuote
}
