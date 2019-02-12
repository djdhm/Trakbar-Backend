# Trakbar OnBoarding Backend   

This project the Backend of Onboarding in Trakbar application,this project is developed with Nodejs using TypeScript. 

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install dependencies .

```bash
npm install
```

## Usage
Add your MongoDb Server configuration in the conf.ts file found in 

```bash
/src/app/db/config.ts
```
Here is an example of the configuration file :

```bash
export const DBConfig={
    username:"username",
    password:'password',
    host:'hostname',
    port :'27017',
    database:'Trakbardb'
}

```
And finally to run the dev  server use npm task : 
```bash
npm run server 
```


## Contributing
There are two types of authorization used in this application 

  Oauth2 | Fixed Token authorization 
------------- | -------------
Poster   | Cassanova
   Scloby | 


### Adding a provider 
 All providers methods are found in folder 
```bash
 /src/app/oauth/
```
To add a new provider you just need to add a new class that implements AuthProvider Interface.
```nodejs
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
 
```





Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
