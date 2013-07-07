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
        'backbone'
    ], function($, _, Backbone) {

        var alphabet = {
            width: 6,
            height: 8
        };

        alphabet[' '] = '000000000000000000000000000000000000000000000000';
        alphabet['!'] = '000100001110001110000100000100000000000100000000';
        alphabet['"'] = '011011011011010010000000000000000000000000000000';
        alphabet['#'] = '000000001010011111001010001010011111001010000000';
        alphabet['$'] = '001000001110010000001100000010011100000100000000';
        alphabet['%'] = '011001011001000010000100001000010011010011000000';
        alphabet['&'] = '001000010100010100001000010101010010001101000000';
        alphabet["'"] = '001100001100001000000000000000000000000000000000';
        alphabet['('] = '000100001000001000001000001000001000000100000000';
        alphabet[')'] = '001000000100000100000100000100000100001000000000';
        alphabet['*'] = '000000001010001110011111001110001010000000000000';
        alphabet['+'] = '000000000100000100011111000100000100000000000000';
        alphabet[','] = '000000000000000000000000000000001100001100001000';
        alphabet['-'] = '000000000000000000011111000000000000000000000000';
        alphabet['.'] = '000000000000000000000000000000001100001100000000';
        alphabet['/'] = '000000000001000010000100001000010000000000000000';
        alphabet['0'] = '001110010001010011010101011001010001001110000000';
        alphabet['1'] = '000100001100000100000100000100000100001110000000';
        alphabet['2'] = '001110010001000001000110001000010000011111000000';
        alphabet['3'] = '001110010001000001001110000001010001001110000000';
        alphabet['4'] = '000010000110001010010010011111000010000010000000';
        alphabet['5'] = '011111010000010000011110000001010001001110000000';
        alphabet['6'] = '000110001000010000011110010001010001001110000000';
        alphabet['7'] = '011111000001000010000100001000001000001000000000';
        alphabet['8'] = '001110010001010001001110010001010001001110000000';
        alphabet['9'] = '001110010001010001001111000001000010001100000000';
        alphabet[':'] = '000000000000001100001100000000001100001100000000';
        alphabet[';'] = '000000000000001100001100000000001100001100001000';
        alphabet['<'] = '000010000100001000010000001000000100000010000000';
        alphabet['='] = '000000000000011111000000000000011111000000000000';
        alphabet['>'] = '001000000100000010000001000010000100001000000000';
        alphabet['?'] = '001110010001000001000110000100000000000100000000';
        alphabet['@'] = '001110010001010111010101010111010000001110000000';
        alphabet['A'] = '001110010001010001010001011111010001010001000000';
        alphabet['B'] = '011110010001010001011110010001010001011110000000';
        alphabet['C'] = '001110010001010000010000010000010001001110000000';
        alphabet['D'] = '011110010001010001010001010001010001011110000000';
        alphabet['E'] = '011111010000010000011110010000010000011111000000';
        alphabet['F'] = '011111010000010000011110010000010000010000000000';
        alphabet['G'] = '001110010001010000010111010001010001001111000000';
        alphabet['H'] = '010001010001010001011111010001010001010001000000';
        alphabet['I'] = '001110000100000100000100000100000100001110000000';
        alphabet['J'] = '000001000001000001000001010001010001001110000000';
        alphabet['K'] = '010001010010010100011000010100010010010001000000';
        alphabet['L'] = '010000010000010000010000010000010000011111000000';
        alphabet['M'] = '010001011011010101010001010001010001010001000000';
        alphabet['N'] = '010001011001010101010011010001010001010001000000';
        alphabet['O'] = '001110010001010001010001010001010001001110000000';
        alphabet['P'] = '011110010001010001011110010000010000010000000000';
        alphabet['Q'] = '001110010001010001010001010101010010001101000000';
        alphabet['R'] = '011110010001010001011110010010010001010001000000';
        alphabet['S'] = '001110010001010000001110000001010001001110000000';
        alphabet['T'] = '011111000100000100000100000100000100000100000000';
        alphabet['U'] = '010001010001010001010001010001010001001110000000';
        alphabet['V'] = '010001010001010001010001010001001010000100000000';
        alphabet['W'] = '010001010001010101010101010101010101001010000000';
        alphabet['X'] = '010001010001001010000100001010010001010001000000';
        alphabet['Y'] = '010001010001010001001010000100000100000100000000';
        alphabet['Z'] = '011110000010000100001000010000010000011110000000';
        alphabet['['] = '001110001000001000001000001000001000001110000000';
        alphabet['\\'] = '000000010000001000000100000010000001000000000000';
        alphabet[']'] = '001110000010000010000010000010000010001110000000';
        alphabet['^'] = '000100001010010001000000000000000000000000000000';
        alphabet['_'] = '000000000000000000000000000000000000000000111111';
        alphabet['`'] = '001100001100000100000000000000000000000000000000';
        alphabet['a'] = '000000000000001110000001001111010001001111000000';
        alphabet['b'] = '010000010000011110010001010001010001011110000000';
        alphabet['c'] = '000000000000001110010001010000010001001110000000';
        alphabet['d'] = '000001000001001111010001010001010001001111000000';
        alphabet['e'] = '000000000000001110010001011110010000001110000000';
        alphabet['f'] = '000110001000001000011110001000001000001000000000';
        alphabet['g'] = '000000000000001111010001010001001111000001001110';
        alphabet['h'] = '010000010000011100010010010010010010010010000000';
        alphabet['i'] = '000100000000000100000100000100000100000110000000';
        alphabet['j'] = '000010000000000110000010000010000010010010001100';
        alphabet['k'] = '010000010000010010010100011000010100010010000000';
        alphabet['l'] = '000100000100000100000100000100000100000110000000';
        alphabet['m'] = '000000000000011010010101010101010001010001000000';
        alphabet['n'] = '000000000000011100010010010010010010010010000000';
        alphabet['o'] = '000000000000001110010001010001010001001110000000';
        alphabet['p'] = '000000000000011110010001010001010001011110010000';
        alphabet['q'] = '000000000000001111010001010001010001001111000001';
        alphabet['r'] = '000000000000010110001001001000001000011100000000';
        alphabet['s'] = '000000000000001110010000001110000001001110000000';
        alphabet['t'] = '000000001000011110001000001000001010000100000000';
        alphabet['u'] = '000000000000010010010010010010010110001010000000';
        alphabet['v'] = '000000000000010001010001010001001010000100000000';
        alphabet['w'] = '000000000000010001010001010101011111001010000000';
        alphabet['x'] = '000000000000010010010010001100010010010010000000';
        alphabet['y'] = '000000000000010010010010010010001110000100011000';
        alphabet['z'] = '000000000000011110000010001100010000011110000000';
        alphabet['{'] = '000110001000001000011000001000001000000110000000';
        alphabet['|'] = '000100000100000100000000000100000100000100000000';
        alphabet['}'] = '001100000010000010000011000010000010001100000000';
        alphabet['~'] = '001010010100000000000000000000000000000000000000';

        /************************************
         *  Views
        *************************************/

        var ViewLed = Backbone.View.extend({

            className: 'led',

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
                this.$el.empty();
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

            print: function(text) {
                letters = [];
                for( var i = 0; i < text.length; i++)
                    letters.push(alphabet[text.charAt(i)]);
                this.off();
                for( var l = 0; l < letters.length; l++) {
                    var letter = letters[l];
                    for( var i = 0; i < alphabet.height; i++) {
                        for( var j = 0; j < alphabet.width; j++) {
                            this.leds[i][(this.col + j + l * alphabet.width) % this.options.cols].light(letter.charAt(alphabet.width*i+j) == '1');
                        }
                    }
                }
            }
        });

        var ViewPage = Backbone.View.extend({

            el: $('body'),

            events: {
                'click #start'  : 'start',
                'click #stop'   : 'stop',
                'keyup #letters': 'letters'
            },

            initialize: function() {
                this.matrix = new ViewMatrix({rows: alphabet.height, cols: 50});
                this.matrix.render();
            },

            start: function() {
                if (this.interval) return;
                var self = this;
                this.interval = setInterval(function() {
                    self.letters();
                    self.matrix.incCol(1);
                }, 200);
            },

            stop: function(letters) {
                clearInterval(this.interval);
                delete this.interval;
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