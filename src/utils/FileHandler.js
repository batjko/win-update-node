const {
  createWriteStream,
  statSync: getFileStats,
  unlink: remove
} = require('fs')
const { tmpdir } = require('os')
const { join, basename } = require('path')
const axios = require('axios')

const download = async (url, dest) => {
  // default download to windows temp folder
  if (!url) return
  if (!dest) dest = join(tmpdir(), basename(url))

  const fileName = basename(dest)
  const start = Date.now()
  console.info(`Downloading ${fileName}...`)

  // start download as stream
  const downloadStream = await axios({
    method: 'get',
    responseType: 'stream',
    url
  }).then(response => response.data)

  // write stream to local file (windows temp folder)
  downloadStream.pipe(createWriteStream(dest))

  // resolve promise when stream finished
  return new Promise((resolve, reject) => {
    downloadStream.on('end', () => {
      const size = getFileStats(dest).size / 1000
      console.info(
        `${fileName} - (${formatNum(size)} kb, ${elapsed(start)} ms)`
      )
      resolve(dest)
    })
    downloadStream.on('error', () => {
      console.info(` FAILED (${elapsed(start)} ms)`)
      remove(dest, () => {}) // delete async, but don't care if succeeds
      reject(new Error(`Error downloading file: ${fileName}`))
    })
  })
}

const elapsed = start => (Date.now() - start) / 1000
const formatNum = x => x.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

const downloadInstallers = urls => Promise.all(urls.map(url => download(url)))

module.exports = downloadInstallers
