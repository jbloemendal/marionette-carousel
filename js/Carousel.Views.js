var Carousel = Carousel || {};

(function () {
    'use strict';


    Carousel.ItemView = Mn.View.extend({

        tagName: 'li',

        template: '#template-carouselItemView',

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

    
    Carousel.ListViewBody = Mn.CollectionView.extend({
        tagName: 'ul',

        id: 'carousel-list',

        childView: Carousel.ItemView,
        
        index: 0,
        size: 4,
        
        filter: function (child, i) {
            return  i >= this.index && i < this.index + this.size;
        },
        
        left: function() {
            var self = this;
            if (this.index > 0) {
                this.index--;
                
                var fade = new $.Deferred();
                var move = new $.Deferred();
                
                $('#carousel-list li:last').fadeOut('slow', function() {
                    fade.resolve();
                });
                $('#carousel-list li').animate({left: "150px"}, 500, 'swing', function() {
                    move.resolve();   
                });
                $.when(fade, move).then(function() {
                    self.render();
                });
            }
        },
        
        right: function() {
            var self = this;
            if (this.index + this.size < this.collection.length) {
                this.index++;
                
                var fade = new $.Deferred();
                var move = new $.Deferred();
                
                
                $('#carousel-list li:first').fadeOut('slow', function() {
                   fade.resolve();
                });
                $('#carousel-list li').animate({left: "-150px"}, 500, 'swing', function() {
                    move.resolve();    
                });
                $.when(fade, move).then(function() {
                   self.render(); 
                });
            }
        },
        
        setSize: function(size) {
            this.size = size;
        }

    });

   
    Carousel.ListView = Mn.View.extend({

        template: '#template-carouselListView',

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
            'click @ui.right': 'rotateRight',
            'keydown @ui.carousel': 'onEditKeypress'
        },

        rotateLeft: function() {
            this.listViewBody.left();
        },
        
        rotateRight: function() {
            this.listViewBody.right();
        },
        
        onKeyup: function (e) {
            var LEFT_KEY = 37;
            var RIGHT_KEY = 39;

            if (e.which === LEFT_KEY) {
                this.listViewBody.left();
            } else if (e.which === RIGHT_KEY) {
                this.listViewBody.right();
            }
        },

        initialize: function () {
            console.log('initialize');
            var self = this;
            $(document).on('keyup', function() {
                self.onKeyup.apply(self, arguments);
            });
        },

        onRender: function () {
            this.listViewBody = new Carousel.ListViewBody({
                collection: this.collection
            });
            this.showChildView('listBody', this.listViewBody);
        }
        
    });
})();
