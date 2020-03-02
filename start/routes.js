'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('passwords', 'ForgotPasswordController.update').validator('ResetPassword')



Route.group(() => {
    // Upload files
    Route.get('/files/:id', 'FileController.show')
    Route.post('/files', 'FileController.store')
    Route.delete('/files/:id', 'FileController.destroy')

    Route.resource('companies', 'CompanyController')
        .apiOnly()
        .validator(new Map(
            [
                [
                    ['companies.store'],
                    ['Company']
                ]
            ]
        ))
    
    Route.resource('companies.stores', 'StoreController')
        .apiOnly()
        .validator(new Map(
            [
                [
                    ['companies.store.store'],
                    ['Store']
                ]
            ]
        ))

}).middleware(['auth'])
