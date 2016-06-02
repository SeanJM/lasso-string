var fs = require('fs');
var js = {};

js.all = [
  'src/references.js',
  'src/Lasso.js',
  'src/shared/*.js',
  'src/string/*.js',
  'src/Lasso.prototype.js',
  'src/methods.js',
  'src/exports.js'
];

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMap: false,
        mangle: false,
        enclose : {}
      },
      main : {
        files: {
          'lasso.min.js': js.all,
        }
      }
    },

    concat : {
      dist : {
        src : js.all,
        dest : 'lasso.js',
      }
    },

    watch: {
      main : {
        files: js.all,
        tasks: ['uglify:main', 'concat'],
        options: {}
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  // Default task(s).
  grunt.registerTask('default', ['uglify', 'concat', 'watch']);

  fs.readFile('lasso.js', 'utf8', function (err, src) {
    var t = src.match(/^\s+/m)[0];
    var v = src.split('\n').map(function (a) { return t + a; }).join('\n');
    var s = '(function () {\n' + v + '\n}());';
    fs.writeFile('lasso.js', s);
  });
};
