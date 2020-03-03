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


Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('passwords', 'ForgotPasswordController.update').validator('ResetPassword')



Route.group(() => {
    // Routes users
    Route.get('users', 'UserController.index')
    Route.get('users/:id', 'UserController.show')
    Route.post('users', 'UserController.store').validator('User')
    Route.put('users/:id', 'UserController.update').validator('UpdateUser')
    Route.delete('users/:id', 'UserController.destroy')

    
    // Routes files
    Route.get('/files/:id', 'FileController.show')
    Route.post('/files', 'FileController.store')
    Route.delete('/files/:id', 'FileController.destroy')

    // Routes Companies
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
    
    // Routes Stores 
    Route.resource('stores', 'StoreController')
        .apiOnly()
        .validator(new Map(
            [
                [
                    ['stores.store'],
                    ['Store']
                ]
            ]
        ))

    // Routes Campaigns
    Route.resource('campaigns', 'CampaignController')
        .apiOnly()
        .validator(new Map(
            [
                [
                    ['campaigns.store'],
                    ['Campaign']
                ]
            ]
        ))
    
    // Routes Departments
    Route.resource('departments', 'DepartmentController')
        .apiOnly()
        .validator(new Map(
            [
                [
                    ['departments.store', 'departments.update'],
                    ['Department']
                ]
            ]
        ))

}).middleware(['auth'])
