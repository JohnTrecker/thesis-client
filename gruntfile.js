module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mochaTest: {
      test: {
        options: {
          timeout: 4000 },
        src: ['test/**/*.js'] } },
    karma: {
      unit: {
        configFile: 'karma.conf.js' } },
    exec: {
      deploy: {
        command: 'sudo -E npm start' } },
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015', 'react'] },
      files: {
        expand: true,
        src: ['Public/App/**/*.jsx'],
        dest: 'Compiled/',
        ext: '.js' } } });

  grunt.registerTask('build', () => {
    grunt.task.run(['unit']);
  });

  grunt.registerTask('default', ['babel']);

  // Todo: concat and minify client files here
  grunt.registerTask('deploy', () => {
    grunt.task.run(['exec:deploy']);
  });

  grunt.registerTask('unit', () => {
    grunt.task.run(['mochaTest']);
  });

  grunt.registerTask('integration', () => {
//  grunt.task.run(['karma']);
  });

  grunt.registerTask('converage', () => {

  });

  grunt.registerTask('end-to-end', () => {

  });
};
