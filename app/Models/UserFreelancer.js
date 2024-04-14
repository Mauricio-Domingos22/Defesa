'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserFreelancer extends Model {

    user() {
        return this.hasOne('App/Models/User', 'id_user', 'id');
    }
}

module.exports = UserFreelancer
