import DB from '../_db';
const {Register } = DB;
export default class RegisterService {
    generateToken(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    createRegister = ({tenantId,companyId,barId}) => {
        return Register.create({
            barId:barId,
            companyId:companyId,
            tenantId:tenantId,
            apiKey:this.generateToken(20),
            apiSecret:this.generateToken(8),
            name:"default name",
            status:"ACTIVE_DISCO"
        })
    }
    findByName = (name) => {
        return Register.findOne({
            name: name
        })
    }

    findRegisters=(filter) =>{
        return Register.find(filter)
    }
}
