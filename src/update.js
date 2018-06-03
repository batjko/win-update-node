#!/usr/bin/env node
const getUrls = require('./utils/versionFinder')
const runInstallers = require('./utils/Installer')
const downloadInstallers = require('./utils/FileHandler')

// update yarn as well?
const updateYarn =
  process.argv.filter(arg =>
    ['-y', '--yarn', 'yarn'].includes(arg.toLowerCase()),
  ).length > 0

// Do the deed:
;(async () => {
  // Find The latest urls for direct download
  const [nodeMsiUrl, yarnMsiUrl] = await getUrls()

  // Download the Installers
  const installers = await downloadInstallers([
    nodeMsiUrl,
    updateYarn && yarnMsiUrl,
  ])

  // Install Node and Yarn (sequentially)
  await runInstallers(installers)
})()
