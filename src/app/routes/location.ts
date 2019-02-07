
import { Router, Request, Response } from 'express';
import LocationController from "../controllers/LocationController";
const router: Router = Router();
const googleMapsController=new LocationController();

// Handle Authorization
router.get('/autocomplete',googleMapsController.autocomplete);
router.post('/geocode',googleMapsController.geocode);
router.get('/address',googleMapsController.address);
router.get('/timezone',googleMapsController.timeZone);

router.post('/findCity',googleMapsController.findCity);
router.post('/createCity',googleMapsController.createCity);


// Export the express.Router() instance to be used by server.ts
export const LocationRouter: Router = router;
