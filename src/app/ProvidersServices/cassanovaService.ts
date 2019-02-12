import Axios from "axios";
export default class CassanovaService {


    mapBars=(bars)=>{
        bars.map((bar)=>{
            bar.name=bar.name;
            bar.externalId=bar.id;


        })
    }

    getLocations=(apiKey)=>{
        console.log("getting locatiosn ");
        console.log(apiKey)
        return new Promise((resolve,reject)=>{
            Axios.get(this.CassanovaURI.Locations,{
                headers:this.getHeaders(apiKey)}
            ).then((locations)=>{
                console.log(locations.data.salesPoint)
                this.mapBars(locations.data.salesPoint)
                resolve(locations.data.salesPoint)
            }).catch((error)=>{
               // console.log(error   )
                reject(error)
            })
        })
    }

    CassanovaURI={
        Locations:"https://api.cassanova.com/salespoint?",

    }
    getHeaders=token=>{


        return {
            "Authorization":"Bearer "+token
            ,"X-Version":"1.0.0"
        };
    }
}
