'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with contracts
 */
class ContractController {
  /**
   * Show a list of all contracts.
   * GET contracts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new contract.
   * GET contracts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new contract.
   * POST contracts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {

    try {

      const payload = request.only(
        [
          "freelancer",
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

  async getPublicationByUser({ auth }) {

    const user_freelancer = await Database.select('*').from('user_freelancers').where('id_user', auth.user.id).first()
   

     const publications = await Database.select('*').from('publications').where('id_speciality', user_freelancer.id_speciality)

    const data = {
      publications: publications,
      user_freelancer: user_freelancer
    }
     
    
    
    return data
  }


  /**
   * Display a single contract.
   * GET contracts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing contract.
   * GET contracts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update contract details.
   * PUT or PATCH contracts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a contract with id.
   * DELETE contracts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ContractController
