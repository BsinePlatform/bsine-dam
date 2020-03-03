'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CampaignSchema extends Schema {
  up () {
    this.table('campaigns', (table) => {
      table.renameColumn('nr_description', 'nm_description')
    })
  }

  down () {
    this.table('campaigns', (table) => {
      // reverse alternations
    })
  }
}

module.exports = CampaignSchema
