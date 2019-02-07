import {Request,Response } from "express";
import Axios from "axios";
import AuthProvider from "../AuthProvider";
import Database from "../../db/_db";
import UserService from "../../db/UserService";
import TenantService from "../../db/TenantService";
import BarsService from "../../db/BarsService";
import PosterService from "../../ProvidersServices/posterService";
var  FormData =require('form-data');
export default class PosterAuth implements AuthProvider{
    barsService=new BarsService();
    tenantService=new TenantService();
    posterService=new PosterService();
    saveInDatabase(res: Response): Boolean {
        console.log(res);
        return true;
    }
    userService=new UserService();
    getApplicationId=()=>{
        return 447
    }
    getApplicationSecret=()=> {
        return "dca71c2c889ecdce6e265999d47960c7"
    }
    getRedirectURI=()=>{
        return "http://localhost:3000/oauth/poster/eu"
    }
    getUrl=(account)=>{
        return "https://"+account+".joinposter.com/api/v2/auth/access_token"
    }
     User = Database.User

    handleAuth=(req:Request)=>{
          return new Promise(((resolve, reject) => {

              let account=req.body.account;
              let code=req.body.code;
              console.log(code);
              let bodyFormData =  FormData();
              bodyFormData.append("application_id",this.getApplicationId());
              bodyFormData.append("application_secret",this.getApplicationSecret());
              bodyFormData.append("grant_type","authorization_code");
              bodyFormData.append("redirect_uri","http://127.0.0.1:3000/oauth/poster/eu");
              bodyFormData.append("code",code);
            console.log(this.getUrl(account))
              // @ts-ignore
              Axios.create(
                  {
                      headers:bodyFormData.getHeaders()
                  }
              ).post(this.getUrl(account),
                  bodyFormData).then((response:any)=>{

                  if(response.data.code==400){
                      reject(response.data);
                  }else {
                      // Create new Tenant and make auth to continue registration
                      this.tenantService.findOrCreate(account).then((newTenant)=>{
                          response.data.subdomain=account
                          response.data.tenant=newTenant;
                            resolve(response.data)
                      })
                      console.log(response.data)
                    //  resolve(response.data)

                  }
              }).catch((error)=>{
                  console.log(error)
                  reject(error.error_message)
              })
          }))
    }
     getSettings=()=>{
         return new Promise(((resolve, reject) =>
         {
             Axios.get("https://joinposter.com/api/settings.getAllSettings")
                 .then((settings)=>{
                     resolve(settings);
                 }).catch((error)=>{
                     reject(error)
             })
         }))
    }

    getLocations(req: Request): Promise<any> {
       return this.posterService.getLocations(req.body.token)
    }



}
