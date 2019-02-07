import RegisterService from "../../db/RegisterService";

export default class RegisterController {

    registerService=new RegisterService()
    addRegister=(req,res)=>{
        const {name,tenantId,companyId,barId}=req.body;
        console.log(req.body)
        this.registerService.createRegister({
            tenantId,companyId,barId
        }).then((createdRegister)=>{
            res.status(201);
            res.send(createdRegister)
        })
    }
    getRegisters=(req,res)=>{
        this.registerService.findRegisters({}).then((registers)=>{
            res.status(200);
            res.send(registers)
        })
    }
}
