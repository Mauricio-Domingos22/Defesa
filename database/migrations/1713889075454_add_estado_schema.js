'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddEstadoSchema extends Schema {
  up () {
    this.table('contratos', (table) => {
      table
        .integer("id_status")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("statuses").onUpdate('CASCADE').onDelete('CASCADE')
    })
  }

  down () {
    this.table('contratos', (table) => {
    table.dropColumn('id_status')
    })
  }
}

module.exports = AddEstadoSchema
