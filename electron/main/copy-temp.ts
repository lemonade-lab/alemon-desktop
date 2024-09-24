import { app } from 'electron'
import { existsSync, cpSync, rmSync } from 'fs'
import { join, dirname } from 'path'

const temp = join(app.getPath('temp'), 'Alemon-temp')
const resources = join(dirname(app.getPath('exe')), 'resources')

if (app.isPackaged && existsSync(temp)) {
  if (existsSync(join(temp, 'root'))) {
    cpSync(join(temp, 'root'), join(resources, 'root'), { recursive: true })
  }
  if (existsSync(join(temp, 'node_modules'))) {
    rmSync(join(resources, 'node_modules'), { recursive: true })
    cpSync(join(temp, 'node_modules'), join(resources, 'node_modules'), {
      recursive: true
    })
  }
  if (existsSync(join(temp, 'package.json'))) {
    rmSync(join(resources, 'package.json'), { recursive: true })
    cpSync(join(temp, 'package.json'), join(resources, 'package.json'), {
      recursive: true
    })
  }
  rmSync(temp, { recursive: true })
}
