import Axios from "axios";

export default class PosterService{

    mapBars=(bars)=>{
        bars.map((bar)=>{
            bar.name=bar.hall_name;
            bar.externalId=bar.hall_id;

        })
    }

    getLocations=(token)=>{
        console.log("getting locatiosn ");
        console.log(token)
        return new Promise((resolve,reject)=>{
                Axios.get(this.PosterURI.Locations,{
                    params:{
                        token:encodeURI(token)
                    }
                }).then((locations)=>{
                    console.log(locations.data.response)
                    this.mapBars(locations.data.response)
                    resolve(locations.data)
                }).catch((error)=>{
                    console.log(error   )
                    reject(error)
                })
        })
    }

    PosterURI={
        Locations:"https://joinposter.com/api/spots.getSpotTablesHalls",

    }
}

