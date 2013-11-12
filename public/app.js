 require.config({

    waitSeconds: 0,

    paths: {
        jquery     : 'http://code.jquery.com/jquery-1.9.1.min',
        underscore : 'http://underscorejs.org/underscore-min',
        backbone   : 'http://backbonejs.org/backbone-min',
        bootstrap  : 'http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min'
    },

    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: { exports: '_' },
        bootstrap:  { deps: ['jquery'] }
    }
});

require(['bootstrap'], function() {
    require([
        'jquery',
        'underscore',
        'backbone',
        'cartel'
    ], function($, _, Backbone, Cartel) {               

        var ViewPage = Backbone.View.extend({

            el: $('body'),

            events: {
                'click #start'  : 'start',
                'click #stop'   : 'stop',
                'keyup #letters': 'letters'
            },

            initialize: function() {
                this.matrix = new Cartel({el: this.$('#cartel'), cols: 50});
                this.matrix.render();                                
            },

            start: function() {      
                this.letters();          
                this.matrix.start();
            },

            stop: function() {
                this.matrix.stop();
            },

            letters: function() {
                this.matrix.print(this.$('#letters').val());
            }
        });

        /************************************
         *  APP
        *************************************/
        new ViewPage().start();

     });
});