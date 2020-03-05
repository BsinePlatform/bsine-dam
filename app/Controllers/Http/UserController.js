'use strict'

const User = use('App/Models/User')

class UserController {
    async index({ request, response, view }) {
        const { page } = request.get()
        const users = await User.query().paginate(page)

        return users
    }
    async store({ request }) {

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
    }

    async show({ params, request, response, view }) {
        const user = await User.findOrFail(params.id)

        await user.load('department')
        await user.load('company')
        await user.load('profile')

        return user
    }

    async update({ params, request, response }) {
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
    }

    async destroy({ params, request, response }) {
        const user = await User.findOrFail(params.id)
        await user.delete()
    }
}

module.exports = UserController
