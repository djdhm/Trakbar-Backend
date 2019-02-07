var jwtsimple =require('jwt-simple');


/*
* @TODO
*   place the secret in a file to make the code clear and organized
*/




const secretJwt = "This is a secret to change later to  a file "

const accessTokenExpireTime = 1*60 //1 hour
const refreshTokenExpireTime = 3*60 //3 hours

//generate auth token
export function validationReq(userpayload:any):string{
    return jwtsimple.encode({
        id: userpayload.id,
        integration:userpayload.integration,
        exp: expiresIn(10)//Expire dans 10 min
        //En principe le user ne va pas prendre plus de 10 min pour se connecter
    },secretJwt)
}

//Générer un access token et refresh token
export function genToken(user:any,integration:string, codeV:any,callback:Function,
                         error:ErrorEventHandler){
    var expires = expiresIn(accessTokenExpireTime); // 5min
    user.integration=integration;
    let refreshToken = genRefreshToken(user);
    let accesToken = genAccessToken(user);
   callback({
       access_token: accesToken ,
       refresh_token: refreshToken,
       expires_in: expires,
       token_type:"bearer",
       user:user.id,
   })


}

//Génére un refresh token qui expire dans 3 heures
export function genRefreshToken(user:any) {
    var expiration = expiresIn(refreshTokenExpireTime);
    var rtoken = jwtsimple.encode({
        exp: expiration,
        id: user
    }, secretJwt)
    return rtoken;

}

export function genAccessToken(user:any){
    var expiration = expiresIn(accessTokenExpireTime);
    var token = jwtsimple.encode({
        exp: expiration,
        id: user.id,
        integration:user.integration
    }, secretJwt)
    return token;
}

//Décode le validation token
export const decode=function(hash:any):any{
    try {
        var result= jwtsimple.decode(hash,secretJwt)
        // console.log(result)
        return result
    } catch (error) {
        return null
    }
}

export const encode=function(object:any):any{
    return jwtsimple.encode({
        id: object.id,
        exp: object.exp
    },secretJwt);
}

//Génére une date d'expiration
export function expiresIn(numMinutes:number) {
    var dateObj = new Date();
    return dateObj.setMinutes(dateObj.getMinutes() + numMinutes);
}
