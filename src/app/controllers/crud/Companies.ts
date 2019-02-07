import CompaniesService from "../../db/CompaniesService";
import IntegratorService from "../../db/IntegratorService";

export default class CompaniesController {


    companyService=new CompaniesService()
    integratorService=new IntegratorService();
    createIntegrator=(req,res)=> {
            this.integratorService.addIntegration({
                name:"Manual Integration",
                id:"manual",
                apiKey:"444",
                apiSecret:"Secret",
            }).then((integrator)=>{
                res.send(integrator)
            })
    }
    addCompany=(req,res)=>{

        const {tenantId,location,name,vat}=req.body;
        console.log(req.body)
        this.integratorService.getManualIntegrator()
            .then((manual)=>{
                this.companyService.addCompany({
                    tenantId:tenantId,location:location,legalName:name,taxId:vat,integratorId:manual._id
                }).then((createdCompany)=>{
                    res.status(201);
                    res.send(createdCompany)
                })
            })
    }
    getCompanies=(req,res)=>{
        this.companyService.getCompanies().then((companies)=>{
            res.status(200);
            res.send(companies)
        })
    }
}

}
