'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileFolderSchema extends Schema {
  up () {
    this.create('file_folder', (table) => {
      table.increments()
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('folder_id')
        .unsigned()
        .references('id')
        .inTable('folders')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('file_folder')
  }
}

module.exports = FileFolderSchema
