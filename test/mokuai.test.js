'use strict';

var grunt = require('grunt');

function testEqual(test, file){
    var gen = grunt.file.read('test/tmp/'+file);
    var expected = grunt.file.read('test/expected/'+file);
    test.equal(gen, expected);
}

exports.testEquals = function(test){
    testEqual(test, 'simple.js');
    testEqual(test, 'simple.autoexports.js');
    testEqual(test, 'custom.js');
    testEqual(test, 'custom.jollyjumper.js');
    testEqual(test, 'custom.besthorse.js');
    test.done();
};