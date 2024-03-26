'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EspecialitySchema extends Schema {
  up () {
    this.create('especialities', (table) => {
      table.increments()
      table
      .integer("id_profition")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("profitions").onUpdate('CASCADE').onDelete('CASCADE')
      table.string('description',50).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('especialities')
  }
}

module.exports = EspecialitySchema
