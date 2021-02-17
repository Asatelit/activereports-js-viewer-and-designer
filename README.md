# ActiveReportsJS

Creating your first ActiveReportsJS Viewer/Designer application.

### Tech Stack

* [Node.js][node], [Yarn][yarn], [TypeScript][ts], [Babel][babel], [Prettier][prettier] — core platform and dev tools
* [ActiveReportsJS](https://www.npmjs.com/package/@grapecity/activereports) - ActiveReportsJS is a reporting solution for visualizing data in front-end applications.

### Prerequisites

* [Node.js][node] v12 or higher + [Yarn][yarn] package manager
* Optionally [VS Code][code] editor with [Project Snippets][vcsnippets],
  [EditorConfig][vceditconfig], [ESLint][vceslint], and [Prettier][vcprettier]
  plug-ins.

### Getting Started

Just clone the repo, install the packages with `npm install` and run `npm start`:

```bash
$ npm install                  # Install Node.js dependencies
$ npm start                    # Launch application.
```

Now you can open your web app in a browser and start hacking.
Whenever you modify any of the source files inside the /src folder, the module bundler (Webpack)
will recompile the app on the fly and refresh all the connected browsers.

Note that the npm start command launches the app in development mode, the compiled output files are not optimized
and minimized in this case.

### How to Build

If you need just to build the app (without running a dev server), simply run:

```shell
$ npm run build
```

This command builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
By default, it also includes a service worker so that your app loads from local cache on future visits.

Your app is ready to be deployed.

### References

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and powered by ActiveReportsJS components:
* [@grapecity/activereports](https://www.npmjs.com/package/@grapecity/activereports) - ActiveReportsJS (ARJS) is JavaScript version of ActiveReports that can work on any modern browser.
* [@grapecity/activereports-react](https://www.npmjs.com/package/@grapecity/activereports-react) - This package is a part of the ActiveReportsJS and provides react wrapper for ARJS Viewer Component.
