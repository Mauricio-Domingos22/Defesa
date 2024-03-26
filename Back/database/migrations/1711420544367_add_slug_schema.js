'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddSlugSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.string('slug')
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('slug')
    })
  }
}

module.exports = AddSlugSchema
