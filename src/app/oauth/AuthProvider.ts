import {Request,Response } from "express";
export default  interface AuthProvider{
    /**
     *
     * @param request  value : payload returned from oauth provider after succefull authorization
     *                          each provider has a unique structure of auth payload
     *                          it contains credentials like : Access Token generally and refresh token sometimes
     *   @return Promise
     */

    handleAuth(req:Request):Promise<{}>

    /**
     *
     * @param req:Request containing credentials of user
     *             this functions handles the settings fetching from provider api
     *             like getting address or currency
     *             and save them in database
     * @return true if the use has been saved succefully or false if not
     *
     */
    saveInDatabase(res:Response):Boolean


    getLocations(req:Request):Promise<any>
}
