'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddCitySchema extends Schema {
  up () {
    this.table('users', (table) => {
      table
      .integer("id_city")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("cities").onUpdate('CASCADE').onDelete('CASCADE');
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('id_city')
    })
  }
}

module.exports = AddCitySchema
