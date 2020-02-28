'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanySchema extends Schema {
  up() {
    this.create('companies', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('nm_corporate_name', 254).notNullable().unique()
      table.string('nm_fantasy_name', 254).notNullable()
      table.bigint('nr_cnpj').notNullable().unique()
      table.bigint('nr_inscricao_estadual').notNullable()
      table.string('nr_ccm').notNullable().unique()
      table.string('nm_initials', 20).notNullable()
      table.string('nm_responsible', 80).notNullable()
      table.string('nm_responsible_email', 254).notNullable()
      table.bigint('nr_responsible_ddi').notNullable()
      table.bigint('nr_responsible_ddd').notNullable()
      table.bigint('nr_responsible_phone').notNullable()
      table.bigint('nr_responsible_phone_extension')
      table.date('dt_born').notNullable()
      table.string('nm_country', 254).notNullable()
      table.string('nm_state', 254).notNullable()
      table.string('nm_city', 254).notNullable()
      table.string('nm_street', 254).notNullable()
      table.string('nm_neighborhood', 254).notNullable()
      table.string('nm_public_place', 254).notNullable()
      table.string('nm_complement', 254)
      table.string('nm_complement_01', 254)
      table.integer('nr_number').notNullable()
      table.bigint('nr_zip_code').notNullable()
      table.smallint('nr_ddi_phone_commercial', 3).notNullable()
      table.smallint('nr_ddd_phone_commercial', 2).notNullable()
      table.bigint('nr_phone_commercial').notNullable()
      table.bigint('nr_phone_commercial_extension')
      table.smallint('nr_ddi', 3)
      table.smallint('nr_ddd', 2)
      table.bigint('nr_phone')
      table.smallint('nr_ddi_01', 3)
      table.smallint('nr_ddd_01', 2)
      table.bigint('nr_phone_01')
      table.smallint('nr_ddi_02', 3)
      table.smallint('nr_ddd_02', 2)
      table.bigint('nr_phone_02')
      table.smallint('nr_ddi_cellphone', 3)
      table.smallint('nr_ddd_cellphone', 2)
      table.bigint('nr_cellphone')
      table.string('nm_skype')
      table.string('nm_facebook')
      table.bigint('nr_whatsapp')
      table.string('nm_linkedin')
      table.string('nm_twitter')
      table.string('nm_site')
      table.boolean('active').notNullable().defaultTo('0')
      table.timestamps()
    })
  }

  down() {
    this.drop('companies')
  }
}

module.exports = CompanySchema
