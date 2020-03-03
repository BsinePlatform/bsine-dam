'use strict'
const Antl = use('Antl')

class Campaign {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      company_id: 'required',
      nm_campaign: 'required',
      dt_ini: 'date',
      dt_end: 'date'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Campaign
