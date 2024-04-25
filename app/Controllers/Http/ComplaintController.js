'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with complaints
 */
class ComplaintController {
  /**
   * Show a list of all complaints.
   * GET complaints
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new complaint.
   * GET complaints/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new complaint.
   * POST complaints
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {

      const payload = request.only(
        [
          "id_contrato",
          "date_complaint",
          "descriptioncomplaint",
           "arquivo"

        ])


      payload.date_complaint = new Date()
      payload.id_contrato = 1


      const contract = await Database.table('complaints').insert(payload)

      if (contract) {

        return response.created({ message: 'Denuncia feita com sucesso', code: 200, data: contract })

      } else {

        return response.created({ message: 'Erro ao registar ao efectuar a denuncia!', code: 201, data: contract })
      }

    } catch (error) {
      console.log(error)
      return response.created({ message: 'Erro ao registar ao efectuar  a denuncia!', code: 201, data: contract })
    }
  }


  /**
   * Display a single complaint.
   * GET complaints/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing complaint.
   * GET complaints/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update complaint details.
   * PUT or PATCH complaints/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a complaint with id.
   * DELETE complaints/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ComplaintController
