import GeoIpNativeLite from 'geoip-native-lite';
import {RequestHandler,Request,Response} from "express";


function languageMiddleware(req:Request,res:Response,next:RequestHandler){
    if (req.query.lang) {
        // @ts-ignore
        req.i18n.setLocaleFromQuery();
        if (req.cookies.cookieconsent_status !== 'dismiss') {
            // @ts-ignore
            res.cookie('tbLocale', req.i18n.getLocale());
        }
    } else {
        if (req.cookies.tbLocale){
            // @ts-ignore
            req.i18n.setLocaleFromCookie();
        } else {
            let country = GeoIpNativeLite.lookup(ip);
            let langSet = 'en';
            if (country){
                langSet = countryCode.languages(country.toUpperCase())
                if (langSet){
                    langSet = langSet[0];
                }
            }
            // @ts-ignore
            req.i18n.setLocale(langSet);
            if (req.cookies.cookieconsent_status !== 'dismiss') {
                // @ts-ignore
                res.cookie('tbLocale', req.i18n.getLocale());
            }
        }

    }
}
