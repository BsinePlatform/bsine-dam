'use strict'

const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
AWS.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
AWS.config.region = "us-east-1";

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

class AwsS3 {

    constructor() {

    }

    // Create Bucket in S3
    async createBucketInS3(bucketName) {
        var bucketParams = {
            Bucket: bucketName,
            ACL: 'private'
        };

        // call S3 to create the bucket
        return new Promise((resolve, reject) => { 
            s3.createBucket(bucketParams,  function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.Location.replace('/', ''));
                }
            });
        })  
       
    }

    // Upload file in Bucket
    uploadFileS3(bucketName, file) {
        const fileContent = fs.readFileSync(file);

        const keyName = file.split('/').pop();

        // Setting up S3 upload parameters
        const params = {
            Bucket: bucketName,
            Key: keyName, // File name you want to save as in S3
            Body: fileContent,
            ACL: 'public-read'
        };

        // Uploading files to the bucket
        return new Promise((res, rej) => {
            s3.upload(params, function (err, data) {
              if (err) rej(err);
              else res(data.Location);
            });
          });
    }

    async createAlbum(bucketName, albumName) {
        albumName = albumName.trim();
        if (!albumName) {
            console.log("Album names must contain at least one non-space character.");
        }
        if (albumName.indexOf("/") !== -1) {
            console.log("Album names cannot contain slashes.");
        }
        var albumKey = encodeURIComponent(albumName) + "/";

        // Setting up S3 upload parameters
        const params = {
            Bucket: bucketName,
            Key: albumKey
        };

        return new Promise((resolve, reject) => { 
            s3.headObject(params, function (err, data) {
                if (!err) {
                    reject(err);
                }
                if (err.code !== "NotFound") {
                    reject(err.messageerr);
                }
                s3.putObject(params, function (err, data) {
                    if (err) {
                        reject(err.message);
                    }
                    resolve(data)
                });
            });
        })  
    }

    deletePhoto(bucketName, photoKey) {
        // Setting up S3 upload parameters
        const params = {
            Bucket: bucketName,
            Key: photoKey
        };

        return new Promise((res, rej) => {
            s3.deleteObject(params, function (err, data) {
              if (err) rej(false);
              else res(true)
            });
          });
        /*s3.deleteObject(params, function (err, data) {
            if (err) {
                return err.message
            }
            return data;
        });*/
        
    }

    deleteAlbum(bucket, albumName) {
        var albumKey = encodeURIComponent(albumName) + "/";
        var params = {
            Bucket: bucket,
            Prefix: albumKey,
        };
        s3.listObjects(params, function (err, data) {
            if (err) {
                console.log("There was an error deleting your album: ", err.message);
            }
            var objects = data.Contents.map(function (object) {
                return { Key: object.Key };
            });
            let paramsFolder = {
                Bucket: bucket,
                Delete: { Objects: objects, Quiet: true }
            }
            s3.deleteObjects(
                paramsFolder,
                function (err, data) {
                    if (err) {
                        console.log("There was an error delete deleting your album: ", err.message);
                    }
                    console.log("Successfully deleted album.");
                }
            );
        });
    }
}

module.exports = AwsS3