const { unlink: remove } = require('fs')
const { basename } = require('path')
const { exec } = require('shelljs')

function installMsi (filePath) {
  if (!filePath) return
  return new Promise((resolve, reject) => {
    process.stdout.write(`Installing ${basename(filePath)}...`)
    exec(
      `powershell.exe -Command "Start-Process msiexec -ArgumentList '/i ${filePath} /log "./node-updater.log" /passive' -Verb RunAs"`,
      (code, stdout, stderr) => {
        if (code !== 0) {
          console.log(' FAILED!')
          reject(new Error(`${stdout}\n${stderr}`))
        }
        console.log(' DONE.')
        resolve(stdout)
      }
    )
  })
}

// some cool async iterators for sequential execution
async function runInstallers (installers) {
  for await (const i of installers) {
    if (!i) continue
    try {
      await installMsi(i)
      remove(i, () => {}) // don't care if it doesn't work.
    } catch (err) {
      console.error(err.message)
    }
  }
}

module.exports = runInstallers
