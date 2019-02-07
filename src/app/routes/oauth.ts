
import { Router, Request, Response } from 'express';
import OauthController from "../controllers/OauthController";
const router: Router = Router();
const OauthHandler=new OauthController();

// Handle Authorization
router.post('/handleAuth/:provider',OauthHandler.handleOauth);
router.get("/getLocations",OauthHandler.getLocations);

// Login Controller permet de s'authentifier
router.post('/access',function(req:Request,res:Response){
        res.json(req.body)
})



// Export the express.Router() instance to be used by server.ts
export const OauthRouter: Router = router;

