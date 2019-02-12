import AuthProvider from "../AuthProvider";
import {SclobyConfiguration} from './config'
import {Request,Response} from "express";
import Axios, {AxiosError, AxiosResponse} from "axios";
var  FormData =require('form-data');
export default class SclobyAuth implements AuthProvider{
    handleAuth(req: Request): Promise<{}> {
        return new Promise(((resolve, reject) => {
            let code = req.query.code;
            console.log(code)
            let formData= FormData();
            formData.append("client_id",SclobyConfiguration.client_id);
            formData.append("client_secret",SclobyConfiguration.client_secret);
            formData.append("code",code);
            formData.append("redirect_uri",SclobyConfiguration.redirect_uri);
            Axios.create({
                headers: formData.getHeaders()
        }).post(SclobyConfiguration.url,formData)
                .then((credentials:AxiosResponse)=>{
                    resolve(credentials.data)
            }).catch((error:AxiosError)=>{
                    console.log(error)
                    reject(error)
            })
        }))
    }

    getLocations(req: Request): Promise<any> {
        let accessToken=req.body.access_token;
        return new Promise(((resolve, reject) => {
            Axios.create()
        }))
    }

    saveInDatabase(res:Response): Boolean {
        return false;
    }


}
