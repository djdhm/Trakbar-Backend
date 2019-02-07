require('dotenv').config()

import { Server} from "./server";
const i18n=require('i18n-2');
import {OauthRouter} from "./routes/oauth";
import Test from "./db/_db";
import AppConfig from './config/appConfig';
const {Bar,Tenant}=Test
const serveur =new Server();
serveur.app.use('/oauth',OauthRouter);
i18n.expressBind(serveur.app, {
    // setup some locales - other locales default to en silently
    //locales: ['en', 'de', 'fr', 'es', 'hr'],
    locales: ['en', 'de', 'hr', 'it', 'fr'],
    defaultLocale:AppConfig.defaultLanguage,
    extension:'.json',
    cookieName: 'tbLocale'
});

serveur.app.listen(process.env.PORT ||  5000)
