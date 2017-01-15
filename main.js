var request = require('request')
var cheerio = require('cheerio')

var final = []

request("https://en.wikiquote.org/wiki/Martin_Luther_King,_Jr.",function(error,response,html){
  var $ = cheerio.load(html)
  $('div#mw-content-text').children('ul').children('li').each(function(i, elem) {
    if($(this).children('i').text() != '') final.push({text: $(this).children('ul').children().first().text(), from:$(this).children('ul').children().last().children('i').text()})
    else if($(this).children('b').text() != '') final.push({text: $(this).children('b').text(), from:$(this).children('ul').children().last().children('i').text()})
});
console.log(final)

})
