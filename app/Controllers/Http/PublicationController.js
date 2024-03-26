'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with publications
 */

const Database = use('Database');


class PublicationController {
  /**
   * Show a list of all publications.
   * GET publications
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response }) {
  }

  /**
   * Render a form to be used for creating a new publication.
   * GET publications/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async store({ request, response }) {

    try {

      const payload = request.only(
        [
          "empresa",
          "subject",
          "body",
          "date_publication",
          "id_speciality"
        ])


      payload.date_publication = new Date()
      payload.id_speciality = 1
      payload.empresa = 1

      const publication = await Database.table('publications').insert(payload)

      if (publication) {

        return response.created({ message: 'Publicação feita com sucesso', code: 200, data: publication })

      } else {

        return response.created({ message: 'Erro ao registar a publicação!', code: 201, data: publication })
      }

    } catch (error) {
      console.log(error)
      return response.created({ message: 'Erro ao registar a publicação!', code: 201, data: publication })
    }
  }


  /**
   * Update publication details.
   * PUT or PATCH publications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

}

module.exports = PublicationController
