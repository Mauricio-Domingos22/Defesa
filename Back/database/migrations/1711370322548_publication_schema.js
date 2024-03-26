'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PublicationSchema extends Schema {
  up () {
    this.create('publications', (table) => {
      table.increments()
      table
      .integer("empresa")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user_companies").onUpdate('CASCADE').onDelete('CASCADE')
      table.string('subject',240).notNullable()
      table.text('body').notNullable()
      table.string('file',240)
      table.date("date_publication").notNullable()
      table
      .integer("id_speciality")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("especialities").onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('publications')
  }
}

module.exports = PublicationSchema
