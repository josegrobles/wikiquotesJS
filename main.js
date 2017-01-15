'use strict'
let request = require('request')
let cheerio = require('cheerio')


request("https://en.wikiquote.org/wiki/Albert_Einstein", function(error, response, html) {
    let $ = cheerio.load(html)
    let final = []
    $('div#mw-content-text').children('ul').children('li').each(function(i, elem) {
        try {
            const firstElement = $(this).children().first().get(0).tagName
            switch (firstElement) {
                case 'i':
                    addInformation($(this).children('ul').children().first().text(),$(this).children('ul').children().last().children('i').text(),final)
                    break
                case 'b':
                      addInformation($(this).children('b').text(),$(this).children('ul').children().last().children('i').text(),final)
                      break
                default:
                    break
            }
        } catch (ex) {
          console.log(ex)
        }
        console.log(final)
    });
})

function addInformation(text,from,array){
  if(from.length >0 && text.length > 0) array.push({text:text,from:from})
  else if(from.length === 0) array.push({text:text})
}
