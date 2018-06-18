 ### Components dir / Components build / Componentification
  - This should be first class supported
  - Its important. This is how we should write a theme in 2018
  - That said, what templating language?
  - This folders *must* support importing and rendering: 
    - HTML *.html
    - Pug files *.pug
    - Riot Tag files *.tag.html
    - Twig *.twig
  - For HTML, there's no includes to worry about so nesting or recursion not a problem.  For Pug it should be easy since the pug file will declare its own includes. Riot needs to be mounted on the client or SSR'd so that *should* be easy too as long as each component gets rendered. Not sure about Twig.
  - package.json needs to include packages for Riot (maybe Riot SSR) as well as Twig.  Riot is no problem, and I think there's Twig compilers.

 ### Add npm_package_config variable for component dir. - should be customizable in case this changes.

 ### Dont need to split styleguide from main package - could do, but I think it should be intrinsic to theme work

 ### Node-sass part of package is good to go, could be shipped by itself, without styleguide right now. But I want to include styleguide with some example components because I think its important!
