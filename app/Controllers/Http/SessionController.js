'use strict'

class SessionController {
    async store({ request, response, auth }) {
        try {
            const { nm_email, nm_password } = request.all()

            const token = await auth.attempt(nm_email, nm_password)

            return token

        } catch (error) {
            return response.status(error.status).send({
                message: 'Erro ao tentar criar a sessão.',
                err_message: error.message
            })
        }
    }
}

module.exports = SessionController
