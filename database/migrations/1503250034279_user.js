'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('fullname',80).notNullable()
      table.string('binumber',14).notNullable()
      table.integer('phone',9).notNullable()
      table.string('username', 50).notNullable()
      table.string('email', 244).notNullable().unique()
      table.string('password', 40).notNullable()
      table.string('photo',244)
      table.text('text_perfil')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
