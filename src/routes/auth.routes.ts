import { middlewares } from '../middlewares';
import * as controller from "../controllers/auth.controller";

export function authRoutes(app: any) {
  app.use(function(req: any, res: any, next: any) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    middlewares.verifySignUp.checkDuplicateUsernameOrEmail,
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.delete("/api/auth/removeAccount",
    middlewares.authJwt.verifyToken,
    controller.removeAccount
  );

  app.get("/api/auth/signout", controller.signout);
}