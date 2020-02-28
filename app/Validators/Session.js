'use strict'

const Antl = use('Antl')

class Session {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      nm_email: 'required|email',
      nm_password: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Session
