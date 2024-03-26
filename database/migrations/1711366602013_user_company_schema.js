'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserCompanySchema extends Schema {
  up () {
    this.create('user_companies', (table) => {
      table.increments()
      table
      .integer("id_user")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users").onUpdate('CASCADE').onDelete('CASCADE')
      table.string('name_company',80).notNullable()
      table.integer('nif',10).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_companies')
  }
}

module.exports = UserCompanySchema
