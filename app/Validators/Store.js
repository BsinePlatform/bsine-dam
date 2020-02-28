'use strict'

const Antl = use('Antl')

class Store {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      nm_corporate_name: 'required',
      nm_fantasy_name: 'required',
      nr_cnpj: 'required|unique:stores',
      dt_born: 'date'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Store
