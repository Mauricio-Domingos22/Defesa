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
  async index({ request, response, view }) {
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
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new complaint.
   * POST complaints
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async getContrato(id) {
    try {
      console.log("ID recebido em getContrato:", id);
      const contrato = await Database
        .select('*')
        .from('contratos')
        .where('id', id)
        .first();
      console.log("Contrato encontrado:", contrato);
      return contrato;
    } catch (error) {
      console.error("Erro em encontar contrato:", error);
      throw error;
    }
  }

  async store({ request, response }) {
    try {
      const payload = request.only([
        "id_contrato",
        "date_complaint",
        "descriptioncomplaint",
        "arquivo"
      ]);
  
      console.log("ID do contrato:", payload.id_contrato);
      const contrato = await this.getContrato(payload.id_contrato);
  
      if (!contrato) {
        return response.badRequest({ message: 'Contrato não encontrado!', code: 404 });
      }
  
      payload.date_complaint = new Date();
      payload.id_contrato = contrato.id;
  
      const contract = await Database.table('complaints').insert(payload);
  
      if (contract) {
        return response.created({ message: 'Denúncia feita com sucesso', code: 200, data: contract });
      } else {
        return response.internalServerError({ message: 'Erro ao registrar a denúncia!' });
      }
    } catch (error) {
      console.error("Erro ao registrar a denúncia:", error);
      throw error;
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
  async show({ params, request, response, view }) {
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
  async edit({ params, request, response, view }) {
  }

  /**
   * Update complaint details.
   * PUT or PATCH complaints/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a complaint with id.
   * DELETE complaints/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = ComplaintController
