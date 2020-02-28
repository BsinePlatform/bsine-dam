'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanyCustomizationSchema extends Schema {
  up() {
    this.create('company_customizations', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('company_id')
        .unsigned()
        .references('id')
        .inTable('companies')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()         
      table.string('nm_color_background')
      table.string('nr_style_header')
      table.string('nr_style_menu')
      table.string('nr_style_footer')
      table.string('nm_color_header')
      table.string('nm_color_menu')
      table.string('nm_color_footer')
      table.string('nm_slogan')
      table.string('nm_main_phrase')
      table.string('nm_second_phrase')
      table.string('nm_color_main')
      table.string('nm_color_second')
      table.string('nm_color_third')
      table.string('nm_font_main')
      table.string('nm_font_second')
      table.string('nm_font_third')
      table.string('nm_font_size_main')
      table.string('nm_font_size_second')
      table.string('nm_font_size_third')
      table.timestamps()
    })
  }

  down() {
    this.drop('company_customizations')
  }
}

module.exports = CompanyCustomizationSchema
