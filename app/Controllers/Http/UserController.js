'use strict'

const User = use('App/Models/User')

class UserController {
    async index({ request, response, view }) {
        const { page } = request.get()
        const users = await User.query().paginate(page)

        return users
    }
    async store({ request }) {
        try {
            const data = request.only([
                "nm_username",
                "nm_email",
                "nm_password",
                "nm_full_name",
                "nr_document",
                "nm_sex",
                "dt_born",
                "nm_position",
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
                "active",
                "department_id",
                "company_id"
            ]);

            const user = await User.create(data)

            return user
        } catch (error) {
            return response.status(error.status).send({
                message: 'Erro ao criar o usuário.',
                err_message: error.message
            })
        }

    }

    async show({ params, request, response, view }) {
        try {
            const user = await User.findOrFail(params.id)

            await user.load('department')
            await user.load('company')
            await user.load('profile')
            await user.load('folders')

            return user

        } catch (error) {
            return response.status(error.status).send({
                message: 'Erro ao tentar buscar um usuário.',
                err_message: error.message
            })
        }
    }

    async update({ params, request, response }) {
        try {
            const user = await User.findOrFail(params.id)

            const data = request.only([
                "nm_username",
                "nm_email",
                "nm_password",
                "nm_full_name",
                "nr_document",
                "nm_sex",
                "dt_born",
                "nm_position",
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
                "active",
                "department_id",
                "company_id"
            ])

            user.merge(data)

            await user.save()

            return user
        } catch (error) {
            return response.status(error.status).send({
                message: 'Erro ao tentar atualizar um usuário.',
                err_message: error.message
            })
        }

    }

    async destroy({ params, request, response }) {
        try {
            const user = await User.findOrFail(params.id)
            await user.delete()

        } catch (error) {
            return response.status(error.status).send({
                message: 'Erro ao tentar excluir o usuário.',
                err_message: error.message
            })
        }
    }
}

module.exports = UserController
