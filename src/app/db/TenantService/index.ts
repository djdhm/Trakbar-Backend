
import DB from '../_db'
const {Tenant}=DB;
export default class TenantService {

    findTenant=(subDomain:String)=>{
            return Tenant.findOne({
                    subdomain:subDomain
                })
    }
    getTenants=()=>{
        return Tenant.find()
    }
    findOrCreate=(subdoamin:String):Promise<any>=>{
        return new Promise(((resolve, reject) => {
            this.findTenant(subdoamin).then((tenant)=>{
                if(tenant) resolve(tenant)
                else {
                    console.log("new tenant created")
                     Tenant.create({
                        subdomain:subdoamin
                    }).then((createdUser)=>{
                        resolve(createdUser)
                     })
                }
            })
        }))
    }
    createTenant=(tenant)=>{
        return Tenant.create(tenant)
    }
}
