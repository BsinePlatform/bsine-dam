'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FilesSchema extends Schema {
  up () {
    this.table('files', (table) => {
      table
        .integer('customization_id')
        .unsigned()
        .references('id')
        .inTable('company_customizations')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .after('file_path')
      table
        .integer('campaign_id')
        .unsigned()
        .references('id')
        .inTable('campaigns')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .after('customization_id')
    })
  }

  down () {
    this.table('files', (table) => {
      // reverse alternations
    })
  }
}

module.exports = FilesSchema
