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

      res.cookie('token', nroPos.accessToken)
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

  static getPump (req: Request, res: Response): void {
    const { authorization } = req.headers

    // eslint-disable-next-line
    if (!authorization?.startsWith('Bearer ')) return ResponseModel.error({ res, error: 'TOKEN NO VALIDO', statusCode: 401 })

    const token = authorization.split(' ')[1]
    if (!validateToken(token)) return ResponseModel.error({ res, error: 'NO AUTORIZADO', statusCode: 401 })

    return ResponseModel.success({ res, data: [1, 3, 5, 7], statusCode: 200 })
  }
}

function validateToken (token: string): boolean {
  return token === 'soyuntoken'
}
