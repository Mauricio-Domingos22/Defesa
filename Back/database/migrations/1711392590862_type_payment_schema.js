'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TypePaymentSchema extends Schema {
  up () {
    this.create('type_payments', (table) => {
      table.increments()
      table.string('description',30).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('type_payments')
  }
}

module.exports = TypePaymentSchema
