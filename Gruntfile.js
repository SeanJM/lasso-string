var js = {};
(function () {
  var lib = {
    main : [
      'src/lasso.js',
      'src/!(init).js',
      'src/init.js',
    ]
  };
  function get(files) {
    var arr = [];
    for (var i = 0, n = files.length; i < n; i++) {
      arr = arr.concat(lib[files[i]]);
    }
    return arr;
  }
  js.main = get([
    'main'
  ]);
})();
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMap: false,
        mangle: true
      },
      main : {
        files: {
          'lasso.min.js': js.main,
        }
      }
    },
    concat : {
      dist : {
        src : js.main,
        dest : 'lasso.js'
      }
    },
    watch: {
      main : {
        files: js.main,
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
};
