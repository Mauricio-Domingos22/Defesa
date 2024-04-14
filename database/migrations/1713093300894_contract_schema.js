'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContractSchema extends Schema {
  up () {
    this.create('contracts', (table) => {
      table.increments()
      table
        .integer("freelancer")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("user_freelancers").onUpdate('CASCADE').onDelete('CASCADE')
      table
        .integer("company")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("user_companies").onUpdate('CASCADE').onDelete('CASCADE')
      table.string('descriptionService',300)
      table.date('term')
      table.float('value')
      table.date('date_contract')
      table.integer('number_prototype')
      table.timestamps()
    })
  }

  down () {
    this.drop('contracts')
  }
}

module.exports = ContractSchema
