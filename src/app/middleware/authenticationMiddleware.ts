import {RequestHandler,Response,Request} from "express";
import {decode} from '../authorization/JwtUtil';
export default  class AuthenticationMiddleware{



    authenticate(req:Request,res:Response,next:RequestHandler){
        let token=req.header("access_token");
        if(!token){
            res.status(400);
            res.send({
                error:"Include auth headers"
            })
        }
        else{
            let userInformation = decode(token);
            if(!userInformation) {
                res.status(400);
                res.send({
                    error:"Invalide Access Token "
                })
            }else{
                res.status(200)
                res.send(userInformation)


            }
        }
    }

}
