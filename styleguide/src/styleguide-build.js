// Import pug.
var pug = require('pug');

// Import glob for file matching.
var glob = require('glob');


// Get the components dir from package config.
var componentsDir = process.env.npm_package_config_componentsDir || 'components';
// Get the styleguide dir from package config.
// TODO: this shouldn't really be optional or implied as optional.
// Components dir sure, but not styleguide dir, cause its pretty tightly coupled.
var styleguideDir = 'styleguide';
// Root dir is always:
var rootDir = process.cwd();

// Set up some paths for the components and styleguide itself.
var styleguidePath = process.cwd() + '/' + styleguideDir + '/';
var componentsPath = process.cwd() + '/src/' + componentsDir;


// Check if we have components dir, if not, exit(?).
if (componentsPath) {
  findComponentFiles(componentsPath);
} else {
  // Throw some kinda error.
  process.exit();
}

// Finds files for components.
// Get all components by reading the file system in componentsDir.
function findComponentFiles(componentsPath) {
  // Do a search in the componentsPath.
  glob(`${componentsPath}/*.html`, {
    nodir: true,
  },
  function(err, files) {
    // If found...
    if (files) {
      var components = files;
      // Build em.
      buildComponents(components);
    }
  });
};

// Builds files for components into HTML.
function buildComponents(components) {  
  var renderResults = '';
  components.forEach(component => {
    // Get the name of the component. TODO: this is sloppy - needs to be something better than a split.
    var fileName = component.split('components/')[1];

    // A component template. //// NB!: The indentation of this template literal is important! 
    var compileSrc = `
.component-example
  h1='${fileName.split('.html')[0]}'
  hr
  .component-wrapper
    include ./src/${componentsDir}/${fileName}
    `;
    // HACK: gotta include filename opt for include in template. Weird.
    // Make a function to call pug compile.
    var render = pug.compile(compileSrc, {'filename':'foo'});
    // So, call render for each component, concat to a string and output that to 'all-components.htm' or a local variable for index.pug to consume.  Good thing w/ the former is that its very explicit.
    
    renderResults+=render();
  });
  
  // Assign locals for rendering index.pug w/ options.
  var locals = {
    allComponents: renderResults,
    commonVariables: {
      title: 'Some Title',
      name: 'Jesse Sutherland',
      firstName: 'Jesse',
      lastName: 'Sutherland',
      imgUrl: 'https://600x400'
    }
  };
  
  // Renders style guide template and variables.
  var html = pug.renderFile(process.cwd() + '/' + styleguideDir + '/src/' + './index.pug', locals);
  
  // Output the HTML rendered from style guide template and variables.
  // TODO this could actually write to a file instead of STDOUT.
  console.log(html);

}
