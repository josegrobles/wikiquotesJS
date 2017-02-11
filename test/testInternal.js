'use strict'
const chai = require('chai'),
    chaiAsPromised = require("chai-as-promised"),
    rewire = require('rewire'),
    wikiRewire = rewire('../lib/main.js')

chai.use(chaiAsPromised)
const should = chai.should()

const getUrl = wikiRewire.__get__('getUrl')
const getQuotes = wikiRewire.__get__('getQuotes')


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

describe('Get quotes from given URL',function(){
  it('Find Martin Luther King Jr. quotes',function(){
    return getQuotes('/wiki/Martin_Luther_King,_Jr.',500).should.eventually.have.length.above(20)
  })

  it('Find Albert Einstein quotes',function(){
    return getQuotes('/wiki/Albert_Einstein',1500).should.eventually.have.length.above(30)
  })

  it('Find William Shakespeare quotes',function(){
    return getQuotes('/wiki/William_Shakespeare',1500).should.eventually.have.length.above(40)
  })
})
