/*global TodoMVC:true, Backbone */

var TodoMVC = TodoMVC || {};

(function () {
	'use strict';

	var filterChannel = Backbone.Radio.channel('filter');

	TodoMVC.RootLayout = Mn.View.extend({

            el: '#todoapp',

            regions: {
                main: '#main'
            }
	});

	
})();
