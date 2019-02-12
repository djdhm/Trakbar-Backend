import Axios from "axios";

export default class PosterService{

    mapBars=(settings,bars)=>{
        console.log(settings)
        return bars.map((element)=>{
            let bar={name:'',externalId:'',location:{},timezone: ""};
            bar.name=element.hall_name;
            bar.externalId=element.hall_id;
            bar.location={
                city:settings.FIZ_ADRESS_CITY,
                country:settings.country
            }
            bar.timezone=settings.timezones
            return bar;
        })
    }

    getLocations=(apiKey)=>{
        console.log("getting locatiosn ");
        console.log(apiKey)
        return new Promise((resolve,reject)=>{
                Axios.get(this.PosterURI.Settings,{
                    params:{
                        token:encodeURI(apiKey)
                    }
                }).then(res=>res.data).then(settings=>{

                    Axios.get(this.PosterURI.Locations,{
                        params:{
                            token:encodeURI(apiKey)
                        }
                    }).then((locations)=>{
                        console.log(locations.data.response)
                        let bars=this.mapBars(settings,locations.data.response)
                        resolve(bars)
                    }).catch((error)=>{
                        console.log(error   )
                        reject(error)
                    })
                })

        })
    }

    PosterURI={
        Locations:"https://joinposter.com/api/spots.getSpotTablesHalls",
        Settings:"https://joinposter.com/api/settings.getAllSettings"
    }
}

