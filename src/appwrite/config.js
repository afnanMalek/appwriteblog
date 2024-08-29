import conf from "../config/config";
import {Client,Databases,Query,Storage,ID} from "appwrite"

export class Database_service{
    client=new Client();
    database;
    storage;

    constructor(){
        this.client.setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId);
        this.database=new Databases(this.client);
        this.storage=new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        console.log("Creating post with userId : ",userId,title);
        try{
            console.log(featuredImage,title);
            return await this.database.createDocument(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    user_id:userId
                }
            )
        }
        catch(err){
            console.log("Appwrite Service :: createPost :: error : ",err);
        }
    }
    
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.database.updateDocument(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }                
            )
        } catch (err) {
            console.log("Appwrite Service :: updatePost :: error : ",err);
        }
    }
    async deletePost(slug){
        try {
                await this.database.deleteDocument(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                slug
            ) 
            return true;
        } catch (err) {
            console.log("Appwrite Service :: deletePost :: error : ",err);
            return false;
        }
    }
    
    async getPost(slug){
        try{
            return await this.database.getDocument(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                slug
            )
        }
        catch(err){
            console.log("Appwrite Service :: getPost :: error : ",err);
        }
    }

    async getPosts(){
        try{
            const response = await this.database.listDocuments(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                [Query.equal("status", "active")]
            );
            // Return the documents or adjust based on your Appwrite SDK's response structure
            return response.documents || [];
        }
        catch(err){
            console.log("Appwrite Service :: getPost :: error : ",err);
        }
    }

    async uploadFile(file){
        try{
            const  Upload_file=await this.storage.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
            return Upload_file;
        }
        catch(err){
            console.log("Appwrite Service :: uploadFile :: error : ",err);
            return false;
        }
    }

    async deleteFile(fileId){
        try{
            await this.storage.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true;
        }
        catch(err){
            console.log("Appwrite Service :: uploadFile :: error : ",err);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.appWriteBucketId,
            fileId
        )    
    }
} 

const database_services=new Database_service();

export default database_services;