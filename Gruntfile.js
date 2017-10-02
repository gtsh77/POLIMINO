module.exports = function (grunt) {
    grunt.initConfig({
            watch: {
                appFrontWatch: {
                    files: ['app/templates/css/**/*.scss'],
                    tasks: ['compass:appFront']
                }
            },
            compass: {
                appFront: {
                    options: {
                        sassDir: 'app/templates/css',
                        cssDir: 'app/templates/css',
                        outputStyle: 'compact'
                    }
                },
                appFrontProd: {
                    options: {
                        sassDir: 'app/templates/css',
                        cssDir: 'app/templates/css',
                        outputStyle: 'compressed'
                    }
                }
            },            
            // closureCompiler: {
            //   options: {
            //     compilerFile: 'compiler.jar',
            //     checkModified: false,
            //     compilerOpts: {
            //        compilation_level: 'SIMPLE_OPTIMIZATIONS',
            //        language_in: 'ECMASCRIPT6',
            //        // ,formatting: 'PRETTY_PRINT'
            //        //externs: ['path/to/file.js', '/source/**/*.js'],
            //        //define: ["'goog.DEBUG=false'"],
            //        warning_level: 'quiet'
            //        //jscomp_off: ['checkTypes', 'fileoverviewTags'],
            //        //summary_detail_level: 3,
            //        //output_wrapper: '"(function(){%output%}).call(this);"'
            //     },
            //     execOpts: {
            //        maxBuffer: 1024 * 1024
            //     },
            //   },
            //   app: {
            //     TEMPcompilerOpts: {
            //     },
            //     src: 'app/_uncompressed_app.js',
            //     dest: 'app/app.min.js'
            //   }
            // },
            // import: {
            //     options: {},
            //     connectFrontJs: {
            //       src: 'app/lib.config.js',
            //       dest: 'app/_uncompressed_app.js'
            //     }
            // },
            // ts: {
            //   base: {
            //     options: {
            //       module: 'system', 
            //       moduleResolution: 'node',
            //       target: 'es2015',
            //       experimentalDecorators: true,
            //       emitDecoratorMetadata: true,
            //       noImplicitAny: false
            //     },
            //     src: ['typings/**/*.ts',
            //           'app/**/*.ts']
            //   }
            // }, 
            // systemjs: {
            //   options: {
            //           sfx: true,
            //           baseURL: "",
            //           configFile: "systemjs.config.js",
            //         minify: false,
            //           build: {
            //             mangle: false
            //           }
            //       },
            //       dist: {
            //           files: [{
            //               "src":  "app",
            //               "dest": "app/_angular.tmp.js"
            //           }]
            //       }
            //   },
              // copy: {
              //   prod: {
              //     src: './index_prod.html',
              //     dest: './index.html',
              //   },
              //   dev: {
              //     src: './index_dev.html',
              //     dest: './index.html',
              //   }
              // },
              // teamcity: {
              //   options: {
              //     // Task-specific options go here. 
              //   },
              //   all: {}
              // },
              // 'string-replace': {
              //   appTemplates: {
              //     files: [
              //       {
              //         expand: true,
              //         cwd: 'app/templates',
              //         src: 'src/*.tpl', 
              //         dest: '',
              //         rename: function(dest,src){
              //           return src.replace(/src\//g,'app/templates/');
              //         }
              //       },
              //     ],
              //     options: {
              //       replacements: [
              //         {
              //           pattern: /\s{2,}/g,
              //           replacement: ''
              //         }
              //       ]
              //     }
              //   }
              // }                                                              
            }
    );
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
   // grunt.loadNpmTasks('grunt-string-replace');
    //grunt.loadNpmTasks('grunt-closure-tools');   
    //grunt.loadNpmTasks('grunt-import');
    //grunt.loadNpmTasks("grunt-ts");
    //grunt.loadNpmTasks("grunt-systemjs-builder");
    //grunt.loadNpmTasks('grunt-contrib-copy');
    //grunt.loadNpmTasks('grunt-teamcity');
    //grunt.registerTask('dev', [ 'copy:dev', 'compass:appFront', 'string-replace:appTemplates']);
    //grunt.registerTask('build', [ 'teamcity', 'ts:base', 'compass:appFrontProd', 'string-replace:appTemplates' ,'copy:prod', 'systemjs', 'import', 'closureCompiler:app']);
    //grunt.registerTask('production', [ 'import', 'compass:connectFrontProd', 'string-replace:one', 'closureCompiler:connect']);
};