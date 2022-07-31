'use strict';

var expect = require('chai').expect;
var { fromIsoToHuman, fromHumanToIso } = require('../index');

describe('#fromIsoToHuman', function() {
    
    it('Should return human date', function() {
        var isoDate = "20200908";
        var result = fromIsoToHuman(isoDate);
        expect(result).to.equal("08/09/2020");
    });

    it('Should manage hyphen separator', function() {
        var isoDateWithHyphen = "2020-01-02";
        var result = fromIsoToHuman(isoDateWithHyphen);
        expect(result).to.equal("02/01/2020");
    });

    it('Should manage a longer date', function() {
        var longerDate = "2022-03-09T12:31:16.699904";
        var result = fromIsoToHuman(longerDate);
        expect(result).to.equal("09/03/2022");
    });

    it('Should manage a custom format', function() {
        var isoDate = "19821122";
        var format = "YYYY-MM-DD";
        var result = fromIsoToHuman(isoDate, format);
        expect(result).to.equal("1982-11-22");
    });

})

describe('#fromHumanToIso', function() {

    it('Should return ISO date', function() {
        var humanDate = "31/12/2020";
        var result = fromHumanToIso(humanDate);
        expect(result).to.equal("20201231");
    });
})

