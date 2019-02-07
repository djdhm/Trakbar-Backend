var winston = require('winston');

//
// Requiring `winston-daily-rotate-file` will expose
// `winston.transports.DailyRotateFile`
//
/*require('winston-daily-rotate-file')
var transport = new (winston.transports.DailyRotateFile)({
    filename: 'log=file-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    dirname:'./Log',
    level:'info',
    levelOnly:'true',
    name:'file#info'
});
var erreorTransport= new (winston.transports.DailyRotateFile)({
    filename: 'silly-log-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    dirname:'./Dev',
    name:'file#dev',
    level:'silly'
})




winston.add(winston.transports.DailyRotateFile,transport)
winston.add(winston.transports.DailyRotateFile,erreorTransport)
*/


winston.taglog=function(level:String,titre:String,message:any,tags:String){
    // console.log("Test Yemchi")
    winston.log(level,{
        title:titre,
        message:message,
        tags:tags
    })


}
// Log des Requetes Morgan
winston.requete=function(message:any,tags:String[]){

    winston.info({
        message:message,
        tags:tags
    })
}

winston.stream = {
    write: function(message:any, encoding:any){
        logger.requete(message,"Requetes");
    }
};
export const logger=winston;
