'use strict'

const Store = use('App/Models/Store')
/**
 * Resourceful controller for interacting with stores
 */
class StoreController {
  /**
   * Show a list of all stores.
   * GET stores
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ params, request, response, view }) {
    const { page } = request.get()
    const stores = await Store.query().with('user').paginate(page)

    return stores
  }



  /**
   * Create/save a new store.
   * POST stores
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ params, request, response, auth }) {
    try {
      const data = request.only([
        "company_id",
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

      const store = await Store.create({ ...data, user_id: auth.user.id })

      return store
    } catch (error) {
      return response.status(error.status).send({
        message: 'Erro ao tentar criar a loja.',
        err_message: error.message
      })
    }


  }

  /**
   * Display a single store.
   * GET stores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const store = await Store.findOrFail(params.id)

      await store.load('company')
      await store.load('user')
      await store.load('departments')
      await store.load('folders')

      return store

    } catch (error) {
      return response.status(error.status).send({
        message: 'Erro ao tentar buscar a loja',
        err_message: error.message
      })
    }
  }

  /**
   * Update store details.
   * PUT or PATCH stores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const store = await Store.findOrFail(params.id)
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

      store.merge(data)

      await store.save()

      return store
    } catch (error) {
      return response.status(error.status).send({
        message: 'Erro ao tentar atualizar a loja.',
        err_message: error.message
      })
    }

  }

  /**
   * Delete a store with id.
   * DELETE stores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const store = await Store.findOrFail(params.id)

      await store.delete()

    } catch (error) {
      return response.status(error.status).send({
        message: 'Erro ao tentar excluir a loja.',
        err_message: error.message
      })
    }
  }
}

module.exports = StoreController
