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
  async index ({ request, response, view }) {
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
  async store ({ request, response }) {
    const data = request.only([
      "nm_department",
      "company_id",
      "store_id"
    ])

    const department = await Department.create(data)

    return department
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
  async show ({ params, request, response, view }) {
    const department = await Department.findOrFail(params.id)

    await department.load('store')
    await department.load('company')
    await department.load('users')
    return department
  }

  /**
   * Update department details.
   * PUT or PATCH departments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const department = await Department.findOrFail(params.id)

    const data = request.only([
      "nm_department",
      "company_id",
      "store_id"
    ])

    department.merge(data)

    await department.save()

    return department

  }

  /**
   * Delete a department with id.
   * DELETE departments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const department = await Department.findOrFail(params.id)

    await department.delete()
  }
}

module.exports = DepartmentController
