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

  async getUserFreelancer(id_user) {

    const user_freelancer = await Database
      .select('*')
      .from('user_freelancers')
      .where('user_freelancers.id_user', id_user)
      .first()

    return user_freelancer
  }


  async getUserCompany(id_user) {

    const user_company = await Database
      .select('*')
      .from('user_companies')
      .where('user_companies.id_user', id_user)
      .first()

    return user_company
  }

  async store ({ request, response, auth }) {
    try {
      // Extrai os dados da solicitação
      const { id_user_freelancer, descriptionService } = request.only(["id_user_freelancer", "descriptionService"]);
  
      // Busca informações do freelancer e da empresa usando o id do usuário fornecido
      const user_freelancer = await this.getUserFreelancer(id_user_freelancer);
      const user_company = await this.getUserCompany(auth.user.id); // Supondo que o usuário logado é a empresa
  
      // Verifica se o freelancer e a empresa existem
      if (!user_freelancer || !user_company) {
        return response.status(404).json({ message: "Freelancer ou empresa não encontrados." });
      }
  
      // Cria o payload do contrato
      const payload = {
        id_user_freelancer: user_freelancer.id,
        id_user_company: user_company.id,
        descriptionService,
        date_contract: new Date() // Você pode querer adicionar a data do contrato aqui
      };
  
      // Insere o contrato no banco de dados
      const contract = await Database.table('contratos').insert(payload);
  
      // Retorna a resposta adequada
      return response.status(201).json({ message: 'Contrato feito com sucesso', code: 200, data: contract });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Erro ao registrar ao efetuar o Contrato!', code: 500, error });
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
