var Carousel = Carousel || {};

(function () {
	'use strict';

	
	Carousel.Item = Backbone.Model.extend({
            defaults: {
                title: '',
                images: [],
                randomImage: '',
                visible: false
            },

            initialize: function () {

            },

            isVisible: function() {
                return this.get('visible');
            }

	});

	
	Carousel.Collection = Backbone.Collection.extend({
            model: Carousel.Item,

            url: 'data/carousel.json',

            parse: function(response) {
                var json = [];

                try {
                    json = JSON.parse(response);

                    for (var i=0, l=json.length; i<l; i++) {
                        var images = json[i].images;
                        var randomIndex = Math.floor(Math.random() * Math.floor(images.length));
                        json[i].randomImage = images[randomIndex];
                        json[i].visible = (i < 4);
                    }
                } catch (e) {
                    console.log("Error parsing carousel data.");
                    console.error(e);
                }
                
                return json;
            }

	});
})();
