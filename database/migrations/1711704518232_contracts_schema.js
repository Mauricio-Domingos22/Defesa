'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContractsSchema extends Schema {
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
      table.text('description')
      table.date('term')
      table.float('value')
      table.date('date_contract')
      table.integer('number_prototype')
      table.string('signature_freelancer',80).notNullable()
      table.string('signature_company',80).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('contracts')
  }
}

module.exports = ContractsSchema
