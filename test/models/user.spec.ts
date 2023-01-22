import 'mocha';
import { expect } from 'chai';
import { User, UserInterface } from '../../src/models/user';
import mongoose from 'mongoose';

describe('User model', () => {
  let user: UserInterface;
  before(() => {
    user = new User({
      username: 'Test username',
      name: 'Test name',
      email: 'abc@email.com',
      password: 'Hash password',
    });
  });

  it('should have a username', () => {
    expect(user.username).to.equal('Test username');
  });

  it('should have a name', () => {
    expect(user.name).to.equal('Test name');
  });

  it('should have an email', () => {
    expect(user.email).to.equal('abc@email.com');
  });

  it('should have a password', () => {
    expect(user.password).to.equal('Hash password');
  });
});