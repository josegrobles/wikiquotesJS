var chai = require('chai'),
    chaiAsPromised = require("chai-as-promised"),
    wiki = require('../lib/main.js'),
    getQuotesName = wiki.getQuotesName

chai.use(chaiAsPromised)
var should = chai.should()
