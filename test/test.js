const chai = require('chai'),
    chaiAsPromised = require("chai-as-promised"),
    wiki = require('../lib/main.js'),
    getQuotesName = wiki.getQuotesName,
    getQOTD = wiki.getQOTD

chai.use(chaiAsPromised)
const should = chai.should()

describe('Get quotes from given Name',function(){
  it('Find Fernando Alonso quotes',function(){
    return , getQuotesName('Fernando Alonsoo',1000).should.eventually.have.length.above(2)
  })

  it('Find Martin Luther King Jr. quotes',function(){
    return getQuotesName('Martin Luther King Jr.').should.eventually.have.length.above(20)
  })

  it('Find Albert Einstein quotes',function(){
    return getQuotesName('Albert Einstein').should.eventually.have.length.above(30)
  })

  it('Find William Shakespeare quotes',function(){
    return getQuotesName('William Shakespeare').should.eventually.have.length.above(40)
  })
})

describe('Get QOTD',function(){
  it('Get QOTD',function(){
    return getQOTD().should.eventually.include.keys('text')
  })

})
