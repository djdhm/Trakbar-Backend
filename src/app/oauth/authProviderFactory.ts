import CassanovaAuth from "./Cassanova";
import SclobyAuth from "./Scloby/SclobyAuth";
import PosterAuth from "./Poster/PosterAuth";
import AuthProvider from "./AuthProvider";

export default function (provider:String):AuthProvider {
    console.log("instantiating provider ...");
    console.log(provider)
   switch (provider) {
       case "cassanova":
           return new CassanovaAuth()
       case "scloby":
           return new SclobyAuth()
       case "poster":
           return new PosterAuth()

   }
}
