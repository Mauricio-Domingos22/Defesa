'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddGenderSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table
      .integer("id_gender")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("genders").onUpdate('CASCADE').onDelete('CASCADE');
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('id_gender')
    })
  }
}

module.exports = AddGenderSchema
