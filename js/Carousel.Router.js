var Carousel = Carousel || {};

(function () {
	'use strict';

	
	Carousel.Router = Mn.AppRouter.extend({
            appRoutes: {
                // '*filter': 'filterItems'
            }
	});

	
	Carousel.Controller = Mn.Object.extend({

            initialize: function () {
                this.carouselCollection = new Carousel.Collection();
            },
            
            start: function () {
                this.showCarousel(this.carousel);
                this.carouselCollection.on('all', this.updateHiddenElements, this);
                this.carouselCollection.fetch({
                    dataType: 'text',
                    success: function() {
                        console.log('success fetching data');
                    },
                    error: function(){
                        console.log("error fetching data");
                        console.error(arguments);
                    }
                });
            },

            showCarousel: function (carousel) {
                Carousel.App.root.showChildView('main', new Carousel.ListView({
                    collection: this.carouselCollection
                }));
            }

	});
})();
