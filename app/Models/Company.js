'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Company extends Model {
    user () {
        return this.belongsTo('App/Models/User')
    }

    stores () {
        return this.hasMany('App/Models/Store')
    }

    campaigns () {
        return this.hasMany('App/Models/Campaign')
    }

    customizations () {
        return this.hasMany('App/Models/CompanyCustomization')
    }
}

module.exports = Company
