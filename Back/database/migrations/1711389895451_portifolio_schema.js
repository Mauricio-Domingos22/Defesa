'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PortifolioSchema extends Schema {
  up () {
    this.create('portifolios', (table) => {
      table.increments()
      table
      .integer("id_freelancer")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user_freelancers").onUpdate('CASCADE').onDelete('CASCADE')
      table.string('description')
      table.string('filename')
      table.timestamps()
    })
  }

  down () {
    this.drop('portifolios')
  }
}

module.exports = PortifolioSchema
