'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComplaintSchema extends Schema {
  up () {
    this.create('complaints', (table) => {
      table.increments()
      table
      .integer("id_user")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users").onUpdate('CASCADE').onDelete('CASCADE')
      table.string('entity_name',80).notNullable()
      table.string('subject',150).notNullable()
      table.string('body',240).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('complaints')
  }
}

module.exports = ComplaintSchema
