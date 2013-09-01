module.exports = function(grunt) {
	var settings = {};
	var settingsPath = 'Config/settings.json';
	if (!grunt.file.exists(settingsPath)) {
		settingsPath += '.install';
	}

	/**
	 * Config
	 */
	var initConfig = {
		pkg: grunt.file.readJSON('package.json'),
		settings: grunt.file.readJSON(settingsPath),
		rootPath: __dirname,

		shell: {
			options: {
				stdout: true
			},
			cachePluginPaths: {
				command: './Console/cake croogo cachePluginPaths'
			}
		}
	};

	var buildTasks = [
		'shell:cachePluginPaths'
	];

	/**
	 * Croogo plugins config
	 */
	var pluginPaths = grunt.file.readJSON('tmp/plugin_paths.json');
	for (var plugin in pluginPaths) {
		var pluginPath = pluginPaths[plugin];
		gruntHookFile = pluginPath + '/Grunthookfile.js';
		if (grunt.file.exists(gruntHookFile)) {
			var pluginConfig = require(gruntHookFile)(grunt, initConfig);
			for (var gruntPlugin in pluginConfig) {
				var pluginTargets = pluginConfig[gruntPlugin];
				for (var target in pluginTargets) {
					var targetConfig = pluginTargets[target];

					// Add plugin to InitConfig
					if (typeof initConfig[gruntPlugin] === 'undefined') {
						initConfig[gruntPlugin] = {};
					}
					initConfig[gruntPlugin][target] = targetConfig;

					// Register in build tasks
					if (target.indexOf('build-') == 0) {
						buildTasks.push(gruntPlugin + ':' + target);
					}
				}
			}
		}
	}

	//console.log(JSON.stringify(initConfig, undefined, 2));
	grunt.initConfig(initConfig);

	/**
	 * Load tasks
	 */
	require('load-grunt-tasks')(grunt);

	/**
	 * Register tasks
	 */
	grunt.registerTask('build', buildTasks);

};
