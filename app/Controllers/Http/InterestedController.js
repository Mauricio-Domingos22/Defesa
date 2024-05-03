'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with interesteds
 */
const Interest = use('App/Models/Interested')
const Database = use('Database');
class InterestedController {
  /**
   * Show a list of all interesteds.
   * GET interesteds
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new interested.
   * GET interesteds/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new interested.
   * POST interesteds
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

    let submit;

    try {

      const payload = request.only(
        [
          "id_user_inteterested",
          "id_user_publications",
          "date_submit"
        ])

      let user_freelancer = await this.getUserFreelancer(auth.user.id)

      payload.date_submit = new Date()
      payload.id_user_publications = payload.id_user_publications
      payload.id_user_inteterested = user_freelancer.id

      submit = await Database.table('interesteds').insert(payload)

      if (submit) {

        return response.created({ message: 'Subemetido com sucesso', code: 200, data: submit })

      } else {

        return response.created({ message: 'Erro ao submeter!', code: 201, data: submit })
      }

    } catch (error) {
      console.log(error)
      return response.created({ message: 'Erro ao submeter!', code: 201, data: submit })
    }
  }





  async getSubmitedByUser({ auth,params }) {

    const user_company = await Database.select('*').from('user_companies').where('id_user', auth.user.id).first()

    // const queryBuilder = Database.select('*').from('interesteds').where('id_user_publications', user_company.id_user_publications);
    // console.log(queryBuilder.toQuery());
    const publicationId = params.id;

    const submited = await Database.select('*')
            .from('interesteds')
            .where('id_user_publications', publicationId);


    const data = {
      submited: submited,
      user_company: user_company
    }



    return data
  }


  async getUserFreelancerPublications({ params, request, response }) {

    const interesteds = await Interest.query()
      .with('users_frelancer.user')
      .with('publications')
      .fetch()

    return interesteds

  }




  /**
   * Display a single interested.
   * GET interesteds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const submeter = await Interest.findOrFail(params.id)

    return submeter
  }

  /**
   * Render a form to update an existing interested.
   * GET interesteds/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update interested details.
   * PUT or PATCH interesteds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a interested with id.
   * DELETE interesteds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const submeter = await Interest.findOrFail(params.id)
    await submeter.delete();
  }
}

module.exports = InterestedController
