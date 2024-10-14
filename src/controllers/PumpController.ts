import { Request, Response } from 'express'
import { PumpService } from '../services/PumpService'
import { ResponseModel } from '../utils/ResponseModel'
import { CustomError } from '../errors/FetchError'

// eslint-disable-next-line
export class PumpController {
  static async checkPos (req: Request, res: Response): Promise<void> {
    try {
      // eslint-disable-next-line
      const nroPos = await PumpService.checkPos()
      console.log({ nroPos })
      ResponseModel.success({ res, data: nroPos, message: 'Disco y contraseña validado correctamente!' })
    } catch (error) {
      console.log(error)
      if (error instanceof CustomError) {
        ResponseModel.error({ res, error: error.message, statusCode: error.statusCode })
      } else {
        ResponseModel.error({ res, error: 'Ocurrió un error inesperado!' })
      }
    }
  }

  static async closeNavigator (req: Request, res: Response): Promise<void> {
    try {
      await PumpService.closeNavigator()
      ResponseModel.success({ res, data: null, message: 'Se cerró el navegador' })
    } catch (error) {
      console.log(error)
      if (error instanceof CustomError) {
        ResponseModel.error({ res, error: error.message, statusCode: error.statusCode })
      } else {
        ResponseModel.error({ res, error: 'Ocurrió un error inesperado!' })
      }
    }
  }
}
