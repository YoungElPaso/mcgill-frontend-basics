# McGill Frontend Basics

Just a little unofficial primer to getting started with frontend dev at McGillU.

[![Build Status](https://travis-ci.org/YoungElPaso/mcgill-frontend-basics.svg)](https://travis-ci.org/YoungElPaso/mcgill-frontend-basics)


## Installation
``` 
  $ git clone https://github.com/youngelpaso/mcgill-frontend-basics
  $ npm install
```
Optionally, post-install, to verify basic depenencies and setup run: 
```
  $ npm test
```

If all is well, the test script should result in 4 passing tests.

## Usage
This package sets up some basic scripts to aid in basic front-end tasks like *designing components*, *working on a theme* or otherwise testing front-end assets. The primary tasks are focused on: 
  
  1. Compiling sass->css
  1. Creating a local styleguide to properly visualize the results of step 1.


### To Begin
The basic development script will watch the configured source directory and compile any changes (sass->css, maybe some JS later) and generate and serve the styleguide. This should be a good workflow for anyone. To get started just run:
```
  $npm run dev
```
And then start working on sass or component files (see examples below).


### Example
To style a new component, for example a 'call to action', you need markup (HTML) and some CSS (sass). See example code in:
```
  ./src/components/call-to-action.html
  ./src/sass/components/_cta.scss
```
*NB:* The sass file above will need to be imported in style.scss (and optionally styleguide.scss) so it is compiled into the main css files.

Running ``` $ npm run dev ``` will compile any changes to the above source files and run the styleguide, and include the markup included in the 'call-to-action.html' template.


## More Info
This package contains basic configuration and scripts to get started using SASS (via node-sass) as well as a few other things that are useful for frontend development at McGill U.

## Node-sass
Node-sass is an implementation of sass for Node that can compile *.scss files to *.css files. It can take a 'watch' argument as well as input and output arguments and several others. This package can compile sass for development (readable output) and production (compressed output).


## Susy
We use susy for things like grids, so this package supports it as well. There's even a small set of tests to run to make sure it's working properly.

## Styleguide
![screenshot](https://user-images.githubusercontent.com/54349/42113596-c7785816-7bb9-11e8-940d-01861e8ece66.png "Screenshot")

This package includes a set of scripts that will compile sass for production but it also has a few development scripts that will do things like watch the sass source folder for changes and automatically compile them as well as compile a styleguide to illustrate the resulting css.

The styleguide lives in its own directory and is compiled from two sources: a components directory, and the sass directory.  The components directory can include any html snippet (and soon Riot tag), and maybe some other types of templates as well.  When it is built, a single page HTML file is served at localhost:3000 with all the associated HTML components rendered out and styled with whatever sass was also compiled.

## Scripts
This package uses several scripts to do things. They are all run from the command line like so:
```
$ npm run <script>
```

Here's a condensed look at the most important:

```
"scripts": {
    "postinstall": "mkdir ./styleguide/build",
    "dev:sass:watch": "node-sass -w --include-path node_modules/susy/sass -r --output-style=$npm_package_config_devOutputStyle ./src/$npm_package_config_sassIn -o ./build/$npm_package_config_sassOut",
    "prod:sass": "node-sass --include-path node_modules/susy/sass -r --output-style=$npm_package_config_prodOutputStyle ./src/$npm_package_config_sassIn -o ./build/$npm_package_config_sassOut",
    "dev": "npm run dev:serve & npm-watch dev:builds",
    "styleguide": "node ./styleguide/src/styleguide-build.js > ./styleguide/build/index.html",
    "test": "./node_modules/mocha/bin/mocha test/susy-test.js"
  },
```

### postinstall 
This just sets up a few required directories. This should run *once* immediately after installing the pacakge and not need to be run again.

### dev:sass:watch
This runs node-sass on the specified sass and css directories, with a watch flag set so it waits for future changes to the source and compiles them as they happen.  This is the simplest dev experience this package provides.

### prod:sass
This runs node-sass, but with compressed (i.e. not human-friendly) output. It doesn't include a watch flag because it should be run after development work, or maybe even on a server.

### test
This runs a few tests using Mocha and sass-true (a scss testing utility developed by the same authors as susy). There are only 4 simple tests at the moment but they cover things like whether susy is installed correctly, whether it is included correctly and whether node-sass is compiling as expected. Run this anytime big changes are made to the sass. Expand on it.

### dev
This is the biggest script, compiled of other smaller ones. In order it:

 * runs a small server on the ./styleguide dir.
 * runs a watch command for the dev:builds configuration which in turn:
   * runs and re-runs dev:sass compiling source *.scss into *.css
   * compiling components into the styleguide markup,
   * copying styleguide css into the directory it can be served from best.

Using ``` $ npm run dev ``` is pretty much the only one (besides maybe 'test') that needs to be run locally for a developer to work with this package.

## Source file structure:
The structure of the source and builds directories are important. They should allow for a sensible approach to writing modular, well organized code for the front-end. Therefore the default approach is to break down the source into the following (sub)directories:

```
  ./src
    -> ./components (*.html, *.js, *.pug, e.g. standard-block.html)
    -> ./sass (*.scss)
       -> ./components (e.g. _block.scss)
       -> ./layouts (e.g. _susy.scss)
       -> ./theme (e.g. _colors.scss)
       -> ./utilities (e.g. _debug.scss)
  ./style.scss (the main source file to compile into css)
  ./styleguide.scss (the source file for the styleguide css)
```
All of the above will get compiled/copied into two destinations:
```
  ./build/css (*.css)
  ./styleguide/build
     -> ./css (styleguide.css)
     -> ./index.html
```
It is *not* recommended that either build destination is committed. They are for local development and sass should be compiled automatically elsewhere for production (i.e. a CI/QA step). Hence those directories are both under _.gitignore_.