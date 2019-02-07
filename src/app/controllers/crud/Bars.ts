import BarsService from "../../db/BarsService";
import RegisterService from "../../db/RegisterService";

export default class BarsController {
    barsService=new BarsService()
    addBar=(req,res)=>{
        const {name,tenantId,companyId,location,timezone}=req.body;
        this.barsService.insertBar({
            name,tenantId,companyId,location,timezone
        }).then((createdBar)=>{
            res.status(201);
            res.send(createdBar)
        })
    }
    getBars=(req,res)=>{
        this.barsService.findBars({}).then((bars)=>{
            res.status(200);
            res.send(bars)
        })
    }
}
