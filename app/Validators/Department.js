'use strict'

const Antl = use('Antl')

class Department {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      nm_department: 'required',
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Department
