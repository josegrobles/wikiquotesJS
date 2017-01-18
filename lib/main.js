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
            $('div#mw-content-text').children().each(function(i, elem) {
                try {
                    if ($(this).get(0).tagName == 'h2') count++
                        if (count < 2) {
                            const str = $(this).children('li').text()
                            const text = str.substr(0, str.search($(this).children('li').children('ul').children().last().text().substr(0, 10)))
                            addInformation(text, $(this).children('li').children('ul').children().last().children('i').text(), max_length, final)
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
    return new Promise((fulfill, reject) => {
        request("https://en.wikiquote.org/w/index.php?title=Special:Search&profile=default&fulltext=Search&search=" + name, function(error, response, html) {
            const $ = cheerio.load(html)
            const url = $("div.mw-search-result-heading").children('a').prop('href')
            if (error) reject(err)
            else fulfill(url)
        })
    })
}

var addInformation = (text, from, max_length = 200, array) => {
    if (from.length > 5 && text.length > 10 && text.length <= max_length) array.push({
        text: text,
        from: from
    })
    else if (from.length === 0 && text.length > 10 && text.length <= max_length) array.push({
        text: text
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
          text = {text:text.substr(0, text.search("There is a page for each month where previous"))}
          fulfill(text)
      })
  })
}

module.exports = {
    getQuotesName: getQuotesName,
    getQOTD: getQOTD
}
