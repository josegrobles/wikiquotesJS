'use strict'
let request = require('request')
let cheerio = require('cheerio')


request("https://en.wikiquote.org/wiki/Albert_Einstein", function(error, response, html) {
    let $ = cheerio.load(html)
    let final = []
    let count = 0;
    $('div#mw-content-text').children().each(function(i, elem) {
        try {
            if ($(this).get(0).tagName == 'h2') count++
            if(count < 2){
              let text = ''
                $(this).children('li').children().each(function(i,elem){
                    if($(this).get(0).tagName != 'ul')  text+= $(this).text() + ' '
                })
                addInformation(text, $(this).children('li').children('ul').children().last().children('i').text(), final)
          }
        } catch (ex) {
            console.log(ex)
        }
        console.log(final)
    });
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
