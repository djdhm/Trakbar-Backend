import Axios, {AxiosError, AxiosResponse} from 'axios';
import CassanovaConfig from "./config";
import { Request,Response } from "express";
import {emitKeypressEvents} from "readline";
import AuthProvider from "../AuthProvider";
import CassanovaService from "../../ProvidersServices/cassanovaService";
class CassanovaAuth implements AuthProvider{
     hostname = "https://api.cassanova.com";

    handleAuth(apiKey:Request): Promise<any> {
        console.log("Handling cassanova auth")
        // Exchange token from Cassanova API
        // And return a promise to continue Request Handling in Controller

        let params = new URLSearchParams();
        params.append('apiKey', apiKey.body.apiKey);
        console.log(params)

        return new Promise((resolve: any , reject: any): void => {
            var headers = {
                'Content-Type': 'application/json',
                'X-Requested-With': '*'
            }
             Axios.post(CassanovaConfig.provider_url,{
                 "apiKey":apiKey.body.apiKey
             },{
                 headers:headers
             })
                 .then((response)=>{
                // Resolve Succes authentification
                 console.log("REsponse")
                resolve(response.data);
            }).catch((error:AxiosError)=>{
                console.log(error.response.data)
                // Catch Auth Error
                reject(error);

            })
        });


    }



    getAccesToken(userId: String): String {
        return "";
    }

    saveInDB(userInformation: any): Boolean {
        return true;
    }
    handleAuth2=(request:Request)=>{
        return new Promise(((resolve, reject) => {

            const token= request.body.apiKey;


            // @ts-ignore
            Axios.create({
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "*"
                }}
        ).post(this.getUrl(),
                {
                    apiKey:'3a64f26wefew8-6837-499c-9647-c8d6951c665a '
                }).then((response:AxiosResponse)=>{
                    resolve(response.data)


            }).catch((error:AxiosError)=>{
              //  console.log(error)
                reject  (error)
            })
        }))
    }


    private getUrl() {
        return "https://api.cassanova.com/apikey/token";
    }



    getLocations(req: Request): Promise<any> {
        let access_token=req.query.token;
        console.log(access_token)
        return new CassanovaService().getLocations(access_token);
    }

    saveInDatabase(res: Response): Boolean {
        return false;
    }
}

export default CassanovaAuth;
