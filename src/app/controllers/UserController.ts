import UserService from "../db/UserService";

export default class UserController {
    userService=new UserService();
    checkEmailExist=(req,res)=>{
        let email=req.params.email
        if(!email) {
            res.status(400);
            res.send({
                error:"Bad Request"
            })
        }else{
            this.userService.findUser({
                email:email
            }).then((user)=>{
                    res.send({
                        exists:!(user==null)
                    })

            })
        }
    }
    createUser=()
}
