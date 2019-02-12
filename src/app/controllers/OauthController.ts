import CassanovaAuth from "../oauth/Cassanova";
import {Request,Response} from "express";
import PosterAuth from "../oauth/Poster/PosterAuth";
import authProviderFactory from "../oauth/authProviderFactory";
import PosterService from "../ProvidersServices/posterService";
import TenantService from "../db/TenantService";



export default class OauthController {
    posterService=new PosterService();
    tenantService=new TenantService();
    /**
     *  This controllers handle the auth process of oauth providers
     *
     *  @param oauthProvider
     * @param payloa
     */
    public handleOauth=(req:Request,res:Response)=>{

        console.log("RES")
        let providerHandler=authProviderFactory(req.params.provider)
        if(providerHandler!=null) {
            // Pass the request to the provider handler to get the auth credentials
            // and store them in database
        providerHandler.handleAuth(req).then((response)=>{



                res.status(200);
                res.send(response)
            }).catch((error)=>{
           console.log(error)
            res.status(401);
            res.send({
                error:"Authorization failed"
            })
        })}
        else{
            res.send({
                error:"provider not found"
            })
        }
//        providerHandler.verifyToken(req,res);

    }

    public getLocations=(req:Request,res:Response)=>{
        console.log(req)
        let providerHandler=authProviderFactory(req.query.provider)

        providerHandler.getLocations(req)
                              .then((location)=>{
                                  console.log(location)
                                    res.status(200)
                                    res.send(
                                       location

                                    )
                              }).catch((err)=>{
                                  console.log(err)
                                  res.status(401);
                                  res.send({
                                      error:"Error fetching locations",
                                      message:err
                                  })
                              })
    }
}
