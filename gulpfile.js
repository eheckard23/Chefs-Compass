const gulp = require('gulp');
const git = require('gulp-git');
const pkg = require('./package.json');
const argv = require('yargs').argv;
const fs = require('fs');

// gulp task for resetting version number
gulp.task('reset', () => {
	if(argv.v){
		pkg.version = argv.v;
		// write file changes back to package.json with formatting
		fs.writeFile('./package.json', JSON.stringify(pkg, null, '  '), (err) => {
			if(err) throw err;
			console.log('package.json successfully updated!');
			console.log(`Project version now at ${pkg.version}`);
		});
	}else{
		console.log('Please provide a version number!');
	}
});

// gulp bump version
gulp.task('bump', () => {
	switch(argv.v){
		case 0:
			let majVersion = pkg.version.split('.');
			// bump major version number
			let bumpedMaj = parseInt(majVersion[0]) + 1;
			// reset minor and patch
			majVersion[1] = majVersion[2] = 0;
			majVersion[0] = bumpedMaj;
			pkg.version = majVersion.join('.');
			// git tag with version number
			git.tag(`v${pkg.version}`, 'New Tag', err => {
				if(err) throw err;
			});
			// write to package.json
			fs.writeFile('./package.json', JSON.stringify(pkg, null, '  '), (err) => {
			if(err) throw err;
				console.log('package.json updated!');
				console.log(`Project version now at ${pkg.version}`);
			});
			break;
		case 1:
			let minVersion = pkg.version.split('.');
			// bump minor version number
			let bumpedMin = parseInt(minVersion[1]) + 1;
			// reset patch only
			minVersion[2] = 0;
			minVersion[1] = bumpedMin;
			pkg.version = minVersion.join('.');
			// git tag with version number
			git.tag(`v${pkg.version}`, 'New Tag', err => {
				if(err) throw err;
			});
			// write to package.json
			fs.writeFile('./package.json', JSON.stringify(pkg, null, '  '), (err) => {
			if(err) throw err;
				console.log('package.json updated!');
				console.log(`Project version now at ${pkg.version}`);
			});
			break;
		case 2:
			let patchVersion = pkg.version.split('.');
			// bump minor version number
			let bumpedPatch = parseInt(patchVersion[2]) + 1;
			patchVersion[2] = bumpedPatch;
			pkg.version = patchVersion.join('.');
			// git tag with version number
			git.tag(`v${pkg.version}`, 'New Tag', err => {
				if(err) throw err;
			});
			// write to package.json
			fs.writeFile('./package.json', JSON.stringify(pkg, null, '  '), (err) => {
			if(err) throw err;
				console.log('package.json updated!');
				console.log(`Project version now at ${pkg.version}`);
			});
			break;
		default:
			console.log('No version provided. Try gulp bump --v=2 for bumping patch version. (Maj=0, Min=1)')
	}
});