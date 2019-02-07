import AuthProvider from "../AuthProvider";
import {Request} from "express";

export default class SclobyAuth implements AuthProvider{
    handleAuth(req: Request): Promise<{}> {
        return new Promise(((resolve, reject) => {
            let code = req.body.code;

        }))
    }


}
