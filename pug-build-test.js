// Import pug.
var pug = require('pug');

// Import glob for file matching.
var glob = require('glob');

// TODO: wanna include all partials/components, render them with a template
// then compile to an 'all-components.html' 'master' component to include.

// Get all components by reading the file system in styleguide/components.

// Make a function to call pug compile.
// HACK: gotta include filename opt for include in template. Weird.

var components = [];

glob('./styleguide/components/*.html', {
  nodir: true,
},
function(err, files) {
  if (files) {
    components = files;
    buildComponents(components);
  }
});


function buildComponents(components) {  
  var renderResults = '';
  components.forEach(component => {
    
    // A component template.
    var fileName = component.split('components/')[1];
    
    var compileSrc = `
.component-example
  h1='${fileName.split('.html')[0]}'
  hr
  .component-wrapper
    include styleguide/components/${fileName}
  `;
    var render = pug.compile(compileSrc, {'filename':'foo'});
    // So, call render for each component, concat to a string and output that to 'all-components.htm' or a local variable for index.pug to consume.  Good thing w/ the former is that its very explicit.
    
    renderResults+=render();
  });
  // console.log(renderResults)
  // process.exit();
  
  
  
  // Test it.
  // console.log(renderResults);
  // Test it w/ rendering index.pug w/ options.
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
  var html = pug.renderFile('./styleguide/index.pug', locals);
  
  // Output the HTML rendered from style guide template and variables.
  console.log(html);

}
