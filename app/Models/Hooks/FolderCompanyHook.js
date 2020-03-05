'use strict'
const AwsS3 = require('../../../services/awsS3');
const bucketName = process.env.S3_BUCKET;


const FolderCompanyHook = exports = module.exports = {}


FolderCompanyHook.createFolder = async company => {
    const awsS3 = new AwsS3()
    awsS3.createAlbum(bucketName, company.id.toString())
}
