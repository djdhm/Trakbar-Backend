import Axios from 'axios';
import CassanovaConfig from "./config";
import { Request } from "express";
import {emitKeypressEvents} from "readline";
import AuthProvider from "../AuthProvider";
class CassanovaAuth implements AuthProvider{

    authorize(apiKey:Request): Promise<any> {
        // Exchange token from Cassanova API
        // And return a promise to continue Request Handling in Controller
        return new Promise((resolve: any , reject: any): void => {
             Axios.post(CassanovaConfig.provider_url,{

                    apiKey:apiKey.body.apiKey

            }).then((response)=>{
                // Resolve Succes authentification
                 console.log("REsponse")
                resolve(response.data);
            }).catch((error)=>{
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
    handleAuth=(request:Request)=>{
        return new Promise(((resolve, reject) => {

            const token= request.body.apiKey;
            console.log(request.body);
            console.log(token);

            // @ts-ignore
            Axios.create(//{
            //     headers:{
            //         "Content-Type":"application/json",
            //         "X-Requested-With":"*"
            // }}

        ).post(this.getUrl(),
                {
                    apiKey:"3a64f26wefew8-6837-499c-9647-c8d6951c665a "
                }).then((response:any)=>{

                    //sconsole.log(response.data)
                    resolve(response.data)


            }).catch((error)=>{
              //  console.log(error)
                reject  (error.data)
            })
        }))
    }


    private getUrl() {
        return "https://api.cassanova.com/apikey/token";
    }

    saveInDatabase(res: e.Response): Boolean {
        return false;
    }
}

export default CassanovaAuth;
