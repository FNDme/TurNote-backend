import 'mocha';
import { expect } from 'chai';
import { db } from '../../src/models';

describe('Models', () => {
  it('should have a user model', () => {
    expect(db.user).to.not.be.undefined;
  });

  it('should have a note model', () => {
    expect(db.note).to.not.be.undefined;
  });

  it('should have a contribution model', () => {
    expect(db.contribution).to.not.be.undefined;
  });
});