'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MensageSchema extends Schema {
  up () {
    this.create('mensages', (table) => {
      table.increments()
      table
      .integer("sender")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users").onUpdate('CASCADE').onDelete('CASCADE')
      table
      .integer("reception")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users").onUpdate('CASCADE').onDelete('CASCADE')
      table.date('time')
      table.text('sms')
      table.timestamps()
    })
  }

  down () {
    this.drop('mensages')
  }
}

module.exports = MensageSchema
