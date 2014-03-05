module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        ts: {
            // use to override the default options, See: http://gruntjs.com/configuring-tasks#options
            // these are the default options to the typescript compiler for grunt-ts:
            // see `tsc --help` for a list of supported options.
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
            // a particular target
            app: {
                src: ["ts/**/*.ts", "!ts/bootstrap.ts", "!ts/_*/**/*"],          // The source typescript files, http://gruntjs.com/configuring-tasks#files
                reference: 'ts/_references.ts', // If specified, generate this file that you can use for your reference management
                out: '../js/app.js',              // If specified, watches this directory for changes, and re-runs the current target
                // use to override the grunt-ts project options above for this target
                options: {
                    module: 'amd'
                }
            },
            // a particular target
            boot: {
                src: ["ts/bootstrap.ts"],          // The source typescript files, http://gruntjs.com/configuring-tasks#files
                out: '../js/bootstrap.js'              // If specified, watches this directory for changes, and re-runs the current target
            }
        },
        concat: {
            options: {},
            dist: {
                src: [
                    'build/start.js',
                    '../js/app.js',
                    'build/end.js'
                ],
                dest: '../js/App.js'
            }
        },
        uglify: {
            static_mappings: {
                files: [
                    {
                        src: '../js/app.js', dest: '../js/app.min.js'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.registerTask("default", ["ts:boot", "ts:app", "concat"]);
    grunt.registerTask("cleanDev", ["uglify"]);

}