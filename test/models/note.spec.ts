import { expect } from 'chai';
import { Note, NoteInterface } from '../../src/models/note';
import mongoose from 'mongoose';

describe('Note model', () => {
  let note: NoteInterface;
  before(() => {
    note = new Note({
      title: 'Test title',
      content: 'Test content',
      author: new mongoose.Types.ObjectId(),
      collaborators: [],
      rating: [],
      tags: [],
      isPublic: false,
      sharedWith: [],
    });
  });

  it('should have a title', () => {
    expect(note.title).to.equal('Test title');
  });

  it('should have content', () => {
    expect(note.content).to.equal('Test content');
  });

  it('should have an author', () => {
    expect(note.author).to.not.be.undefined;
  });

  it('should have collaborators', () => {
    expect(note.collaborators).to.not.be.undefined;
  });

  it('should have a rating', () => {
    expect(note.rating).to.not.be.undefined;
  });

  it('should have tags', () => {
    expect(note.tags).to.not.be.undefined;
  });

  it('should have a public status', () => {
    expect(note.isPublic).to.equal(false);
  });

  it('should have a sharedWith list', () => {
    expect(note.sharedWith).to.not.be.undefined;
  });
});