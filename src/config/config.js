const conf = {
    appWriteUrl: import.meta.env.VITE_APPWRITE_URL || '',
    appWriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || '',
    appWriteDataBaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID || '',
    appWriteCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID || '',
    appWriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID || '',
};


console.log('AppWrite Configuration:', conf);

export default conf;
