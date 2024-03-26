'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FinanceSchema extends Schema {
  up () {
    this.create('finances', (table) => {
      table.increments()
      table
      .integer("id_user")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users").onUpdate('CASCADE').onDelete('CASCADE')
      table.float("value_disponible")
      table.float("saldo")
      table.timestamps()
      
    })
  }

  down () {
    this.drop('finances')
  }
}

module.exports = FinanceSchema
