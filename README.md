# Windows Update Node

Quick little cli tool for Windows users, who prefer updating Node (and yarn) from their command line instead of having to navigate to websites and running GUI installers.

On Linux and Mac there are easy command line options to install these, but Windows users are always assumed to be happy to do a lot of clicky clacky. If you want a quick one-liner to bump up Node and (optionally) yarn, this thing should help.

## Usage

1.  `yarn global add win-update-node` or `npm i -g win-update-node`
2.  `update-node [-y|--yarn|yarn]` to update Node to the latest _Current_ version (add a yarn option to update it as well)

## What does it install?

* For Yarn we use the Github API to get the latest release, and then the relevant 64bit .msi asset.
* The Node folks don't release on Github, so here it will install the latest 64bit .msi that is available on the official Downloads website ("Current", no stinking LTS!)
* It saves the files in the standard Windows temp location and then removes them after successful installation. No fuzz.

## Any gotchas?

* Well, you won't get around authorizing the installation with Windows, so there will be the usual dialogs you need to press OK on. But that's the only interaction needed.
* This is not an nvm clone. It updates to the latest versions and that's it.

## Development

This was a quick evening project, for my own purposes. I don't currently plan to evolve this very much, so if anyone wants to build on it, PRs are of course welcome.

### Tech used

* Node (v10.3+, for a single async for..of loop; Now, I _could_ easily refactor it back... but right now it's just for myself, so screw it.)
* shellJS
* axios
* yarn
