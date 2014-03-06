module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {

            options: {
                compile: true,                 // perform compilation. [true (default) | false]
                comments: false,               // same as !removeComments. [true | false (default)]
                target: 'es3',                 // target javascript language. [es3 (default) | es5]
                module: 'amd',                 // target javascript module style. [amd (default) | commonjs]
                sourceMap: true,               // generate a source map for every output js file. [true (default) | false]
                sourceRoot: '',                // where to locate TypeScript files. [(default) '' == source ts location]
                mapRoot: '',                   // where to locate .map.js files. [(default) '' == generated js location.]
                declaration: false             // generate a declaration .d.ts file for every output js file. [true | false (default)]
            },

            // compile all typescript files
            app: {
                src: ["ts/**/*.ts", "!ts/bootstrap.ts", "!ts/_*/**/*"],
                reference: 'ts/_references.ts',
                out: '../js/app.js'
            },

            // An extra task for the bootstrap file (requirejs config) because it won't change much
            boot: {
                src: ["ts/bootstrap.ts"],
                out: '../js/bootstrap.js'
            }

        },

        // wrap app to use it as an AMD module with requirejs
        concat: {
            options: {},
            dist: {
                src: [
                    'build/start.js',
                    '../js/app.js',
                    'build/end.js'
                ],
                dest: '../js/app.js'
            }
        },

        sass: {
            dist: {
                files: {
                    '../css/default.css': 'css/default.scss'
                }
            }
        },

        // minimize task
        uglify: {
            app: {
                files: [
                    {
                        expand: true,
                        cwd: "../js",
                        src: ["*.js", "!*.min.js"],
                        dest: "../js",
                        ext: ".min.js"
                    }
                ]
            },
            lib: {
                files: [
                    {
                        expand: true,
                        cwd: 'lib/',
                        src: '**/*.js',
                        dest: '../js/lib',
                        flatten: true // see http://gruntjs.com/api/grunt.file#grunt.file.expandmapping
                    }
                ]
            }

        },

        cssmin: {
            minify: {
                expand: true,
                cwd: '../css',
                src: ['*.css', '!*.min.css'],
                dest: '../css',
                ext: '.min.css'
            }
        }
        //,
        // use grunt watch if your IDE or Editor has no support for watching for changes
        // watch: {
        //    ts: {
        //        files: ["ts/**/*.ts", "!ts/_references.ts"],
        //        tasks: ["ts:boot", "ts:app", "concat", "uglifyJs"]
        //
        //    },
        //    lib: {
        //        files: ["lib/**/*.js"],
        //        tasks: ["uglifyJs:lib"]
        //
        //    },
        //    sass: {
        //        files: ["css/**/*.{scss,sass}"],
        //        tasks: ["sass:dist"]
        //    }
        //    ...
        // }

    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");

    grunt.registerTask("compileApp", ["ts:boot", "ts:app", "concat"]);

    grunt.registerTask("compileCss", ["sass:dist", "cssmin:minify"]);

    grunt.registerTask("uglifyJs", ["uglify:lib", "uglify:app"]);


    //grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.registerTask("watch", [... , "watch"]);

}