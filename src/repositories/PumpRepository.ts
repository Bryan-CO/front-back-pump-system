import { CustomError } from '../errors/FetchError'

export interface DataResponse <T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface TokenPos {
  accessToken: string
  nroPos: string
}

interface RequestPos {
  serialDisk: string
}

// eslint-disable-next-line
export class PumpRepository {
  static async checkPos (serialDisk: string): Promise <TokenPos> {
    const reqData: RequestPos = {
      serialDisk
    }
    const res = await fetch('http://localhost:10245/v1/pump/getCheckPos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqData)
    })
    const data: DataResponse<TokenPos> = await res.json()
    console.log({ data })
    if (!data.success) {
      throw new CustomError(res.status, data.error)
    }
    return data.data
  }
}
