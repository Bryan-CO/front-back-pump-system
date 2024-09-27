import { Request, Response } from 'express'
import { PumpService } from '../services/PumpService'
import { ResponseModel } from '../utils/ResponseModel'
import { FetchError } from '../errors/FetchError'

// eslint-disable-next-line
export class PumpController {
  static async checkPos (req: Request, res: Response): Promise<void> {
    const { password } = req.body
    try {
      const nroPos = await PumpService.checkPos({ password })
      res.cookie('token', nroPos.accesToken)
      ResponseModel.success({ res, data: nroPos, message: 'Disco y contraseña validado correctamente!' })
    } catch (error) {
      if (error instanceof FetchError) {
        ResponseModel.error({ res, error: error.message, statusCode: error.statusCode })
      } else {
        ResponseModel.error({ res, error: 'Ocurrió un error inesperado!' })
      }
    }
  }
}
