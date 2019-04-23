//--------------------------------------------------------------------//
//               _        __ _ _      
//    __ _ _   _| |_ __  / _(_) | ___ 
//   / _` | | | | | '_ \| |_| | |/ _ \
//  | (_| | |_| | | |_) |  _| | |  __/
//   \__, |\__,_|_| .__/|_| |_|_|\___|
//   |___/        |_|          ASCEDIA
//  
//  TABLE OF CONTENTS
//  ---
//  01. DEPENDENCIES
//  02. FILE PATHS
//      a.  Base Paths
//      b.  File Paths
//  03. LOCAL SERVER SETTINGS
//      a.  Server Type 
//      b.  Static Site Base Directory
//      c.  Dynamic Site URL
//      d.  Tunnel Name
//  04. JAVASCRIPT BUNDLES
//  05. TASKS
//      a.  Process CSS
//      b.  Process JavaScript
//      c.  Image Optimization
//      d.  Reload HTML Modifications
//      e.  Copy Fonts
//      f.  Default Task
//      g.  Browser Sync
//      h.  File Watching
//      i.  Clean Distributable Files
//      j.  Build Distributable Files
//  
//--------------------------------------------------------------------//
//  01. DEPENDENCIES
//--------------------------------------------------------------------//
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    uglifyES6 = require('uglify-es'),
    composer = require('gulp-uglify/composer'),
    uglify = composer(uglifyES6, console),
    image = require('gulp-image'),
    del = require('del'),
    runSequence = require('run-sequence'),
    changed = require('gulp-changed');
//--------------------------------------------------------------------//
//  02. FILE PATHS
//--------------------------------------------------------------------//
//  •   Define file source and destination paths for markup, Sass, CSS, 
//      JavaScript, and images
//  •   Can point to a directory of files, single file, or specfic 
//      file types in a directory
//--------------------------------------------------------------------//
//      a.  Base Paths
//          •   Define base paths for source code (src) and 
//              production ready code (dist)
//--------------------------------------------------------------------//
var basePath = {
    "src": "./src",         //  Source files
    "dist": "./dist",       //  Distributable files
};
//--------------------------------------------------------------------//
//      b.  File Paths
//          Define paths for file types
//--------------------------------------------------------------------//
var filePath = {
    "styles": {
        "src": basePath.src + "/scss", 
        "dist": basePath.dist + "/css",
    },
    "js": {
        "src": basePath.src + "/scripts", 
        "dist": basePath.dist + "/scripts",
        // Location of page specific script files to be uglified 
        // independent of the main bundles.
        "pageScriptSrc": basePath.src + "/scripts/page" // 
    },
    "image": {
        "src": basePath.src + "/images",
        "dist": basePath.dist + "/images",
    },
    "font": {
        "src": basePath.src + "/fonts",
        "dist": basePath.dist + "/fonts",
    }
};
//--------------------------------------------------------------------//
//  03. LOCAL SERVER SETTINGS
//--------------------------------------------------------------------//
//  •   Settings used in the `browserSync` task 
//--------------------------------------------------------------------//
var localServerSettings = {
    //----------------------------------------------------------------//
    //  a.  Server Type 
    //      •  'static`
    //          •   If using static .html files, you’ll need to use
    //              static mode. Browsersync will start a mini-server
    //              and provide a URL to view your site
    //      •  'dynamic'
    //           •  If you’re already running a local server with your 
    //              project, choose dynamic and Browsersync will create
    //              a mini-server and proxy the existing setup
    //----------------------------------------------------------------//
    "serverType": "static", 
    //----------------------------------------------------------------//
    //  b.  Static Site Base Directory
    //      •   Only required if `serverType` set to `static`
    //      •   Set the base directory of your site (where your root 
    //          index.html file is located)
    //          •   eg. "../"
    //----------------------------------------------------------------//
    "staticSiteBaseDirectory": "../",
    //----------------------------------------------------------------//
    //  c.  Dynamic Site URL
    //      •   Only required if `serverType` set to `dynamic`
    //      •   Set the URL of the local site already being used 
    //          •   eg. "localhost:51885" or "dev.example.com"
    //----------------------------------------------------------------//
    "dynamicSiteUrl": "dev.example.com",
    //----------------------------------------------------------------//
    //  d.  Tunnel Name
    //      •   Select a name to use to create a local tunnel URL
    //          that will make your dev site accessible to anyone and
    //          any device
    //          •   eg. `example` would create the following accessible
    //              URL http://example.localtunnel.me
    //      •   If the name is not defined or is unavailable, an 
    //          alternative name will be created and provided
    //          when the site starts
    //----------------------------------------------------------------//
    "tunnelName": "example"
};
//--------------------------------------------------------------------//
//  04. JAVASCRIPT BUNDLES
//--------------------------------------------------------------------//
//  •   Add files to bundles to concatenate and minify them into a 
//      single file
//  •   If you add a new bundle, add a new task and add the task to the
//      `process-scripts` task
//--------------------------------------------------------------------//
var jsBundles = {
    //----------------------------------------------------------------//
    //  Header Scripts
    //  •   Scripts that need to be in <head>
    //  •   Disabled by default, uncomment to activate
    //      •   Also toggle comment on lines of `process-scripts`
    //          task (section 5.b.3) to include `process-header-scripts` 
    //      •   Also uncomment `process-header-scripts` watch in section 5.h.
    //  •   Creates `header.min.js`
    //----------------------------------------------------------------//
    // "header": [  
    // ],
    //----------------------------------------------------------------//
    //  Footer Scripts
    //  •   Scripts that will bundled and be called before `</body>`
    //  •   Creates `footer.min.js`
    //  •   Should only include scripts that will be needed on a vast
    //      majority of pages on the site.
    //      •   For page-specific uglification, add each script file to 
    //          `filePath.js.pageScriptSrc` and they will be minified 
    //          and output to individually in your dist scripts folder
    //----------------------------------------------------------------//
    "footer": [ 
        //filePath.js.src + "/vendor/modernizr.min.js",
        filePath.js.src + "/vendor/jquery-3.3.1.min.js",
        //filePath.js.src + "/vendor/bootstrap/bootstrap.bundle.min.js",
        // filePath.js.src + "/vendor/picturefill.min.js",
        // filePath.js.src + "/vendor/slick.min.js",
        // filePath.js.src + "/vendor/lazyload.min.js",
        // filePath.js.src + "/vendor/stickyfill.min.js",
        filePath.js.src + "/main.js"
    ]
};


//--------------------------------------------------------------------//
//  ***                                                               
//--------------------------------------------------------------------//
//
//  Unless you are adding new tasks or file watches, you should
//  not need to edit anything beyond this point
//
//--------------------------------------------------------------------//
//  ***                                                               
//--------------------------------------------------------------------//


//--------------------------------------------------------------------//
//  05. TASKS
//--------------------------------------------------------------------//
//      a.  Process CSS
//--------------------------------------------------------------------//
gulp.task('process-css', function() {
    var plugins = [
        autoprefixer({
            browsers: ['last 2 versions']
        }),
		cssnano
    ];
    return gulp.src(filePath.styles.src + '/*.scss')
    .pipe(sass().on('error', sass.logError))
	.pipe(postcss(plugins))
    .pipe(gulp.dest(filePath.styles.dist))
	.pipe(browserSync.stream());
});
//--------------------------------------------------------------------//
//      b.  Process JavaScript
//--------------------------------------------------------------------//
//          1.  Bundle and Minify Header Scripts
//--------------------------------------------------------------------//
gulp.task('process-header-scripts', function () {
    return gulp.src(jsBundles.header)
    .pipe(concat('header.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(filePath.js.dist))
    .pipe(browserSync.stream());
});
//--------------------------------------------------------------------//
//          2.  Bundle and Minify Footer Scripts
//--------------------------------------------------------------------//
gulp.task('process-footer-scripts', function () {
    return gulp.src(jsBundles.footer)
        .pipe(concat('footer.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(filePath.js.dist))
        .pipe(browserSync.stream());
});
//--------------------------------------------------------------------//
//          2b.  Minify page specific scripts and copy to Dist
//--------------------------------------------------------------------//
gulp.task('process-page-scripts', function () {
    return gulp.src(filePath.js.pageScriptSrc + '/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(filePath.js.dist + '/page'))
        .pipe(browserSync.stream());
});
//--------------------------------------------------------------------//
//          3. Process Header and Footer Scripts
//--------------------------------------------------------------------//
// gulp.task('process-scripts', ['process-header-scripts', 'process-footer-scripts', 'process-other-scripts']);
gulp.task('process-scripts', ['process-footer-scripts', 'process-page-scripts']);
//--------------------------------------------------------------------//
//      c.  Image Optimization
//--------------------------------------------------------------------//
gulp.task('optimize-images', function () {
    gulp.src(filePath.image.src + "/**/*")
    .pipe(image())
    .pipe(gulp.dest(filePath.image.dist));
});
//--------------------------------------------------------------------//
//      d.  Reload HTML Modifications
//--------------------------------------------------------------------//
gulp.task('reload-markup', function() {
    //browserSync.reload();
});
//--------------------------------------------------------------------//
//      e.  Reload HTML Modifications
//          •   In case CSS browserSync stream (live reloading of CSS 
//              without page refresh) doesn't work, uncomment the file 
//              watch for the task `reload-css` to instead force 
//              page refresh
//--------------------------------------------------------------------//
gulp.task('reload-css', function() {
    //browserSync.reload();
});
//--------------------------------------------------------------------//
//      f.  Copy Fonts
//--------------------------------------------------------------------//
gulp.task('copy-fonts', function() {
    gulp.src(filePath.font.src + '/**/*')
    .pipe(gulp.dest(filePath.font.dist));
});
//--------------------------------------------------------------------//
//      g.  Default Task
//--------------------------------------------------------------------//
gulp.task('default', ['browserSync', 'watch']);
//--------------------------------------------------------------------//
//      h.  Browser Sync
//--------------------------------------------------------------------//
gulp.task('browserSync', ['build'], function() {
    console.log('-------------------------------------');
    console.log('Create Local Server and Watch Files');
    console.log('-------------------------------------');
    var serverType = localServerSettings.serverType;
    if (serverType === "static") {
        browserSync.init({
            server: {
                baseDir: localServerSettings.staticSiteBaseDirectory
            },
            tunnel: localServerSettings.tunnelName + "-s",
            online: true
        });
    } else if (serverType === "dynamic") {
        browserSync.init({
            proxy: {
                target: localServerSettings.dynamicSiteUrl,
            },
            tunnel: localServerSettings.tunnelName + "-d",
            online: true,
        });
    } else {
        console.log('Server type undefined or incorrect in `localServerType` key within localServerSettings` object, please choose `static` or `dynamic` ');
    }
});
//--------------------------------------------------------------------//
//      h.  File Watching
//--------------------------------------------------------------------//
gulp.task('watch', ['browserSync'], function () {
    gulp.watch(filePath.styles.src + '/**/*.scss', { interval: 1000 }, ['process-css']);
	//gulp.watch(jsBundles.header, { interval: 1000 }, ['process-header-scripts']);
    gulp.watch(jsBundles.footer, { interval: 1000 }, ['process-footer-scripts']);
	gulp.watch(filePath.js.pageScriptSrc, { interval: 1000 }, ['process-page-scripts']);
	gulp.watch(filePath.image.src + '/**/*.{png,jpg,svg,gif}', { interval: 1000 }, ['optimize-images']);
    gulp.watch(filePath.font.src, { interval: 1000 }, ['copy-fonts']);
    //gulp.watch('../**/*.{html,ascx,aspx,cshtml}', { interval: 1000 }, ['reload-markup']);
    // gulp.watch('../**/*.css', { interval: 1000 }, ['reload-css']);
});
//--------------------------------------------------------------------//
//      i.  Clean Distributable Files
//--------------------------------------------------------------------//
gulp.task('clean', function() {
    return del([
        basePath.dist + '/**/*'
    ]);
});
//--------------------------------------------------------------------//
//      j.  Build Distributable Files
//--------------------------------------------------------------------//
gulp.task('build', function(callback) {
    console.log('-------------------------------------');
    console.log('Building Distributable Files');
    console.log('-------------------------------------');
    runSequence(
        'clean',
        "process-css", 
        "process-scripts", 
        "copy-fonts", 
        "optimize-images", 
        callback
    );
});