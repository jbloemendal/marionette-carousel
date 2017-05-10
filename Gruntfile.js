module.exports = function(grunt) {

grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
        files: ['Gruntfile.js', 'src/js/**/*.js'],
        options: {
            globals: {
              jQuery: true
            }
        }
    },
    uglify: {
        my_target: {
            files: {
                'dist/marionette-carousel.min.js': [
                    'src/js/Carousel.Application.js',
                    'src/js/Carousel.Model.js',
                    'src/js/Carousel.Layout.js',
                    'src/js/Carousel.Views.js',
                    'src/js/Carousel.Router.js',
                    'src/js/Carousel.js'
                ]
            }
        }
    },
    watch: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
    }
});


grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.registerTask('default', ['jshint', 'uglify']);

};