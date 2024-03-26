'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserFreelancerSchema extends Schema {
  up () {
    this.create('user_freelancers', (table) => {
      table.increments()
      table
      .integer("id_user")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users").onUpdate('CASCADE').onDelete('CASCADE')
      table
      .integer("id_speciality")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("especialities").onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_freelancers')
  }
}

module.exports = UserFreelancerSchema
