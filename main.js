'use strict'
let request = require('request')
let cheerio = require('cheerio')

function getQuotes() {
    request("https://en.wikiquote.org/wiki/Albert_Einstein", function(error, response, html) {
        let $ = cheerio.load(html)
        let final = []
        let count = 0;
        $('div#mw-content-text').children().each(function(i, elem) {
            try {
                if ($(this).get(0).tagName == 'h2') count++
                    if (count < 2) {
                        let str = $(this).children('li').text()
                        let where = str.search($(this).children('li').children('ul').children().last().text().substr(0,10))
                        let text = str.substr(0,where)
                        addInformation(text, $(this).children('li').children('ul').children().last().children('i').text(), final)
                    }
            } catch (ex) {
                console.log(ex)
            }
            console.log(final)
            return final
        });
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

getQuotes()
