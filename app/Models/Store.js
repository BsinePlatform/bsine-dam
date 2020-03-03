'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Store extends Model {
    company () {
        return this.belongsTo('App/Models/Company')
    }

    user () {
        return this.belongsTo('App/Models/User')
    }

    departments () {
        return this.hasMany('App/Models/Department')
    }
}

module.exports = Store
