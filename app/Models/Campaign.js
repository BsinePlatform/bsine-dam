'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Campaign extends Model {
    user () {
        return this.belongsTo('App/Models/User')
    }

    company () {
        return this.belongsTo('App/Models/Company')
    }

    files () {
        return this.hasMany('App/Models/File')
    }

}

module.exports = Campaign
