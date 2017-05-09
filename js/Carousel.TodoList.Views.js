/*global TodoMVC: true, Backbone */

var Carousel = Carousel || {};

(function () {
    'use strict';

    // Todo List Item View
    // -------------------
    //
    // Display an individual todo item, and respond to changes
    // that are made to the item, including marking completed.
    Carousel.TodoView = Mn.View.extend({

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
    Carousel.ListViewBody = Mn.CollectionView.extend({
        tagName: 'ul',

        id: 'todo-list',

        childView: Carousel.TodoView,
        
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
    Carousel.ListView = Mn.View.extend({

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
            this.listViewBody.left();
        },
        
        rotateRight: function() {
            this.listViewBody.right();
        },

        initialize: function () {
            console.log('initialize');
        },

        onRender: function () {
            this.listViewBody = new Carousel.ListViewBody({
                collection: this.collection
            });
            this.showChildView('listBody', this.listViewBody);
        }
    });
})();
