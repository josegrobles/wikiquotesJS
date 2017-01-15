'use strict'
let request = require('request')
let cheerio = require('cheerio')


request("https://en.wikiquote.org/wiki/Albert_Einstein", function(error, response, html) {
    let $ = cheerio.load(html)
    let final = []
    $('div#mw-content-text').children('ul').children('li').each(function(i, elem) {
        try {
            let text = $(this).first().contents().filter(function() {
                return this.type === 'text';
            }).text()
            addInformation(text, $(this).children('ul').children().last().children('i').text(), final)
        } catch (ex) {
            console.log(ex)
        }
    });
    console.log(final)
})

function addInformation(text, from, array) {
    if (from.length > 5 && text.length > 10) array.push({
        text: text,
        from: from
    })
    else if (from.length === 0 && text.length > 10) array.push({
        text: text
    })
}
