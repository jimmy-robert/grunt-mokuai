/*
 * grunt-mokuai
 * https://github.com/jimrobs/grunt-mokuai
 *
 * Copyright (c) 2015 jimrobs
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: true
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: 'test/tmp'
        },

        // Configuration to be run (and then tested).
        mokuai: {
            simple: {
                files: {
                    'test/tmp/simple.js': [
                        'test/fixtures/modules/window.js',
                        'test/fixtures/modules/Horse.js',
                        'test/fixtures/modules/Animal.js',
                        'test/fixtures/modules/Snake.js'
                    ]
                },
                options: {
                    prepend: 'test/fixtures/prepend/window.js',
                    append: [
                        'test/fixtures/append/instances.js',
                        'test/fixtures/append/move.js'
                    ]
                }
            },
            'simple.autoexports': {
                files: {
                    'test/tmp/simple.autoexports.js': [
                        'test/fixtures/modules/autoexports/window.js',
                        'test/fixtures/modules/autoexports/Horse.js',
                        'test/fixtures/modules/autoexports/Animal.js',
                        'test/fixtures/modules/autoexports/Snake.js'
                    ]
                },
                options: {
                    prepend: [ 'test/fixtures/prepend/window.js' ],
                    append: [
                        'test/fixtures/append/instances.js',
                        'test/fixtures/append/move.js'
                    ],
                    autoexports: true,
                    exports: true
                }
            },
            'custom': {
                dest: 'test/tmp/custom.js',
                src: [
                    'test/fixtures/modules/Horse.js',
                    'test/fixtures/modules/Animal.js',
                    'test/fixtures/modules/Snake.js'
                ],
                options: {
                    exports: true,
                    name: function(filepath, filename){
                        switch(filename){
                            case 'Horse': return 'JollyJumper';
                            case 'Snake': return 'Kaa';
                            default: return filename;
                        }
                    }
                }
            },
            'custom.jollyjumper': {
                dest: 'test/tmp/custom.jollyjumper.js',
                src: [
                    'test/fixtures/modules/Horse.js',
                    'test/fixtures/modules/Animal.js'
                ],
                options: {
                    exports: 'JollyJumper',
                    name: function(filepath, filename){
                        switch(filename){
                            case 'Horse': return 'JollyJumper';
                            default: return filename;
                        }
                    }
                }
            },
            'custom.besthorse': {
                dest: 'test/tmp/custom.besthorse.js',
                src: [
                    'test/fixtures/modules/Horse.js',
                    'test/fixtures/modules/Animal.js'
                ],
                options: {
                    exports: 'JollyJumper',
                    exportsname: 'BestHorseEver',
                    name: function(filepath, filename){
                        switch(filename){
                            case 'Horse': return 'JollyJumper';
                            default: return filename;
                        }
                    }
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: [
                'test/*.test.js'
            ]
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', [
        'clean',
        'mokuai',
        'nodeunit',
        'clean'
    ]);

};
