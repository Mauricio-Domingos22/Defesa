'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComplaintSchema extends Schema {
  up () {
    this.create('complaints', (table) => {
      table.increments()
      table
      .integer("id_contrato")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("contratos").onUpdate('CASCADE').onDelete('CASCADE')
      table.date('date_complaint')
      table.string('descriptioncomplaint',245)
      table.string('arquivo',245)
      table.timestamps()
    })
  }

  down () {
    this.drop('complaints')
  }
}

module.exports = ComplaintSchema
