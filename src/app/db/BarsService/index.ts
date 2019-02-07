import DB from '../_db';
const {Bar } = DB;
export default class BarsService {

    insertBar=(bar)=>{
        return Bar.create({...bar,integrations:{
            pos:{
                token:"Manual Token"
            }
            },
        externalBarId:"NADA"})
    }
    findBars=(filter)=>{
        return Bar.find(filter)
    }
    findOne=(filter)=>{
        return Bar.findOne(filter)
    }
}
