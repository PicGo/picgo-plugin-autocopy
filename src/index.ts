import picgo from 'picgo'
import os from 'os'
import clipboardy from 'clipboardy'

export = (ctx: picgo) => {
  const config = (ctx: picgo) => {
    let userConfig = ctx.getConfig('picgo-plugin-autocopy')
    if (!userConfig) {
      userConfig = {}
    }
    const config = [
      {
        name: 'template',
        type: 'list',
        choices: ['Markdown', 'HTML', 'URL', 'UBB', 'Custom'],
        default: 'URL'
      },
      {
        name: 'customLink',
        type: 'input',
        message: 'Please place the $url to where you want.',
        when (answer) {
          return answer.template === 'Custom'
        },
        default: '$url'
      }
    ]
    return config
  }

  const handleConfig = async (ctx: picgo) => {
    const prompts = config(ctx)
    const answer = await ctx.cmd.inquirer.prompt(prompts)
    ctx.saveConfig({
      'picgo-plugin-autocopy': answer
    })
  }

  const register = () => {
    ctx.on('finished', (msg: picgo) => {
      const customLink = ctx.getConfig('picgo-plugin-autocopy.customLink') || '$url'
      const pasteType = ctx.getConfig('picgo-plugin-autocopy.template') || 'URL'
      const tpl = url => {
        return {
          'Markdown': `![](${url})`,
          'HTML': `<img src="${url}"/>`,
          'URL': url,
          'UBB': `[IMG]${url}[/IMG]`,
          'Custom': customLink.replace(/\$url/g, url)
        }
      }
      let urls = ''
      let newline = os.platform() === 'win32' ? '\r\n' : '\n'
      msg.output.forEach(item => {
        urls += tpl(item.imgUrl)[pasteType] + newline
      })
      clipboardy.writeSync(urls)
    })
  }
  return {
    register,
    config,
    handleConfig
  }
}
