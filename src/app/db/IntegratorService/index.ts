import DB from '../_db';
const {Integrator } = DB;
export default class IntegratorService {

    addIntegration = (integrator) => {
        return Integrator.create(integrator)
    }
    getIntegration = (name) => {
        return Integrator.findOne({
            name: name
        })
    }
    getManualIntegrator = (): Promise<any> => {
        return new Promise(((resolve, reject) => {
            Integrator.findOne({
                name:"Manual integrator"
            }).then((integrator) => {
                if (integrator) resolve(integrator)
                else {
                    console.log("manual integrator created")
                    Integrator.create({
                        name: "Manual integrator",
                        apiSecret:"$$$$$$$$$$$",
                        apiKey:"dfsfsfsdf",
                        id:"manual"
                    }).then((createdIntegrator) => {
                        resolve(createdIntegrator)
                    })
                }
            })
        }))
    }
}
