const axios = require('axios')

function getLatestMSIFromGithub (githubProject) {
  return axios({
    method: 'get',
    url: `https://api.github.com/repos/${githubProject}/releases/latest`
  })
    .then(response => response.data.assets)
    .then(assets => assets.find(a => a.name.includes('.msi')))
    .then(msi => msi.browser_download_url)
}

function getLatestMSIFromNodeJsPage () {
  return axios({
    method: 'get',
    url: 'https://nodejs.org/en/download/current/',
    responseType: 'document'
  })
    .then(response => response.data)
    .then(page => [...new Set(page.match(/(http)\S+x64\.msi\b/g))][0])
}

const getUrls = () =>
  Promise.all([
    getLatestMSIFromNodeJsPage(),
    getLatestMSIFromGithub('yarnpkg/yarn')
  ])

module.exports = getUrls
