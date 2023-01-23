import 'mocha';
import { expect } from 'chai';
import { authJwt } from '../../src/middlewares/authJwt';
import jwt from 'jsonwebtoken';

describe('AuthJwt', () => {
  it('if no token is provided, should return 403', async () => {
    const req = { headers: { token: 'null' } };
    const result = { code: 0, message: '' };
    const res = { status: (code: number) => { return { send: (message: { message: string }) => { result.code = code; result.message = message.message; } } } };
    const next = () => {};
    authJwt.verifyToken(req, res, next);
    expect(result.code).to.equal(403);
  });

  it('if token is provided but wrong, should return 401', async () => {
    const req = { headers: { token: 'test' } };
    const result = { code: 0, message: '' };
    const res = { status: (code: number) => { return { send: (message: { message: string }) => { result.code = code; result.message = message.message; } } } };
    const next = () => {};
    authJwt.verifyToken(req, res, next);
    expect(result.code).to.equal(401);
  });

  it('if token is provided, should return 200', async () => {
    const secret = 'test-secret';
    const token = jwt.sign({ id: 1 }, secret, { expiresIn: 86400 });
    const req = { headers: { token: token }, userId: 0 };
    const result = { code: 0, message: '' };
    const res = { status: (code: number) => { return { send: (message: { message: string }) => { result.code = code; result.message = message.message; } } } };
    const next = () => { 
      result.code = 200;
      expect(req.userId).to.equal(1);
    };
    authJwt.verifyToken(req, res, next);
    expect(result.code).to.equal(200);
  });
});
