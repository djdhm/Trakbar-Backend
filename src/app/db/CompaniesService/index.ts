import DB from '../_db';
const {Company } = DB;
export default class CompaniesService {

    addCompany=(company)=>{
        return Company.create(company)
    }
    findCompany=(filter)=>{
        return Company.findOne(filter)
    }
    getCompanies=()=>{
        return Company.find()
    }
}
