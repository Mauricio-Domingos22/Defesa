'use strict'

const AuthController = require('../app/Controllers/Http/AuthController')
const CityController = require('../app/Controllers/Http/CityController')
const EspecialityController = require('../app/Controllers/Http/EspecialityController')
const GenderController = require('../app/Controllers/Http/GenderController')
const InterestedController = require('../app/Controllers/Http/InterestedController')
const ProfitionController = require('../app/Controllers/Http/ProfitionController')
const PublicationController = require('../app/Controllers/Http/PublicationController')
const TypeUserController = require('../app/Controllers/Http/TypeUserController')
const UserController = require('../app/Controllers/Http/UserController')



/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Route.post('/login',' AuthController.login')
Route.resource('users', 'UserController')
.apiOnly()
/*.validator(new Map([[['users.store'], ['StoreUser'] ]
]))*/

Route.post('/login', 'UserController.login')
Route.post('/gender','GenderController.create')
Route.post('/city', 'CityController.create')
Route.post('/typeuse', 'TypeUserController.create')
Route.post('/profissao', 'ProfitionController.create')
Route.post('/especialidade', 'EspecialityController.create')


Route.post('/publication','PublicationController.store')
Route.get('/publications_users_freelancer', 'PublicationController.getPublicationByUser').middleware('auth')

Route.post('/submetido', 'InterestedController.store')
Route.get('/subemetido_Publicaco', 'InterestedController.getSubmitedByUser').middleware('auth')

Route.get('/perfil', 'UserController.perfil').middleware('auth')

Route.post('/contrato','ContractController.store')
Route.get('/mostarcontarto', 'ContractController.getContratoByUser')

Route.get('/profissao','ProfitionController.index')




