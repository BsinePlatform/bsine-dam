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
}

module.exports = Department
