/*global Backbone, TodoMVC:true */

var TodoMVC = TodoMVC || {};

(function () {
	'use strict';

	// Todo Model
	// ----------
	TodoMVC.Todo = Backbone.Model.extend({
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

	// Todo Collection
	// ---------------
	TodoMVC.TodoList = Backbone.Collection.extend({
            model: TodoMVC.Todo,

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
                    console.log(e);
                }
                console.log(json);
                return json;
            }

	});
})();
