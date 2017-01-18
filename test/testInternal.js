var chai = require('chai'),
    chaiAsPromised = require("chai-as-promised"),
    rewire = require('rewire'),
    wiki = require('../lib/main.js'),
    wikiRewire = rewire('../lib/main.js')

chai.use(chaiAsPromised)
var should = chai.should()

getUrl = wikiRewire.__get__('getUrl')


describe('Get URL needed for Quote function',function(){
  it('Find Fernando Alonso URL',function(){
    return getUrl('Fernando Alonso').should.eventually.equal('/wiki/Fernando_Alonso')
  })

  it('Find Martin Luther King Jr. URL',function(){
    return getUrl('Martin Luther King Jr.').should.eventually.equal('/wiki/Martin_Luther_King,_Jr.')
  })

  it('Find Albert Einstein URL',function(){
    return getUrl('Albert Einstein').should.eventually.equal('/wiki/Albert_Einstein')
  })

  it('Find William Shakespeare URL',function(){
    return getUrl('William Shakespeare').should.eventually.equal('/wiki/William_Shakespeare')
  })
})
