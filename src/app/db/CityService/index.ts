import DB from '../_db';
import {createInflateRaw} from "zlib";
const {City } = DB;
export default class CityService {
   private static instance:CityService=null;
   public  static getInstance=()=>{
        if(!CityService.instance){
            CityService.instance=new CityService();
        }
        return CityService.instance;
    }
    insertCity=(city)=>{
       console.log(city)
        return City.create(city)
    }

    findCity=(city)=>{
        return City.findOne(city)
    }
}
