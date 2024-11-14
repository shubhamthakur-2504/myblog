import setup from '../setup/setup'
import { Client,ID,Databases,Storage,Query } from 'appwrite'

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(setup.appwriteUrl).setProject(setup.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost ({Title,Slug,Content,Image,Status,UserId}){
        try {
            return await this.databases.createDocument(
                setup.appwriteDatabaseId,
                setup.appwriteCollectionId,
                Slug,
                {
                    Title,
                    Content,
                    Image,
                    Status,
                    UserId
                }
            )
        } catch (error) {
            console.log('appwrite servive config :: createPost :: error',error);
        }
    }

    async updatePost(Slug,{Title,Content,Image,Status}){
        try {
            return await this.databases.updateDocument(
                setup.appwriteDatabaseId,
                setup.appwriteCollectionId,
                Slug,
                {
                    Title,
                    Content,
                    Image,
                    Status
                }
            )
        } catch (error) {
            console.log('appwrite servive config :: updatePost :: error',error);
            
        }
    }

    async deletePost(Slug){
        try {
            await this.databases.deleteDocument(
                setup.appwriteDatabaseId,
                setup.appwriteCollectionId,
                Slug
            )
            return true
        } catch (error) {
            console.log('appwrite servive config :: deletePost :: error',error);
            return false 
        }
    }

    async getPost(Slug){
        try {
            return await this.databases.getDocument(
                setup.appwriteDatabaseId,
                setup.appwriteCollectionId,
                Slug
            )
        } catch (error) {
            console.log('appwrite servive config :: getPost :: error',error);
            return null
        }
    }

    async getAllPost(queries=[Query.equal("Status","active")]){
        try {
            return await this.databases.listDocuments(
                setup.appwriteDatabaseId,
                setup.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log('appwrite servive config :: getAllPost :: error',error);
            return null
        }
    }
    
    // upload file service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                setup.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('appwrite servive config :: uploadFile :: error',error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                setup.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log('appwrite servive config :: deleteFile :: error',error);
            return false
        }
    }

    getImgPreview(fileId){
        try {
            return this.bucket.getFilePreview(
                setup.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log('appwrite servive config :: getFilePreview :: error',error);
            return false
        }
    }
}


const service = new Service()

export default service