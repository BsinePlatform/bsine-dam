'use strict'

const Department = use('App/Models/Department')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with departments
 */
class DepartmentController {
  /**
   * Show a list of all departments.
   * GET departments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const { page } = request.get()
    const departments = await Department.query().paginate(page)

    return departments
  }

  /**
   * Create/save a new department.
   * POST departments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only([
        "nm_department",
        "company_id",
        "store_id"
      ])

      const department = await Department.create(data)

      return department

    } catch (error) {
      return response.status(error.status).send({
        message: 'Erro ao tentar criar o departamento.',
        err_message: error.message
      })
    }
  }

  /**
   * Display a single department.
   * GET departments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const department = await Department.findOrFail(params.id)

      await department.load('store')
      await department.load('company')
      await department.load('users')
      return department

    } catch (error) {
      return response.status(error.status).send({
        message: 'Erro ao tentar buscar o departamento.',
        err_message: error.message
      })
    }
  }

  /**
   * Update department details.
   * PUT or PATCH departments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const department = await Department.findOrFail(params.id)

      const data = request.only([
        "nm_department",
        "company_id",
        "store_id"
      ])

      department.merge(data)

      await department.save()

      return department

    } catch (error) {
      return response.status(error.status).send({
        message: 'Erro ao tentar atualizar o departamento.',
        err_message: error.message
      })
    }

  }

  /**
   * Delete a department with id.
   * DELETE departments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const department = await Department.findOrFail(params.id)

      await department.delete()

    } catch (error) {
      return response.status(error.status).send({
        message: 'Erro ao tentar excluir o departamento.',
        err_message: error.message
      })
    }
  }
}

module.exports = DepartmentController
