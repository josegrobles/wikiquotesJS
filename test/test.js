var chai = require('chai'),
    chaiAsPromised = require("chai-as-promised"),
    wiki = require('../main.js'),
    getQuotes = wiki.getQuotes,
    getUrl = wiki.getUrl

chai.use(chaiAsPromised)
var should = chai.should()


describe('#getUrl()',function(){
  it('Find Fernando Alonso URL',function(){
    return getUrl('Fernando Alonso').should.eventually.equal('/wiki/Fernando_Alonso')
  })

  it('Find Martin Luther King Jr. URL',function(){
    return getUrl('Martin Luther King Jr.').should.eventually.equal('/wiki/Martin_Luther_King,_Jr.')
  })

  it('Find Albert Einstein URL',function(){
    return getUrl('Albert Einstein').should.eventually.equal('/wiki/Albert_Einstein')
  })
})
