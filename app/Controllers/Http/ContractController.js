'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with contracts
 */
const Database = use('Database');
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
          "company",
          "description",
          "term",
          "value",
          "date_contract",
          "number_prototype",
          "signature_freelancer",
          "signature_company"
        ])


      payload.date_contract = new Date()
      payload.freelancer = 1
      payload.company = 1

      const contract = await Database.table('contracts').insert(payload)

      if (contract) {

        return response.created({ message: 'Contrato feito com sucesso', code: 200, data: contract })

      } else {

        return response.created({ message: 'Erro ao registar ao efectuar o Contrato!', code: 201, data: contract })
      }

    } catch (error) {
      console.log(error)
      return response.created({ message: 'Erro ao registar ao efectuar o Contrato!', code: 201, data: contract })
    }
  }

  async getContratoByUser({ auth }) {

   
     const contrat= await Database.select('*').from('contracts')
     
    const data = {
      contrat: contrat
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
