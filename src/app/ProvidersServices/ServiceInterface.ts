
export default  interface ProviderService{
    /**
     *
     * @param bars value : array of bars fetched from the provider Api
     *
     *  @return Array of mapped bars to unified structure to serve to frontend
     *          each bar should contain :{
     *              name: "bar name"
     *              externalId: "unique external id in app "
     *              location :{
     *                   city : "it is not required ",
     *                   country :" it is not required",
     *                   address:" it is not required"
     *              }
     *          }
     */
    mapBars(bars:Array<object>):Array<object>

    /***
     *
     * @param token value :" access token to authorize access to provider api
     *  @return Promise to resolve in controller to continue request handling
     *
     */
    getLocations(token:String):Promise<any>
}
