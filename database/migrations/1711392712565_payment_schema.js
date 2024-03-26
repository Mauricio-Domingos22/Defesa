'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentSchema extends Schema {
  up () {
    this.create('payments', (table) => {
      table.increments()
      table
      .integer("type_payment")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("type_payments").onUpdate('CASCADE').onDelete('CASCADE')
      table.float('value')
      table.date('date_payment')
      table.timestamps()
    })
  }

  down () {
    this.drop('payments')
  }
}

module.exports = PaymentSchema
