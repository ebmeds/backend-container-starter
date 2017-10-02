import chai from 'chai';
import facets from './facets';

const { expect } = chai;

describe('facets.js', () => {
  it('should be an array of length 0', () => {
    expect(facets).to.be.an('Array');
    expect(facets.length).to.equal(0);
  });
});
