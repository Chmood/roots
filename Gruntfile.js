'use strict';
module.exports = function(grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    // Project settings
    yeoman: {
      // Configurable paths
      app: '.',
      dist: '../roots-distrib'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'assets/js/{,*/}*.js',
        '!assets/js/scripts.min.js'
      ]
    },
    less: {
      watch: {
        files: {
          'assets/css/main.min.css': [
            'assets/less/app.less'
          ]
        },
        options: {
          compress: true,
          // LESS source map
          // To enable, set sourceMap to true and update sourceMapRootpath based on your install
          sourceMap: false,
          sourceMapFilename: 'assets/css/main.min.css.map',
          sourceMapRootpath: '/app/themes/roots/'
        }
      }
    },
    compass: {
      options: {
        sassDir: 'assets/sass',
        cssDir: '.tmp/assets/css',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: 'assets/img',
        javascriptsDir: 'assets/js',
        fontsDir: 'assets/fonts',
        importPath: 'bower_components',
        httpImagesPath: 'assets/img',
        httpGeneratedImagesPath: 'assets/img/generated',
        httpFontsPath: 'assets/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        debugInfo: true
      },
      watch: {
        options: {
          generatedImagesDir: 'assets/img/generated'
        }
      }
    },
    cssmin: {
      options: {
        report: 'min'
      },
      watch: {
        files: {
          'assets/css/main.min.css': [
            '.tmp/assets/css/app.css'
          ]
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      watch: {
        files: [{
          expand: true,
          cwd: 'assets/css',
          src: 'main.min.css',
          dest: 'assets/css'
        }]
      }
    },
    uglify: {
      watch: {
        files: {
          'assets/js/scripts.min.js': [
            'bower_components/bootstrap/js/transition.js',
            'bower_components/bootstrap/js/alert.js',
            'bower_components/bootstrap/js/button.js',
            'bower_components/bootstrap/js/carousel.js',
            'bower_components/bootstrap/js/collapse.js',
            'bower_components/bootstrap/js/dropdown.js',
            'bower_components/bootstrap/js/modal.js',
            'bower_components/bootstrap/js/tooltip.js',
            'bower_components/bootstrap/js/popover.js',
            'bower_components/bootstrap/js/scrollspy.js',
            'bower_components/bootstrap/js/tab.js',
            'bower_components/bootstrap/js/affix.js',
            'assets/js/plugins/*.js',
            'assets/js/_*.js'
          ]
        },
        options: {
          // JS source map: to enable, uncomment the lines below and update sourceMappingURL based on your install
          // sourceMap: 'assets/js/scripts.min.js.map',
          // sourceMappingURL: '/app/themes/roots/assets/js/scripts.min.js.map'
        }
      }
    },
    version: {
      options: {
        file: 'lib/scripts.php',
        css: 'assets/css/main.min.css',
        cssHandle: 'roots_main',
        js: 'assets/js/scripts.min.js',
        jsHandle: 'roots_scripts'
      }
    },
    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      devFile: 'bower_components/modernizr/modernizr.js',
      outputFile: '<%= yeoman.dist %>/bower_components/modernizr/modernizr.js',
      files: [
        'assets/js/{,*/}*.js',
        'assets/css/{,*/}*.css'
      ],
      uglify: true
    },
    watch: {
      less: {
        files: [
          'assets/less/*.less',
          'assets/less/bootstrap/*.less'
        ],
        tasks: ['less', 'autoprefixer', 'version']
      },
      compass: {
        files: [
          'assets/sass/{,*/}*.{scss,sass}'
        ],
        tasks: ['compass', 'cssmin', 'autoprefixer', 'version']
      },
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'uglify', 'version']
      },
      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          livereload: true
        },
        files: [
          'assets/css/main.min.css',
          'assets/js/scripts.min.js',
          'templates/*.php',
          '*.php'
        ]
      }
    },
    clean: {
      options: {
        force: true
      },
      watch: [
        'assets/css/main.min.css',
        'assets/js/scripts.min.js'
      ],
      dist: [
        '<%= yeoman.dist %>'
      ]
    },
    copy: {
      dist: {
        files: [{
          expand: true,
            dot: true,
            cwd: '.',
            dest: '<%= yeoman.dist %>',
            src: [
              'style.css',
              '*.{ico,png,txt}',
              'assets/img/{,*/}*.webp',
              'bower_components/sass-bootstrap/fonts/*.*',
              'bower_components/jquery/jquery.min.js',
              'screenshot.{png/jpg/jpeg}',
              '{,*/}*.php'
            ]
          }
        ]
      }
    }

  });

  // Register tasks
  grunt.registerTask('default', [
    'clean:watch',
//    'less',
    'compass',
    'cssmin',
    'autoprefixer',
    'uglify',
    'version'
  ]);
  grunt.registerTask('dist', [
    'clean:dist',
    'modernizr',
    'copy:dist'
  ]);

};
