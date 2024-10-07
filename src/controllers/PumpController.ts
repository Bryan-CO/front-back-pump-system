import { Request, Response } from 'express'
import { PumpService } from '../services/PumpService'
import { ResponseModel } from '../utils/ResponseModel'
import { CustomError } from '../errors/FetchError'

// eslint-disable-next-line
export class PumpController {
  static async checkPos (req: Request, res: Response): Promise<void> {
    const { password } = req.body
    console.log({ password })
    try {
      // eslint-disable-next-line
      if (!password) throw new CustomError(400, 'El campo password es obligatorio!')
      const nroPos = await PumpService.checkPos({ password })
      res.cookie('authData', JSON.stringify(nroPos), {
        secure: true,
        sameSite: 'none'
      })
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
}
