import {add} from "winston";
import {Request,Response} from "express";

const expressProxy =require("express-http-proxy");
import axios from 'axios';
import CityService from "../db/CityService";
'express-http-proxy'
export default class LocationController {
    address=expressProxy('maps.googleapis.com', {
        https: true,
        parseReqBody: false,
        proxyReqPathResolver: req => `/maps/api/geocode/json?address=${req.query.address}&key=${process.env.GOOGLE_API_KEY}`,
    });

    autocomplete= expressProxy('maps.googleapis.com', {
        https: true,
        parseReqBody: false,
        proxyReqPathResolver: req => `/maps/api/place/autocomplete/json?input=${req.query.input}&types=address&key=${process.env.GOOGLE_API_KEY}`,
    });
    timeZone=expressProxy('maps.googleapis.com', {
        https: true,
        parseReqBody: false,
        proxyReqPathResolver: (req) => { console.log(req.query, `/maps/api/timezone/json?location=${req.query.lat},${req.query.lng}&timestamp=${(new Date()).getTime() / 1000}&key=${process.env.GOOGLE_API_KEY}`); return `/maps/api/timezone/json?location=${req.query.lat},${req.query.lng}&timestamp=${(new Date()).getTime() / 1000}&key=${process.env.GOOGLE_API_KEY}`},
    });
    geocode=(req:Request,res:Response)=>{
        // @ts-ignore
        let address=req.body.address;

        if(address) {

                        let x=this.resolveCity(address)
            x.then(data=>{
                console.log(data)
                res.send(data)
            }).catch(error=>{
                console.log(error)
            })
        }
    }
    resolveCity = async function resolveCity(address) {
        //  first we find out the city for the address, since google returns the
        //  coordinates for the address itself and not the city we have to make a second api
        //  call for the actual city coordinates later on
        const result = await this.googleGeocode(address);
        const city = result.address_components.find(({ types }) => types.includes('locality') || types.includes('postal_town'));
        const country = result.address_components.find(({ types }) => types.includes('country'));
        if (!city || !country) {
            console.log('Google results:');
            console.log(JSON.stringify(result, null, 2));
            throw new Error('could not resolve city');
        }
        //  we now know the country and city names
        const cityName = city.long_name;
        const countryName = country.long_name;
        //  the second call to the api finds out the coordinates of the actual city we are interested in
        const cityData = await this.googleGeocode(`${cityName},${countryName}`);
        const { lat, lng } = cityData.geometry.location;
        return { name: cityName, coordinates: [lat, lng] };

    }
     async googleGeocode(address) {
         const query = Array.isArray(address) ? {latlng: address.join(',')} : {address};
         const res = await axios.get(
             'https://maps.googleapis.com/maps/api/geocode/json',
             {
                 params: Object.assign({key: process.env.GOOGLE_API_KEY}, query),
             },
         );
         return res.data.results[0];
     }


    createCity=(req:Request,res:Response)=>{
            let city = req.body.city;
            console.log(req.body)
            let cityService=CityService.getInstance();
            cityService.insertCity(city).then(created=>{
                res.send(created)
                console.log(created);
            });
    }


    findCity=(req:Request,res:Response)=>{
        let city = req.body;
        console.log(city)
        let cityService=CityService.getInstance();
        cityService.findCity(city)
            .then((found)=>{
                console.log("found == "+found)
               if(found){
                   console.log("Trouve")
                   res.send(found)
               }else{
                   console.log("Pas PAS")
                   res.status(404);
                   res.send({
                       error:"city not found"
                   })
               }
            });
    }



}
