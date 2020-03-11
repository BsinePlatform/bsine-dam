'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FolderSchema extends Schema {
  up () {
    this.create('folders', (table) => {
      table.increments()
      table.string('name').notNullable()
      table
        .integer('father_id')
        .unsigned()
        .references('id')
        .inTable('folders')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL') 
      table
        .integer('store_id')
        .unsigned()
        .references('id')
        .inTable('stores')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('company_id')
        .unsigned()
        .references('id')
        .inTable('companies')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.boolean('active').notNullable().defaultTo('0')
      table.timestamps()
    })
  }

  down () {
    this.drop('folders')
  }
}

module.exports = FolderSchema
