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
    "/api/board/all",
    controller.allAccess
  );

  app.get(
    "/api/board/user",
    middlewares.authJwt.verifyToken,
    controller.userBoard
  );
}