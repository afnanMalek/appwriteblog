import {Client,Account,ID} from "appwrite"
import conf from "../config/config";

export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client.setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId);

        this.account=new Account(this.client);
    }

    async createAccount({email,password,name}){
        try{
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                // Render a Home page if once user register 
                return this.login({email,password})
            }
            else{
                return userAccount;
            }
        }
        catch(err){
            throw err;
        }
    }
    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }
        catch(err){
            throw err;
        }
    }
    async getCurrentUser(){
      

        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }
    async logout(){
        try {
            return await this.account.deleteSessions(); 
        } catch (err) {
            console.log("Appwrite service :: logout :: error : ", err)
        }
    }
}

const authService=new AuthService()

export default authService

