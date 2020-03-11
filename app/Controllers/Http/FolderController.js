'use strict'

const Folder = use('App/Models/Folder')
const Store = use('App/Models/Store')
const AwsS3 = require('../../../services/awsS3');
const bucketName = process.env.S3_BUCKET;

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with folders
 */
class FolderController {
  /**
   * Show a list of all folders.
   * GET folders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const folders = await Folder.all()

    return folders
  }

  /**
   * Create/save a new folder.
   * POST folders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    try {
      const data = request.only([
        "name",
        "father_id",
        "store_id",
        "company_id",
        "active"
      ])

      const folder = await Folder.create({ ...data, user_id: auth.user.id })

      let result = await Store.findOrFail(data['store_id'])
      let bucket = bucketName + '/' + result.company_id + '/' + result.id

      if (request.body.path) {
        bucket = bucket + '/' + request.body.path
      }

      const awsS3 = new AwsS3()
      awsS3.createAlbum(bucket, data['name'])


      return folder
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'Algo deu errado ao criar essa pasta' } })
    }

  }

  /**
   * Display a single folder.
   * GET folders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const folder = await Folder.findOrFail(params.id)

    await folder.load('father')
    await folder.load('user')
    await folder.load('store')
    await folder.load('company')

    return folder
  }


  /**
   * Update folder details.
   * PUT or PATCH folders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, auth }) {
    try {
      const folder = await Folder.findOrFail(params.id)
      const data = request.only([
        "name",
        "father_id",
        "store_id",
        "company_id",
        "active"
      ])

      folder.merge({ ...data, user_id: auth.user.id })

      await folder.save()

      return folder
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'Algo deu errado ao atualizar essa pasta' } })
    }


  }

  /**
   * Delete a folder with id.
   * DELETE folders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const folder = await Folder.findOrFail(params.id)

      let result = await Store.findOrFail(request.body.store_id)
      let bucket = bucketName + '/' + result.company_id + '/' + result.id

      if (request.body.path) {
        bucket = bucket + '/' + request.body.path
      }

      const awsS3 = new AwsS3()
      awsS3.deleteAlbum(bucket, request.body.name)
      await folder.delete()  
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'Algo deu errado ao excluir essa pasta' } })
    }

  }
}

module.exports = FolderController
