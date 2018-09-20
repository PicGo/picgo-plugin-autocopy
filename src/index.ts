import picgo from 'picgo'
import os from 'os'
import clipboardy from 'clipboardy'

export = (ctx: picgo) => {
  const register = () => {
    ctx.on('finished', (msg: picgo) => {
      let urls = ''
      let newline = os.platform() === 'win32' ? '\r\n' : '\n'
      msg.output.forEach(item => {
        urls += item.imgUrl + newline
      })
      clipboardy.writeSync(urls)
    })
  }
  return {
    register
  }
}
