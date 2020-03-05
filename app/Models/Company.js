'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Company extends Model {
    static boot () {
        super.boot()

        this.addHook('afterCreate', 'FolderCompanyHook.createFolder')
    }


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

    departments () {
        return this.hasMany('App/Models/Department')
    }
}

module.exports = Company
