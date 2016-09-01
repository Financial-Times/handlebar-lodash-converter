const expect = require('chai').expect;
const { lodashConverter } = require('../index');
const substitutionBlocks = require('./substitutionBlock');

describe('Convert sparkpost syntax to lodash', () => {
  describe('converts sparkpost block expressions', () => {
    Object.keys(substitutionBlocks).forEach((sparkpost) => {
      it(sparkpost, () => {
        expect(lodashConverter(sparkpost).trim()).to.eql(substitutionBlocks[sparkpost]);
      });
    });
  });
});
