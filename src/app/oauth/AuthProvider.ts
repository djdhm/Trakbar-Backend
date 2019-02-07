import {Request,Response } from "express";
export default  interface AuthProvider{
    handleAuth(req:Request):Promise<{}>
    saveInDatabase(res:Response):Boolean
    getLocations(req:Request):Promise<any>
}
