'use strict'

const Antl = use('Antl')

class User {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      nm_username: 'required|unique:users',
      nm_email: 'required|email|unique:users',
      nm_password: 'required|confirmed',
      nm_full_name: 'required',
      nr_document: 'required',
      nm_sex: 'required',
      dt_born: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = User
