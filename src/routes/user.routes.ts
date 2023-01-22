import { middlewares } from '../middlewares';
import * as controller from "../controllers/user.controller";

export function userRoutes(app: any) {
  app.use(function(req: any, res: any, next: any) {
    res.header(
      "Access-Control-Allow-Headers",
      "X-Access-Token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/test/all",
    controller.allAccess
  );

  app.get(
    "/api/test/user",
    middlewares.authJwt.verifyToken,
    controller.userBoard
  );
}