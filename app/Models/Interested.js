'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Interested extends Model {

    users_frelancer() {
        return this.hasMany("App/Models/UserFreelancer", "id_user_inteterested", "id")
    }

    publications() {
        return this.hasMany("App/Models/Publication", "id_user_publications", "id")
    }
}

module.exports = Interested
