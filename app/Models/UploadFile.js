'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Helpers = use('Helpers')

class UploadFile extends Model {


    async upload(file, __filename, path) {

        await file.move(Helpers.tmpPath(path), {
            name: __filename,
            overwrite: true,
        });

        if (!file.moved()) {
            throw new Error(file.error())
        }

        return __filename;
    }

    async uploadFiles(image, documentName, path) {

        let file = image

        let __filename = `${documentName}-${new Date().getTime()}.${file.subtype}`

        await this.upload(file, __filename, path)

        return __filename
    }
}

module.exports = UploadFile
