'use strict'

const Antl = use('Antl')

class UpdateUser {
  get validateAll () {
    return true
  }

  get rules () {
    const id = this.ctx.params.id
    return {
      nm_username: `required|unique:users,nm_username, id, ${id}`,
      nm_email: `required|email|unique:users,nm_email, id, ${id}`,
      nm_password: 'required|confirmed',
      nm_full_name: 'required',
      nr_document: `required|unique:users, nr_document, id, ${id}`,
      nm_sex: 'required',
      dt_born: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = UpdateUser
