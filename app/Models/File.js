'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')


class File extends Model {
    static get computed () {
        return ['url']
    }

    getUrl ({ id }) {
        return `${Env.get('APP_URL')}/files/${id}`
    }

    company_customization () {
        return this.belongsTo('App/Models/CompanyCustomization')
    }

    campaign () {
        return this.belongsTo('App/Models/Campaign')
    }

    folders () {
        return this
          .belongsToMany('App/Models/Folder')
          .pivotTable('file_folder')
      }
}

module.exports = File
