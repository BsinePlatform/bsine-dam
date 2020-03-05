'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Department extends Model {
    store () {
        return this.belongsTo('App/Models/Store')
    }

    company () {
        return this.belongsTo('App/Models/Company')
    }

    users () {
        return this.hasMany('App/Models/Users')
    }
}

module.exports = Department
