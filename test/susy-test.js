/**
 * Tests to see if susy sass functions are importable and work.
 * Uses sass-true with mocha to unit test Susy imports etc.
 */

// Set up some global variables.
var assert = require('assert');
var sassTrue = require('sass-true');

// Node system module.
var path = require('path');

// Just runs the most basic check to see if Mocha can assert.
// If this failed, your set up is wrong.
describe('mocha assert check', function() {
  it('should return true when the values are equal', function() {
    assert.equal(1,1);
  });
});

// See that we can find susy period.
// If this fails, your set up is wrong.
describe('basic susy test', function() {
  it('should return true when susy dir is detected', function() {
    // Look up the path to susy. It should be just 'susy'.
    var susyPath = path.posix.basename('../node_modules/susy');
    assert.equal(susyPath, 'susy');  
  });
});

// Runs several sass-true test (i.e. to see susy works once imported!).
// See the file: susy-test.scss for details.
var sassTestFile = path.join(__dirname, 'susy-test.scss');
sassTrue.runSass({file: sassTestFile}, describe, it);

