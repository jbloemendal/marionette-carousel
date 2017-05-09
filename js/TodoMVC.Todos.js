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
//                    if (this.isNew()) {
//                        this.set('created', Date.now());
//                    }
		},
                
                isVisible: function() {
                    console.log('isVisible');
                    console.log(this.get('visible'));
                    return this.get('visible');
                }
                
//		toggle: function () {
//                    return this.set('completed', !this.isCompleted());
//		},
//
//		isCompleted: function () {
//                    return this.get('completed');
//		}

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
                
		// comparator: 'created',
//
//		getCompleted: function () {
//                    return this.filter(this._isCompleted);
//		},
//
//		getActive: function () {
//                    return this.reject(this._isCompleted);
//		},
//
//		_isCompleted: function (todo) {
//                    return todo.isCompleted();
//		}
	});
})();
