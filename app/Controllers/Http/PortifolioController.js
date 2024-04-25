'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with portifolios
 */

const UploadFile = use('App/Models/UploadFile');
const Database = use('Database');
const Helpers = use('Helpers')

class PortifolioController {

  typeOfFile = {
    application: {
      pdf: 'pdf',
      xlsx: 'xlsx',
      docx: 'docx'
    },
    image: {
      png: 'png',
      jpg: 'jpg',
      jpeg: 'jpeg'
    }
  }

  validationFile = () => {
    let validationOptions = {
      types: ['image', 'application'],
      size: '5mb',
      extnames: ['pdf', 'PDF', 'xlsx', 'XLSX', 'docx',
        'DOCX', 'png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG']
    }
    return validationOptions
  }

  /**
   * Show a list of all portifolios.
   * GET portifolios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth }) {

    let user_freelancer = await this.getUserFreelancer(auth.user.id)

    const portifolios = await Database.select('*').from('portifolios').where('id_freelancer', user_freelancer.id)

    return portifolios
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

  async previewFile({ params, response }) {

    try {

      const filename = params.filename.trim()

      const findComa = filename.indexOf(".")
      const subString = filename.substr(findComa + 1, filename.length)

      var path = 'portfolio'

      if (this.typeOfFile.image[subString]) {
        return response.download(Helpers.tmpPath(`${path}/${filename}`))
      } else {
        if (this.typeOfFile.application[subString]) {
          return response.download(Helpers.tmpPath(`${path}/${filename}`))
        }
      }

    } catch (error) {
      console.log(error)
    }
  }

}

module.exports = PortifolioController
