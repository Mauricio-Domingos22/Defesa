'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with contratoes
 * 
 */
const Contrato = use('App/Models/Contrato')
const Database = use('Database');
class ContratoController {
  /**
   * Show a list of all contratoes.
   * GET contratoes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const verContrato = await Database
    .select('*')
    .from('contratos')

  return verContrato
  }

  /**
   * Render a form to be used for creating a new contrato.
   * GET contratoes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new contrato.
   * POST contratoes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {

      const payload = request.only(
        [
          "id_user_freelancer",
          "id_user_company",
          "descriptionService",
          "date_contract"
        ])


      payload.date_contract = new Date()
      payload.id_user_freelancer = 1
      payload.id_user_company = 1

      const contract = await Database.table('contratos').insert(payload)

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
    if (!auth || !auth.user || !auth.user.id) {
        return null;
    }

    const userId = auth.user.id;

    const UserFreelancer = await Database
        .select('users.*', 'user_freelancers.id as id')
        .from('users')
        .leftJoin('user_freelancers', 'users.id', 'user_freelancers.id_user') // Usando leftJoin para garantir que mesmo que não haja freelancer, os dados de usuário ainda sejam retornados
        .where('users.id', userId)
        .first();

    const UserCompany = await Database
        .select('users.*', 'user_companies.id as id')
        .from('users')
        .leftJoin('user_companies', 'users.id', 'user_companies.id_user') // Usando leftJoin para garantir que mesmo que não haja empresa, os dados de usuário ainda sejam retornados
        .where('users.id', userId)
        .first();

    let contratos = [];
    if (UserFreelancer) {
        // Consultar contratos apenas se houver um freelancer associado
        contratos = await Database
            .select('*')
            .from('contratos')
            .where('id_user_freelancer', UserFreelancer.id);
    }

    const data = {
        UserFreelancer: UserFreelancer,
        UserCompany: UserCompany,
        contratos: contratos
    };

    return data;

}

  /**
   * Display a single contrato.
   * GET contratoes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing contrato.
   * GET contratoes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update contrato details.
   * PUT or PATCH contratoes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async updateContrato ({ request, params }) {
    const { id } = params // Nome do campo de ID na tabela contrato
    const data = request.only(['term','value','number_prototype','quantity'])

    try {
      const contrato = await Contrato.findOrFail(id)

      // Verifica se os campos foram enviados na requisição e atualiza-os se necessário
      if (data.datadeentrega) {
        contrato.datadeentrega = data.datadeentrega
      }
      if (data.valor) {
        contrato.valor = data.valor
      }
      if (data.numero_de_prototipo) {
        contrato.numero_de_prototipo = data.numero_de_prototipo
      }
      if (data.empresa_id) {
        contrato.empresa_id = data.empresa_id
      }
      if (data.freelancer_id) {
        contrato.freelancer_id = data.freelancer_id
      }

      await contrato.save()

      return contrato // Retorna o contrato atualizado
    } catch (error) {
      return error
    }
  }

  /**
   * Delete a contrato with id.
   * DELETE contratoes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const contract = await Contrato.findOrFail(params.id)
    await contract.delete();
  }
}

module.exports = ContratoController
