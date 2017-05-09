/*global TodoMVC: true, Backbone */

var TodoMVC = TodoMVC || {};

(function () {
    'use strict';

    var filterChannel = Backbone.Radio.channel('filter');

    // Todo List Item View
    // -------------------
    //
    // Display an individual todo item, and respond to changes
    // that are made to the item, including marking completed.
    TodoMVC.TodoView = Mn.View.extend({

        tagName: 'li',

        template: '#template-todoItemView',

        onEditFocusout: function () {
            var todoText = this.ui.edit.val().trim();
            if (todoText) {
                this.model.set('title', todoText).save();
                this.$el.removeClass('editing');
            } else {
                this.destroy();
            }
        }
        
    });

    // Item List View Body
    // --------------
    //
    // Controls the rendering of the list of items, including the
    // filtering of items for display.
    TodoMVC.ListViewBody = Mn.CollectionView.extend({
        tagName: 'ul',

        id: 'todo-list',

        childView: TodoMVC.TodoView,
        
        index: 0,
        size: 4,
        
        filter: function (child, i) {
            return  i >= this.index && i < this.index + this.size;
        },
        
        left: function() {
            if (this.index > 0) {
                console.log('left');
                this.index--;
                this.render();
            }
        },
        
        right: function() {
            if (this.index + this.size < this.collection.length) {
                console.log('right');
                this.index++;
                this.render();
            }
        },
        
        setSize: function(size) {
            this.size = size;
        }

    });

    // Item List View
    // --------------
    //
    // Manages List View
    TodoMVC.ListView = Mn.View.extend({

        template: '#template-todoListView',

        regions: {
            listBody: {
                el: 'ul',
                replaceElement: true
            }
        },

        ui: {
            left: '#rotateLeft',
            right: '#rotateRight'
        },

        events: {
            'click @ui.left': 'rotateLeft',
            'click @ui.right': 'rotateRight'
        },

        rotateLeft: function() {
            console.log('rotateLeft');
            this.listViewBody.left();
        },
        
        rotateRight: function() {
            console.log('rotateRight');
            this.listViewBody.right();
        },

        initialize: function () {
            // this.listenTo(filterChannel.request('filterState'), 'change:filter', this.render, this);
            console.log('initialize');
        },

        onRender: function () {
            this.listViewBody = new TodoMVC.ListViewBody({
                collection: this.collection
            });
            this.showChildView('listBody', this.listViewBody);
        }
    });
})();
