/* app/controllers/welcomeController.ts */

// Import only what we need from express
import { Router, Request, Response } from 'express';
import {OauthRouter} from './oauth'
import {LocationRouter} from "./location";
import {CrudController} from "./crud";
// Assign router to the express.Router() instance
const router: Router = Router();
// The / here corresponds to the route that the WelcomeController
// is mounted on in the server.ts file.
// In this case it's /welcome

// Les routes de Oauth2
router.use('/authserver',OauthRouter)
router.use('/crud',CrudController)
router.use('/location',LocationRouter)

// Export the express.Router() instance to be used by server.ts
export const IndexRoutes: Router = router;
