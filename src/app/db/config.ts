export const DBConfig={
    username:"admin",
    password:'',
    host:'localhost',
    port :'27017',
    database:'Trakbardb'
}

export const TIMEOUT=500;
export function getURI(){
    let uri="mongodb://";
    uri+=DBConfig.host+":";
    uri+=DBConfig.port+"/";
    uri+=DBConfig.database;
    return uri;
}
