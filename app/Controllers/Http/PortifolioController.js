'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with portifolios
 */

const UploadFile = use('App/Models/UploadFile');
const Database = use('Database');

class PortifolioController {
  /**
   * Show a list of all portifolios.
   * GET portifolios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response }) {

  }


  /**
   * Create/save a new portifolio.
   * POST portifolios
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

  async store({ request, response, auth }) {
    try {


      let _uploadFile = new UploadFile()

      let data = request.only(['filename', 'id_freelancer', 'description'])
      let file = request.file('file')

      let __filename = await _uploadFile.uploadFiles(file, data.description, 'portfolio')
      data.filename = __filename

      let user_freelancer = await this.getUserFreelancer(auth.user.id)
      data.id_freelancer = user_freelancer.id

      let portifolio_created = await Database.table('portifolios').insert(data)

      return response.created({ message: 'Portfolio registado com sucesso', code: 200, data: portifolio_created })
    } catch (error) {
      console.log(error)
      return response.created({ message: 'Erro ao registar porrtfolio com sucesso', code: 201, data: null })
    }

  }

  /**
   * Render a form to update an existing portifolio.
   * GET portifolios/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response }) {
  }

  /**
   * Update portifolio details.
   * PUT or PATCH portifolios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

}

module.exports = PortifolioController
