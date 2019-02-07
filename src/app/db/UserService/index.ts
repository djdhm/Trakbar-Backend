import Database from '../_db';
export default  class UserService{

    UserModel=Database.User;

    findUser=(filter:Object)=>{
        return this.UserModel.find(filter);
    }

    createUser=(user:any)=>{
        return this.UserModel.create(user);
    }

    findOrCreate=(user)=>{
        return this.UserModel.findOrCreate(user)
    }

}
