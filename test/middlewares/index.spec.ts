import 'mocha';
import { expect } from 'chai';
import { middlewares } from '../../src/middlewares';

describe('AuthJwt', () => {
  it('authJwt should be defined', () => {
    expect(middlewares.authJwt).to.not.be.undefined;
  });

  it('verifyToken should be defined', () => {
    expect(middlewares.authJwt.verifyToken).to.not.be.undefined;
  });
});