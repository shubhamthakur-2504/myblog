import setup from "../setup/setup";
import {Client,Account,ID} from 'appwrite'

export class AuthService {
    client= new Client()
    account;
    constructor() {
        this.client.setEndpoint(setup.appwriteUrl).setProject(setup.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount(email,password,name) {
        try{
            const user= await this.account.create(ID.unique(),email,password,name);
            if(user){
                return this.login({email,password});
            }else{
                return user
            }
        }catch(error){
            throw error
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error
        }
    }
    async logout(){
        try{
            return await this.account.deleteSession("current")
        }catch(error){
            throw error
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get()
        }catch(error){
            console.log("Appwrite Service :: getCurrentUser :: error",error)
        }
        return null
    }
}

const authService = new AuthService();

export default authService