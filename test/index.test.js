const expect = require('chai').expect;
const { lodashConverter } = require('../index');
const substitutionBlocks = require('./substitutionBlock');
const malformedSubstitutionBlocks = require('./malformedSubstitutionBlock');

describe('Convert sparkpost syntax to lodash', () => {
  describe('converts sparkpost block expressions', () => {
    Object.keys(substitutionBlocks).forEach((sparkpost) => {
      it(sparkpost, () => {
        expect(lodashConverter(sparkpost).trim()).to.eql(substitutionBlocks[sparkpost]);
      });
    });
  });

  describe('throws an error if incorect relational or logical operator used', () => {
    malformedSubstitutionBlocks.forEach((sparkpost) => {
      it(sparkpost, () => {
        let converted;
        try {
          converted = lodashConverter(sparkpost);
          expect(converted).to.not.exist;
        } catch (err) {
          expect(err).to.exist;
          expect(converted).to.not.exist;
        }
      });
    });
  });
});
