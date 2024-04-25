'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentSchema extends Schema {
  up () {
    this.create('payments', (table) => {
      table.increments()
      table
      .integer("id_contrato")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("contratos").onUpdate('CASCADE').onDelete('CASCADE')
      table.date('date_payment')
      table.string('comprovativo',245)
      table.timestamps()
    })
  }

  down () {
    this.drop('payments')
  }
}

module.exports = PaymentSchema
