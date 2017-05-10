var Carousel = Carousel || {};

$(function () {
    'use strict';

    // After we initialize the app, we want to kick off the router
    // and controller, which will handle initializing our Views
    Carousel.App.on('start', function () {
        var controller = new Carousel.Controller();
        controller.router = new Carousel.Router({
            controller: controller
        });

        controller.start();
        Backbone.history.start();
    });

    // start the TodoMVC app (defined in js/TodoMVC.js)
    Carousel.App.start();
});
