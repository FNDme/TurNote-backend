import 'mocha';
import { expect } from 'chai';
import { Contribution, ContributionInterface } from '../../src/models/contribution';
import mongoose from 'mongoose';


describe('Contribution model', () => {
  let contribution: ContributionInterface;
  before(() => {
    contribution = new Contribution({
      title: 'Test title',
      description: 'Test description',
      author: new mongoose.Types.ObjectId(),
      noteRef: new mongoose.Types.ObjectId(),
      changes: 'Test changes',
      approved: false,
    });
  });
  
  it('should be able to create a new contribution', () => {
    new Contribution({
      title: 'Test title',
      description: 'Test description',
      author: new mongoose.Types.ObjectId(),
      noteRef: new mongoose.Types.ObjectId(),
      changes: 'Test changes',
      approved: false,
      created: new Date(),
    });
  });

  it('should have a title', () => {
    expect(contribution.title).to.equal('Test title');
  });

  it('should have a description', () => {
    expect(contribution.description).to.equal('Test description');
  });

  it('should have an author', () => {
    expect(contribution.author).to.not.be.undefined;
  });

  it('should have a noteRef', () => {
    expect(contribution.noteRef).to.not.be.undefined;
  });

  it('should have changes', () => {
    expect(contribution.changes).to.equal('Test changes');
  });

  it('should have an approved status', () => {
    expect(contribution.approved).to.equal(false);
  });

  it('should have a created date', () => {
    expect(contribution.created).to.not.be.undefined;
  });
});