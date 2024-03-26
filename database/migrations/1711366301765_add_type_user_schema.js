'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddTypeUserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table
      .integer("id_type_user")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("type_users").onUpdate('CASCADE').onDelete('CASCADE');
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('id_type_user')
    })
  }
}

module.exports = AddTypeUserSchema
