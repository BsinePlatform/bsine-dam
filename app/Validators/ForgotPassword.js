'use strict'

const Antl = use('Antl')

class ForgotPassword {
  get validateAll () {
    return true
  }


  get rules () {
    return {
      nm_email: 'required|email',
      redirect_url: 'required|url'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ForgotPassword
