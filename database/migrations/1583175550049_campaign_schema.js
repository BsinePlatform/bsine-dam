'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CampaignSchema extends Schema {
  up () {
    this.create('campaigns', (table) => {
      table.increments()
      table
        .integer('company_id')
        .unsigned()
        .references('id')
        .inTable('companies')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()   
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('nm_campaign')
      table.text('nr_description')
      table.date('dt_ini')
      table.date('dt_end')
      table.boolean('active').notNullable().defaultTo('0')
      table.timestamps()
    })
  }

  down () {
    this.drop('campaigns')
  }
}

module.exports = CampaignSchema
