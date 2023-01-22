import { authJwt } from './authJwt';
import { verifySignUp } from './verifySignUp';

export const middlewares = {
  authJwt,
  verifySignUp
};