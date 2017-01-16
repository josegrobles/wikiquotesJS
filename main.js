'use strict'
let request = require('request')
let cheerio = require('cheerio')

var getQuotes = url => {
  return new Promise((fulfill,reject) => {
    request("https://en.wikiquote.org" + url, function(error, response, html) {
        if (error) reject(error)
        const $ = cheerio.load(html)
        let final = []
        let count = 0;
        $('div#mw-content-text').children().each(function(i, elem) {
            try {
                if ($(this).get(0).tagName == 'h2') count++
                    if (count < 2) {
                        const str = $(this).children('li').text()
                        const text = str.substr(0, str.search($(this).children('li').children('ul').children().last().text().substr(0, 10)))
                        addInformation(text, $(this).children('li').children('ul').children().last().children('i').text(), final)
                    }
            } catch (ex) {
                console.log(ex)
            }
            fulfill(final)
        });
    })
  })
}

var getUrl = name => {
  return new Promise((fulfill,reject) => {
    request("https://en.wikiquote.org/w/index.php?title=Special:Search&profile=default&fulltext=Search&search=" + name, function(error, response, html) {
        const $ = cheerio.load(html)
        const url = $("div.mw-search-result-heading").children('a').prop('href')
        if (error) reject(err)
        else fulfill(url)
    })
  })
}

function addInformation(text, from, array) {
    if (from.length > 5 && text.length > 10) array.push({
        text: text,
        from: from
    })
    else if (from.length === 0 && text.length > 10) array.push({
        text: text
    })
}

getUrl("henry Ford").then(result => {
  return getQuotes(result)
}).then(result => {
  console.log(result)
})
