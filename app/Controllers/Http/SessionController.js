'use strict'

class SessionController {
    async store ({ request, response, auth }) {
       const { nm_email, nm_password } = request.all()
       
       const token = await auth.attempt(nm_email, nm_password)

       return token
    }
}

module.exports = SessionController
