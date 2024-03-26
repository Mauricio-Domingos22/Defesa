'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TypeUserSchema extends Schema {
  up () {
    this.create('type_users', (table) => {
      table.increments()
      table.string('slug').unique();
      table.timestamps()
    })
  }

  down () {
    this.drop('type_users')
  }
}

module.exports = TypeUserSchema
