
import { Router, Request, Response } from 'express';
import BarsController from "../controllers/crud/Bars";
import TenantsController from "../controllers/crud/Tenants";
import CompaniesController from "../controllers/crud/Companies";
import RegisterController from "../controllers/crud/Register";
const router: Router = Router();
const barsController=new BarsController();
const tenantController=new TenantsController()
const companiesController=new CompaniesController();
const registerController=new RegisterController();
// Handle Authorization
router.get('/bars',barsController.getBars);
router.post('/bars',barsController.addBar);
router.post('/tenants',tenantController.addTenant);
router.get('/tenants',tenantController.getTenants);
router.post('/companies',companiesController.addCompany);
router.get('/companies',companiesController.getCompanies);
router.get('/integrator',companiesController.createIntegrator)

router.get('/registers',registerController.getRegisters);
router.post('/registers',registerController.addRegister)
// Export the express.Router() instance to be used by server.ts
export const CrudController: Router = router;
