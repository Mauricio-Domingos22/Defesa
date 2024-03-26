'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfitionSchema extends Schema {
  up () {
    this.create('profitions', (table) => {
      table.increments()
      table.string('description',40).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('profitions')
  }
}

module.exports = ProfitionSchema
