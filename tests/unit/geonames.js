/* jslint node: true */
/* global describe, it */
'use strict';

var assert = require('assert');
var argh = require('argh');


describe('Geonames API ', function () {
    //Parse start-up options and set defaults
    var opts = {
        'port': +(argh.argv.port || process.env.NGN_PORT || '3000'),
        'username': argh.argv.username || process.env.NGN_USERNAME,
        'googleapikey' : argh.argv.googleapikey || process.env.NGN_GOOGLEAPIKEY
    };


    var geonames = require('../../lib/services/geonames.js')({username:opts.username});

    it('It should be possible to find place "Beringen" with postode 3580 in Belgium', function (done) {
       geonames.postalCodeLookup('3580','BE',20,function(err,res){
           assert.equal(err, null);
           assert.equal(res[0].placeName,'Beringen');
           console.log(res);
           done();
       });
    });

    it('It should be possible to find place "Beringen" using gps coordinates', function (done) {
        var lat = 51.05,
            long = 5.21,
            radius = 10,
            maxRows= 5;
        geonames.findNearbyPostalCodes(lat,long,radius,maxRows,function(err,res){
            assert.equal(err, null);
            assert.equal(res[0].postalCode,'3580');
            console.log(res);
            done();
        });
    });

    it('It should be possible to get a list of countries where postalcode service is available', function (done) {
        geonames.postalCodeCountryInfo(function(err,res){
            assert.equal(err, null);
            assert.equal(res[0].countryCode,'AD');
            console.log(res);
            done();
        });
    });
});