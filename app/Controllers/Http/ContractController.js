'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with contracts
 */

const Contract = use('App/Models/Contract')
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
    const verContrato = await Database
    .select('*')
    .from('contracts')

  return verContrato
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
  async store ({ request, response }) {
    try {

      const payload = request.only(
        [
          "freelancer",
          "company",
          "descriptionService",
          "term",
          "value",
          "date_contract",
          "number_prototype",
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
    // if (!auth || !auth.user || !auth.user.id) {
    //     return null;
    // }

    // const userId = auth.user.id;

    // const UserFreelancer = await Database
    //     .select('users.*', 'user_freelancers.id as id')
    //     .from('users')
    //     .leftJoin('user_freelancers', 'users.id', 'user_freelancers.id_user') // Usando leftJoin para garantir que mesmo que não haja freelancer, os dados de usuário ainda sejam retornados
    //     .where('users.id', userId)
    //     .first();

    // const UserCompany = await Database
    //     .select('users.*', 'user_companies.id as id')
    //     .from('users')
    //     .leftJoin('user_companies', 'users.id', 'user_companies.id_user') // Usando leftJoin para garantir que mesmo que não haja empresa, os dados de usuário ainda sejam retornados
    //     .where('users.id', userId)
    //     .first();

    // let contratos = [];
    // if (UserFreelancer) {
    //     // Consultar contratos apenas se houver um freelancer associado
    //     contratos = await Database
    //         .select('*')
    //         .from('contracts')
    //         .where('id_freelancer', UserFreelancer.id);
    // }

    // const data = {
    //     UserFreelancer: UserFreelancer,
    //     UserCompany: UserCompany,
    //     contratos: contratos
    // };

    // return data;

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
    try {
      const contract = await Contract.findOrFail(params.id)
      const data = request.only([
        'descriptionService',
        'term',
        'value',
        'date_contract',
        'number_prototype',
      ])
      contract.merge(data)
      await contract.save()

      return response.status(200).send(contract)

    } catch (error) {
      console.error(error)
      if (error.name === 'ModelNotFoundException') {
        return response.status(404).send({ error: 'contrato nao encontrado' })
      }
      return response.status(500).send({ error: 'Ocorreu um erro ao editar o contrato.' });
    }
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
    const contract = await Contract.findOrFail(params.id)
    await contract.delete();
  }
}

module.exports = ContractController
