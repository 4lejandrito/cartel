 require.config({

    waitSeconds: 0,

    paths: {
        jquery     : 'http://code.jquery.com/jquery-1.9.1.min',
        jqueryform : 'http://malsup.github.com/jquery.form',
        facebook   : 'http://connect.facebook.net/en_US/all',
        underscore : 'http://underscorejs.org/underscore-min',
        backbone   : 'http://backbonejs.org/backbone-min',
        bootstrap  : 'http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min',
        dropzone   : 'https://raw.github.com/enyo/dropzone/raw/master/downloads/dropzone-amd-module'
    },

    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: { exports: '_' },
        jqueryform: { deps: ['jquery'] },
        bootstrap:  { deps: ['jquery'] }
    }
});

require(['bootstrap'], function() {
    require([
        'jquery',
        'underscore',
        'backbone',
        'jqueryform',
        'facebook'
    ], function($, _, Backbone) {

        var abc = {
            a: [[0,1,0,0],
                [1,0,1],
                [1,0,1],
                [1,0,1],
                [1,1,1],
                [1,0,1],
                [1,0,1]],
            b: [[1,0,0,0],
                [1,0,0],
                [1,0,0],
                [1,1,1],
                [1,0,1],
                [1,0,1],
                [1,1,1]],
            c: [[1,1,1,0],
                [1,0,1],
                [1,0,0],
                [1,0,0],
                [1,0,0],
                [1,0,1],
                [1,1,1]]
        }, letters = [abc.a, abc.b, abc.b, abc.c];

        /************************************
         *  Views
        *************************************/

        var ViewLed = Backbone.View.extend({

            className: 'led span1',

            initialize: function() {
            },

            render: function() {
                var self = this;
                this.$el.html(_.template($('.tpl-led').html(), {status: true}));
                return this;
            },

            on: function() {
                this.$el.addClass('on');
            },

            off: function() {
                this.$el.removeClass('on');
            },

            light: function(status) {
                status ? this.on() : this.off();
            }
        });

        var ViewMatrix = Backbone.View.extend({

            el: $('.well'),

            col: 0,

            leds: [],

            incCol: function(n) {
                this.col = (this.col + n) % this.options.cols;
            },

            initialize: function() {
                for( var i = 0; i < this.options.rows; i++) {
                    this.leds.push([]);
                    for( var j = 0; j < this.options.cols; j++) {
                        this.leds[i].push(new ViewLed());
                    }
                }
            },

            render: function() {
                this.$el.empty().addClass('row-fluid');
                for( var i = 0; i < this.leds.length; i++) {
                    var row = $('<div>');
                    for( var j = 0; j < this.leds[i].length; j++) {
                        row.append(this.leds[i][j].render().$el.css({
                            'width': (100 / this.options.cols) + '%',
                            'margin-left': 0
                        }));
                    }
                    this.$el.append(row);
                }
            },


            off: function() {
                for( var i = 0; i < this.leds.length; i++) {
                    for( var j = 0; j < this.leds[i].length; j++) {
                        this.leds[i][j].off();
                    }
                }
            },

            print: function(letters) {
                this.off();
                for( var l = 0; l < letters.length; l++) {
                    var letter = letters[l];
                    for( var i = 0; i < this.leds.length; i++) {
                        for( var j = 0; j < letter[0].length; j++) {
                            //console.log('i: ' + i + ', j: ' + ((this.col + j) % this.options.cols));
                            this.leds[i][(this.col + j + l * letter[0].length) % this.options.cols].light(letter[i][j]);
                        }
                    }
                }
            }
        });

        var ViewPage = Backbone.View.extend({

            el: $('body'),

            events: {
                'click #start': 'start',
                'click #stop': 'stop'
            },

            initialize: function() {
                this.matrix = new ViewMatrix({rows: 7, cols: 50});
                this.matrix.render();
            },

            start: function() {
                if (this.interval) return;
                var self = this;
                this.interval = setInterval(function() {
                    self.matrix.print(letters);
                    self.matrix.incCol(1);
                }, 100);
            },

            stop: function(letters) {
                clearInterval(this.interval);
                delete this.interval;
            }
        });

        /************************************
         *  APP
        *************************************/
        new ViewPage().start();

     });
});