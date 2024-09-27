import { Response } from 'express'

interface ResponseOptions {
  res: Response
  data?: any
  message?: string
  error?: string
  statusCode?: number
}

// eslint-disable-next-line
export class ResponseModel {
  static success (options: ResponseOptions): void {
    const { res, data, message } = options
    res.status(200).json({
      success: true,
      data,
      message,
      error: null
    })
  }

  static error (options: ResponseOptions): void {
    const { statusCode = 500, res, error } = options
    res.status(statusCode).json({
      success: false,
      data: null,
      message: null,
      error
    })
  }
}
