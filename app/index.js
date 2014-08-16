'use strict'
var util 	= require('util'),
	path 	= require('path'),
	yeoman	= require('yeoman-generator'),
	chalk 	= require('chalk');

var webLaunchGenerator = yeoman.generators.Base.extend({
	promptUser	: function() {
		var done = this.async();

		console.log(this.yeoman);

		var prompts = [{
			name 	: 'appName',
			message	: 'What would you like the name of this spanking new app?'
		},{
			type	: 'confirm',
			name 	: 'useMongo',
			message : 'Would you like to use mongoDB as a database?',
			default	: false
		}];

		this.prompt(prompts, function(props){
			this.appName 	= props.appName;
			this.useMongo 	= props.useMongo; 

			done();
		}.bind(this));
	},

	scaffoldFolders	: function() {
		this.mkdir("app");
		this.mkdir("app/controllers");
		this.mkdir("app/views");
		this.mkdir("app/views/includes");

		this.mkdir("assets");
		this.mkdir("assets/less");
		this.mkdir("assets/public");
		this.mkdir("assets/public/js");
		this.mkdir("assets/public/js/min");
		this.mkdir("assets/public/css");
		this.mkdir("assets/public/img");
		this.mkdir("assets/public/build");

		this.mkdir("config");
	},

	copyFiles : function() {
		var context = {
			appName 	: this.appName,
			useMongo 	: this.useMongo
		}

		this.copy("_package.json"					, "package.json");
		this.copy("_app.js"							, "app.js");
		
		this.copy("app/controllers/_main.js"		, "app/controllers/main.js");
		this.copy("app/views/_index.jade"			, "app/views/index.jade");
		this.copy("app/views/includes/_header.jade"	, "app/views/includes/header.jade");
		this.copy("app/views/includes/_footer.jade"	, "app/views/includes/footer.jade");

		this.copy("assets/less/_index.less"			, "assets/less/index.less");
		this.copy("assets/public/js/_index.js"		, "assets/public/js/index.js");

		this.copy("config/_express.js"				, "config/express.js");
		this.copy("config/_routes.js"				, "config/routes.js");

	},

	runNpm : function() {
		var done = this.async();
		this.npmInstall("", function(){
			console.log("\nHouston, we have liftoff\n");
			done();
		});
	}
});

module.exports = webLaunchGenerator;