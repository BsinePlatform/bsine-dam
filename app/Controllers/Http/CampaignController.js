'use strict'

const Campaign = use('App/Models/Campaign')

/**
 * Resourceful controller for interacting with campaigns
 */
class CampaignController {
  /**
   * Show a list of all campaigns.
   * GET campaigns
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const { page } = request.get()
    const campaign = await Campaign.query().with('user').paginate(page)

    return campaign
  }

  /**
   * Create/save a new campaign.
   * POST campaigns
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    try {
      const data = request.only([
        "company_id",
        "nm_campaign",
        "nm_description",
        "dt_ini",
        "dt_end",
        "active"
      ])

      const campaign = await Campaign.create({ ...data, user_id: auth.user.id })

      return campaign

    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Erro ao criar a campanha.',
          err_message: error.message
        }
      })
    }
  }

  /**
   * Display a single campaign.
   * GET campaigns/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const campaign = await Campaign.findOrFail(params.id)

      await campaign.load('company')
      await campaign.load('user')

      return campaign

    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Erro ao tentar buscar a campanha.',
          err_message: error.message
        }
      })
    }
  }

  /**
   * Update campaign details.
   * PUT or PATCH campaigns/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const campaign = await Campaign.findOrFail(params.id)

      const data = request.only([
        "nm_campaign",
        "nm_description",
        "dt_ini",
        "dt_end",
        "active"
      ])

      campaign.merge(data)

      await campaign.save()

      return campaign

    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Erro ao tentar atualizar a campanha.',
          err_message: error.message
        }
      })
    }

  }

  /**
   * Delete a campaign with id.
   * DELETE campaigns/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const campaign = await Campaign.findOrFail(params.id)

      await campaign.delete()

    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Erro ao tentar excluir a campanha.',
          err_message: error.message
        }
      })
    }
  }
}

module.exports = CampaignController
