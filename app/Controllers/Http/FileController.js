'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers') 
const Drive = use('Drive')

/**
 * Resourceful controller for interacting with files
 */
class FileController {

  async show({ params, response }) {
    
    try {
      const file = await File.findOrFail(params.id)
      const contentType = `${file.type}/${file.subtype}`
      response.implicitEnd = false

      response.header('Content-Type', contentType)
      const stream = await Drive.getStream(file.file)

      stream.pipe(response.response)

    } catch (error) {
      return response.status(error.status).send({ 
        error: {
          message: 'Arquivo não existe',
          err_message: error.message
        } 
      })
    }
  }

  async store ({ request, response }) {

    request.multipart.file('file', {}, async file => {      
      try {
        const ContentType = file.headers['content-type']
        const Key = `${Date.now()}.${file.subtype}` 
        
        const url = await Drive.put(Key, file.stream, {
          ContentType,
          ACL: 'public-read',          
        })
        

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
   
  }

  async destroy ({ params, request, response }) {
    try {
      const file = await File.findOrFail(params.id)
      
      await Drive.delete(file.file)

      await file.delete()

    } catch (error) {
      return response.status(error.status).send({ 
        error: {
          message: 'Arquivo não existe e não pode ser excluído',
          err_message: error.message
        } 
      })
    }
  }

  
}

module.exports = FileController
