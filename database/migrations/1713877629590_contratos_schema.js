'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContratosSchema extends Schema {
  up () {
    this.create('contratos', (table) => {
      table.increments()
      table
        .integer("id_user_freelancer")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("user_freelancers").onUpdate('CASCADE').onDelete('CASCADE')
      table
        .integer("id_user_company")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("user_companies").onUpdate('CASCADE').onDelete('CASCADE')
      table.string('descriptionService',300)
      table.date('term')
      table.float('value')
      table.date('date_contract')
      table.integer('number_prototype')
      table.integer('quantity')
      table.timestamps()
    })
  }

  down () {
    this.drop('contratos')
  }
}

module.exports = ContratosSchema
