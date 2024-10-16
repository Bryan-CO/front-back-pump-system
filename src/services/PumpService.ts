import cli from 'node:child_process'
import { PumpRepository, TokenPos } from '../repositories/PumpRepository'

const letterDisk = 'C'
// eslint-disable-next-line
export class PumpService {
  static async checkPos (): Promise<TokenPos> {
    const serialDisk = (await PumpService.getSerialDisk()).split('-').join('')
    const nroPos = await PumpRepository.checkPos(serialDisk)
    return nroPos
  }

  // eslint-disable-next-line
  static getSerialDisk (): Promise<string> {
    return new Promise((resolve, reject) => {
      cli.exec(`vol ${letterDisk}:`, (err, stdout, stderr) => {
        if (err !== null) {
          reject(new Error(err.message))
          return
        }
        if (stderr !== '') {
          reject(new Error(stderr))
          return
        }
        const serial = stdout.split('\n')[1].trim().split(':')[1].trim()
        resolve(serial)
      })
    })
  }

  // eslint-disable-next-line
  static async closeNavigator (): Promise<void> {
    return await new Promise((resolve, reject) => {
      cli.exec('taskkill /F /IM msedge.exe', (err, stdout, stderr) => {
        if (err !== null) {
          reject(new Error(err.message))
          return
        }
        if (stderr !== '') {
          reject(new Error(stderr))
          return
        }
        resolve()
      })
    })
  }
}
