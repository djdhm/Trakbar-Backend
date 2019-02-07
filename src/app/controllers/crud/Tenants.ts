import TenantService from "../../db/TenantService";

export default class TenantsController {
    tenantsService=new TenantService()
    addTenant=(req,res)=>{
        const {affiliateId}=req.body;
        this.tenantsService.createTenant({
            affiliateId:affiliateId
        }).then((createdTenant)=>{
            res.status(201);
            res.send(createdTenant)
        })
    }
    getTenants=(req,res)=>{
        this.tenantsService.getTenants().then((tenants)=>{
            res.status(200);
            res.send(tenants)
        })
    }
}
