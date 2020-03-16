'use strict'

const Company = use('App/Models/Company')
/**
 * Resourceful controller for interacting with companies
 */
class CompanyController {
  /**
   * Show a list of all companies.
   * GET companies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const { page } = request.get()
    const companies = await Company.query().paginate(page)

    return companies
  }

  /**
   * Create/save a new company.
   * POST companies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    try {
      const data = request.only([
        "nm_corporate_name",
        "nm_fantasy_name",
        "nr_cnpj",
        "nr_inscricao_estadual",
        "nr_ccm",
        "nm_initials",
        "nm_responsible",
        "nm_responsible_email",
        "nr_responsible_ddi",
        "nr_responsible_ddd",
        "nr_responsible_phone",
        "nr_responsible_phone_extension",
        "dt_born",
        "nm_country",
        "nm_state",
        "nm_city",
        "nm_street",
        "nm_neighborhood",
        "nm_public_place",
        "nm_complement",
        "nm_complement_01",
        "nr_number",
        "nr_zip_code",
        "nr_ddi_phone_commercial",
        "nr_ddd_phone_commercial",
        "nr_phone_commercial",
        "nr_phone_commercial_extension",
        "nr_ddi",
        "nr_ddd",
        "nr_phone",
        "nr_ddi_01",
        "nr_ddd_01",
        "nr_phone_01",
        "nr_ddi_02",
        "nr_ddd_02",
        "nr_phone_02",
        "nr_ddi_cellphone",
        "nr_ddd_cellphone",
        "nr_cellphone",
        "nm_skype",
        "nm_facebook",
        "nr_whatsapp",
        "nm_linkedin",
        "nm_twitter",
        "nm_site",
        "active"
      ])

      const company = await Company.create({ ...data, user_id: auth.user.id })

      return company
    } catch (error) {
      return response.status(error.status).send({
        message: 'Erro ao tentar criar a companhia.',
        err_message: error.message
      })
    }

  }

  /**
   * Display a single company.
   * GET companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const company = await Company.findOrFail(params.id)

      await company.load('user')
      await company.load('stores')
      await company.load('campaigns')
      await company.load('departments')
      await company.load('customizations')
      await company.load('folders')
      return company

    } catch (error) {
      return response.status(error.status).send({
        message: 'Erro ao tentar buscar a companhia.',
        err_message: error.message
      })
    }
  }

  /**
   * Update company details.
   * PUT or PATCH companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const company = await Company.findOrFail(params.id)

      const data = request.only([
        "nm_corporate_name",
        "nm_fantasy_name",
        "nr_cnpj",
        "nr_inscricao_estadual",
        "nr_ccm",
        "nm_initials",
        "nm_responsible",
        "nm_responsible_email",
        "nr_responsible_ddi",
        "nr_responsible_ddd",
        "nr_responsible_phone",
        "nr_responsible_phone_extension",
        "dt_born",
        "nm_country",
        "nm_state",
        "nm_city",
        "nm_street",
        "nm_neighborhood",
        "nm_public_place",
        "nm_complement",
        "nm_complement_01",
        "nr_number",
        "nr_zip_code",
        "nr_ddi_phone_commercial",
        "nr_ddd_phone_commercial",
        "nr_phone_commercial",
        "nr_phone_commercial_extension",
        "nr_ddi",
        "nr_ddd",
        "nr_phone",
        "nr_ddi_01",
        "nr_ddd_01",
        "nr_phone_01",
        "nr_ddi_02",
        "nr_ddd_02",
        "nr_phone_02",
        "nr_ddi_cellphone",
        "nr_ddd_cellphone",
        "nr_cellphone",
        "nm_skype",
        "nm_facebook",
        "nr_whatsapp",
        "nm_linkedin",
        "nm_twitter",
        "nm_site",
        "active"
      ])

      company.merge(data)

      await company.save()

      return company
    } catch (error) {
      return response.status(error.status).send({
        message: 'Erro ao tentar criar a companhia.',
        err_message: error.message
      })
    }

  }

  /**
   * Delete a company with id.
   * DELETE companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const company = await Company.findOrFail(params.id)

      await company.delete()

    } catch (error) {
      return response.status(error.status).send({
        message: 'Erro ao tentar excluir a companhia.',
        err_message: error.message
      })
    }
  }
}

module.exports = CompanyController
