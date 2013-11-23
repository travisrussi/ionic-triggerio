'use strict';

module.exports = function (grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // livereload
  var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
  var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
  };

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'src'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/**\n' +
      ' * <%= pkg.description %>\n' +
      ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * @link <%= pkg.homepage %>\n' +
      ' * @author <%= pkg.author %>\n' +
      ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
      ' */\n'
    },
    watch: {
      // coffee: {
      //   files: ['<%= yeoman.app %>/js/{,*/}*.coffee'],
      //   tasks: ['coffee:dist']
      // },
      // coffeeTest: {
      //   files: ['test/spec/{,*/}*.coffee'],
      //   tasks: ['coffee:test']
      // },
      // compass: {
      //   files: ['<%= yeoman.app %>/css/{,*/}*.{scss,sass}'],
      //   tasks: ['compass']
      // },
      less: {
        files: ['<%= yeoman.app %>/css/{,*/}*.less'],
        tasks: ['less:dist']
      },
      livereload: {
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '{.tmp,<%= yeoman.app %>}/css/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/js/{,*/}*.js',
          '<%= yeoman.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['livereload']
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/js/{,*/}*.js'
      ]
    },
    karma: {
      options: {
        configFile: 'test/karma.conf.js',
        browsers: ['PhantomJS']
      },
      unit: {
        port: 9090,
        singleRun: true
      },
      server: {
        autoWatch: true
      }
    },
    // coffee: {
    //   dist: {
    //     files: [{
    //       expand: true,
    //       cwd: '<%= yeoman.app %>/js',
    //       src: '{,*/}*.coffee',
    //       dest: '.tmp/js',
    //       ext: '.js'
    //     }]
    //   },
    //   test: {
    //     files: [{
    //       expand: true,
    //       cwd: 'test/spec',
    //       src: '{,*/}*.coffee',
    //       dest: '.tmp/spec',
    //       ext: '.js'
    //     }]
    //   }
    // },
    // compass: {
    //   options: {
    //     sassDir: '<%= yeoman.app %>/css',
    //     cssDir: '.tmp/css',
    //     imgDir: '<%= yeoman.app %>/img',
    //     javajsDir: '<%= yeoman.app %>/js',
    //     fontsDir: '<%= yeoman.app %>/fonts',
    //     importPath: '<%= yeoman.app %>/components',
    //     relativeAssets: true
    //   },
    //   dist: {},
    //   server: {
    //     options: {
    //       debugInfo: true
    //     }
    //   }
    // },
    less: {
      options: {
        paths: ['<%= yeoman.app %>/css'],
      },
      dist: {
        files: {
          '<%= yeoman.app %>/css/main.css': '<%= yeoman.app %>/css/main.less'
        }
      }
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        files: {
          '<%= yeoman.dist %>/js/js.js': [
            '.tmp/js/{,*/}*.js',
            '<%= yeoman.app %>/js/{,*/}*.js'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/css/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/img',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/img'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/css/main.css': [
            '.tmp/css/{,*/}*.css',
            '<%= yeoman.app %>/css/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'templates/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/js',
          src: '*.js',
          dest: '<%= yeoman.dist %>/js'
        }]
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        // report: 'gzip',
        useStrict: false
      },
      dist: {
        files: {
          '<%= yeoman.dist %>/js/js.js': [
            '<%= yeoman.dist %>/js/js.js'
          ],
          '<%= yeoman.dist %>/js/libs.js': [
            '<%= yeoman.dist %>/js/libs.js'
          ]
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/js/{,*/}*.js',
            '<%= yeoman.dist %>/css/{,*/}*.css',
            '<%= yeoman.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/fonts/*'
          ]
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,txt,json,html}',
            // '.htaccess',
            // 'components/**/*',
            'res/*',
            'css/*',
            'js/*',
            'templates/*',
            'img/{,*/}*.{gif,webp,png}',
            'fonts/*'
          ]
        }]
      }
    }
  });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', [
    'clean:server',
    // 'coffee:dist',
    // 'compass:server',
    'less:dist',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    // 'coffee',
    // 'compass',
    'connect:test',
    'karma:unit'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    //'jshint',
    //'test',
    // 'coffee',
    // 'compass:dist',
    'less:dist',
    //'useminPrepare',
    //'imagemin',
    'cssmin',
    //'htmlmin',
    //'concat',
    'copy',
    // 'cdnify',
    //'ngmin',
    //'uglify',
    //'rev',
    //'usemin'
  ]);

  grunt.registerTask('fast-build', [
    'clean:dist',
    'less:dist',
    'useminPrepare',
    // 'imagemin',
    'cssmin',
    'htmlmin',
    'concat',
    'copy',
    // 'cdnify',
    'ngmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', ['build']);
};
