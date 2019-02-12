import CassanovaAuth from "./Cassanova";
import SclobyAuth from "./Scloby/SclobyAuth";
import PosterAuth from "./Poster/PosterAuth";
import AuthProvider from "./AuthProvider";

// This interface is for pos vendors (OauthProviders)
// all providers must be instantiated from here to
// unify those providers methods from external classes through this factory
export default function (provider:String):AuthProvider {
    console.log("instantiating provider ...");
    console.log(provider)
   switch (provider) {
       case "cassanova":
           return new CassanovaAuth();
       case "scloby":
           return new SclobyAuth();
       case "poster":
           return new PosterAuth();

   }
}
