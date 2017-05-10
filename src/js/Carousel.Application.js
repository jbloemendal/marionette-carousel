var Carousel = Carousel || {};

(function () {
	'use strict';

	var CarouselApp = Mn.Application.extend({
            setRootLayout: function () {
                this.root = new Carousel.RootLayout();
            }
	});

	// The Application Object is responsible for kicking off
	// a Marionette application when its start function is called
	//
	// This application has a singler root Layout that is attached
	// before it is started.  Other system components can listen
	// for the application start event, and perform initialization
	// on that event
	Carousel.App = new CarouselApp();

	Carousel.App.on('before:start', function () {
            Carousel.App.setRootLayout();
	});

})();
