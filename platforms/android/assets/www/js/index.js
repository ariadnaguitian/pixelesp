// http://packery.metafizzy.co/packery.pkgd.js added as external resource

docReady( function() {
  var container = document.querySelector('.packery');
  var pckry = new Packery( container );
  
  eventie.bind( container, 'click', function( event ) {
    // don't proceed if item content was not clicked on
    var target = event.target;
    if ( !classie.has( target, 'itemp-content' )  ) {
      return;
    }
    var itemElem = target.parentNode;
    var isExpanded = classie.has( itemElem, 'is-expanded' );
    classie.toggleClass( itemElem, 'is-expanded' );
  
    if ( isExpanded ) {
      // if shrinking, just layout
      pckry.layout();
    } else {
      // if expanding, fit it
      pckry.fit( itemElem );
    }
  });
});