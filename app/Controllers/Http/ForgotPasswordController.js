'use strict'

const moment = require('moment')
const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
    async store ({ request, response }) {
        try {
            const nm_email = request.input('nm_email')
            const user = await User.findByOrFail('nm_email', nm_email)
    
            user.token = crypto.randomBytes(10).toString('hex')
            user.token_created_at = new Date()
    
            await user.save()

            await Mail.send(
                ['emails.forgot_password'],
                { nm_email, token: user.token, link: `${request.input('redirect_url')}?token=${user.token}`},
                message => {
                    message
                        .to(user.nm_email)
                        .from('dev@bsine.com', 'Dev | Bsine')
                        .subject('Recuperação de senha')
                }
            )

            
        } catch (error) {
            return response.status(error.status).send({ error: {message: 'Algo não deu certo, esse e-mail existe?'} })
        }
    } 
    
    async update ({ request, response }) {
        try {
            const { token, nm_password } = request.all()

            const user = await User.findByOrFail('token', token)

            const tokenExpired = moment().subtract('2', 'days').isAfter(user.token_created_at)

            if(tokenExpired) {
                return response.status(401).send({ error: {message: 'O token de recuperação está expirado'} }) 
            }

            user.token = null
            user.token_created_at = null
            user.nm_password = nm_password

            await user.save()
        } catch (error) {
            return response.status(error.status).send({ error: {message: 'Algo deu errado ao resetar sua senha'} }) 
        }
    }
}

module.exports = ForgotPasswordController
