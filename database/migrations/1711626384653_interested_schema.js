'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InterestedSchema extends Schema {
  up () {
    this.create('interesteds', (table) => {
      table.increments()
      table
      .integer("id_user_inteterested")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user_freelancers").onUpdate('CASCADE').onDelete('CASCADE')
      table
      .integer("id_user_publications")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("publications").onUpdate('CASCADE').onDelete('CASCADE')
      table.date("date_submit").notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('interesteds')
  }
}

module.exports = InterestedSchema
