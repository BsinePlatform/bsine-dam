'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers') 
const Drive = use('Drive')

/**
 * Resourceful controller for interacting with files
 */
class FileController {

  async show({ params, response }) {
    const file = await File.findOrFail(params.id)

    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }

  async store ({ request, response }) {
    request.multipart.file('file', {}, async file => {      
      try {
        const ContentType = file.headers['content-type']
        const ACL = 'public-read'
        const Key = `${Date.now()}.${file.subtype}` 

        const url = await Drive.disk('s3').put(Key, file.stream)

        await File.create({
          file: Key,
          name: file.clientName,
          type: file.type,
          file_path: url,
          subtype: file.subtype
        })
        
      } catch (error) {
        return response.status(error.status).send({ 
          error: {
            message: 'Erro no upload do arquivo',
            err_message: error.message
          } 
        })
      }
    })
    await request.multipart.process()
    
    
    // 
    /*try {
      if (!request.file('file')) return

      const upload = request.file('file', {size: '2mb'})

      const fileName = `${Date.now()}.${upload.subtype}`

      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })

      if(!upload.moved()) {
        throw upload.error()
      }

      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })

      return file


    } catch (error) {
      return response.status(error.status).send({ error: {message: 'Erro no upload do arquivo'} })
    }*/
  }

  
}

module.exports = FileController
