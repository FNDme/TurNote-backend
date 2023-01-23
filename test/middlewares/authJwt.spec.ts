import 'mocha';
import { expect } from 'chai';
import { authJwt } from '../../src/middlewares/authJwt';

describe('AuthJwt', () => {
  it('if no token is provided, should return 403', () => {
    const req = { headers: { token: 'null' } };
    const res = { status: (code: number) => { return { send: (message: string) => { return { code, message }; } }; } };
    const next = () => {};
    const result = authJwt.verifyToken(req, res, next);
    expect(result.code).to.equal(403);
  });
});
