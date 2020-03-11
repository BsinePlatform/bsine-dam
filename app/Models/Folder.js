'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Folder extends Model {
    father () {
        return this.belongsTo('App/Models/Folder', 'father_id', 'id')
    }

    user () {
        return this.belongsTo('App/Models/User')
    }

    store () {
        return this.belongsTo('App/Models/Store')
    }

    company () {
        return this.belongsTo('App/Models/Company')
    }

    files () {
        return this
          .belongsToMany('App/Models/File')
          .pivotTable('file_folder')
      }


}

module.exports = Folder
