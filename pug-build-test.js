// Import pug.
var pug = require('pug');

// Thing to compile. For now a string.
var compileSrc = 'h1 pug!';

var fileName = 'standard-block';

// A component template.
var compileSrc = `
.component-example
  h1='${fileName}'
  hr
  .component-wrapper
    include styleguide/components/${fileName+ '.html'}
  `;


// TODO: wanna include all partials/components, render them with a template
// then compile to an 'all-components.html' 'master' component to include.

// Get all 
var components = [];

// Make a function to call pug compile.
// HACK: gotta include filename opt for include in template. Weird.
var render = pug.compile(compileSrc, {'filename':'foo'});

// So, call render for each component, concat to a string and output that to 'all-components.htm' or a local variable for index.pug to consume.  Good thing w/ the former is that its very explicit.

var renderResults = render();
// Test it.
// console.log(renderResults);
// Test it w/ rendering index.pug w/ options.
var locals = {
  allComponents: renderResults,
  name: 'jesse'
};

// console.log(locals.allComponents);
// This should work, but it seems like allComponents is getting rendered twice!?
var html = pug.renderFile('./styleguide/index.pug',locals);
console.log(html);
