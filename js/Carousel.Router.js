/*global TodoMVC:true, Backbone, $ */

var TodoMVC = TodoMVC || {};

(function () {
	'use strict';

	// TodoList Router
	// ---------------
	//
	// Handles a single dynamic route to show
	// the active vs complete todo items
	TodoMVC.Router = Mn.AppRouter.extend({
            appRoutes: {
                // '*filter': 'filterItems'
            }
	});

	// TodoList Controller (Mediator)
	// ------------------------------
	//
	// Control the workflow and logic that exists at the application
	// level, above the implementation detail of views and models
	TodoMVC.Controller = Mn.Object.extend({

            initialize: function () {
                this.todoList = new TodoMVC.TodoList();
            },

            // Start the app by showing the appropriate views
            // and fetching the list of todo items, if there are any
            start: function () {
                this.showTodoList(this.todoList);
                this.todoList.on('all', this.updateHiddenElements, this);
                this.todoList.fetch({
                    dataType: 'text',
                    success: function() {
                      console.log('success');
                    },
                    error: function(){
                      console.error("Oh noes! Something went wrong!");
                    }
                });
            },

            updateHiddenElements: function () {
                $('#main, #footer').toggle(!!this.todoList.length);
            },

            showTodoList: function (todoList) {
                TodoMVC.App.root.showChildView('main', new TodoMVC.ListView({
                    collection: todoList
                }));
            }

	});
})();
