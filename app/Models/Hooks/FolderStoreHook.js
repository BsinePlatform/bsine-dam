'use strict'
const AwsS3 = require('../../../services/awsS3');
const bucketName = process.env.S3_BUCKET;


const FolderStoreHook = exports = module.exports = {}


FolderStoreHook.createFolder = async store => {
    const bucket = bucketName +'/'+ store.company_id

    const awsS3 = new AwsS3()
    awsS3.createAlbum(bucket, store.id.toString())
}
