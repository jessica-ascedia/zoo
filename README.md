# Ascedia Front End Boilerplate for new site builds
A boilerplate repo for quickly setting up the front end of new sites using Bootstrap 4.1.2 as the CSS framework and Gulp to automate your workflow.

## What's Included
* [Bootstrap](//getbootstrap.com) version 4.1.2 and it's dependencies
    * [popper.js](//popper.js.org) - Used for dropdowns, popovers, and tooltips
    * [jQuery](//jquery.com) version 3.3.1 - All of Bootstrap's plugins depend on jQuery
* [Gulp](//gulpjs.com) to automate front end workflow
* [Modernizr](//modernizr.com) version 3.6.0 with Modernizr.mq() JS support (for easy media queries in JS) and adding of CSS classes to HTML (for browser feature detection)
* Bootstrap extensions - Additional Sass partials which extend Bootstrap
    * `calcRem()` Mixin - Convert px units to REM
        * Accepts an integer, equivalent to pixel, value
        * Usage: `calcRem(16)` would compile to `1rem`
    * Responsive Typography using`font-size()` mixin - Automatically scale fonts without breakpoints. 
        * Accepts a min and max font size as comma separated integers
        * Usage: `font-size(14, 18)` will result in the font rendering at 14px on small viewports, and 18px on large
        * Enable this feature by uncommenting the the partial import of `03-bootstrap-overrides/type` in `style.scss`
    * Additional Utility Classes - See [Wiki](https://github.com/ascedia/front-end-boilerplate/wiki) for documentation on all additional utility classes not included with Bootstrap

## Requirements

### Node
[Download](//nodejs.org) and install the latest LTS version of NodeJS, which installs node package manager (npm)

### Gulp
If this is your first time using [Gulp](//gulpjs.com), you'll need to install it globally from your terminal. Run `npm install gulp-cli -g`to do so. Pro-tip: Node needs to be installed first or this won't work.

## Getting started
1. Fork this repo and then clone it on your computer.
2. Copy the `/common` folder into your project where you and your team decide front end files should live
    * If you are not keen on the `/common` folder name, you can copy all files within it to your folder of choice, making sure to keep the same file structure otherwise
3. Initialize npm for your project. From the `/common` folder in your terminal, run `npm init` and step through the questions
    * If you do not know the answer to any questions, you can simply click enter to move on using the defaults. You can always update `/common/package.json` manually later if you need to
4. From the `/common` folder in your terminal, run `npm install` to install Gulp and all dependencies that are pre-defined in `/common/package.json`
5. In version control, ignore the `node_modules` folder 
6. Edit `/common/gulpfile.js` to define file paths, server settings, and javascript bundling
    * Define source and destination folders in `basePaths` object if your file structure will be different from the boilerplate's default setup
    * Define file paths of scss, css, js, images, and font directories if your file structure will be different from the boilerplate's default setup
    * Define server settings for browserSync to fit your needs in the `localServerSettings` object.
    * Define files to include in header and footer JavaScript bundles
        * The boilerplate comes pre-defined to include Modernizr in the header bundle, jQuery and `main.js` in your footer bundle
7. In your site template, make sure to set up tags for CSS and JS calls
    * In the `<head>` section for your stylesheet (`style.css`) and header JS bundle (`header.min.js`)
    * Immediately before the closing `</body>` tag, call your footer JS bundle (`footer.min.js`)

8. Start Gulp (run `gulp` from your `/common` folder) and start developing! 


## Gulp

### Features
* Processes CSS
    * Compile Sass into CSS
    * Autoprefixes CSS (last 2 versions)
    * Minify CSS
* Processes JS changes
    * Bundles/concatenates defined JS files into header and footer js files
    * Uglifies (minifies) JS bundles
* Optimizes Images
    * Supports `jpg`, `png`, `svg`, and `gif` files
* Creates mini-server for your app that can be used for static or dynamic sites
* Live reloads changes to markup, JavaScript, and CSS

### Tasks
While running just the default `gulp` command should be enough for your day to day development, you can run tasks individually as well. Below are all the tasks defined in `gulpfile.js`, run them by entering `gulp` plus the task name from your command line. (eg. `gulp process-css`).

**Task Name** | **Description**
------------- | ---------------
`gulp` | Starts the default gulp task. Starts browsersync and watches files for changes. (Just run `gulp` for the default task, not `gulp gulp`
`browserSync` | starts a mini-server, runs `watch` as well
`watch` | starts all file watches defined
`process-css` | Compiles Sass, autoprefixes and minifies compiled CSS 
`process-header-scripts` | Bundles and minififies all scripts defined in the `header` bundle in the `jsBundles` object in `gulpfile.js`
`process-footer-scripts` | Bundles and minififies all scripts defined in the `footer` bundle in the `jsBundles` object in `gulpfile.js`
`process-scripts` | Runs both `process-header-scripts` and `process-footer-scripts`
`optimize-images` | Optimizes all images found in the defined image directory
`reload-markup` | Triggers `browserSync` to reload the browser window running the site. Intended for use by file watches, but if you have browserSync running and just want to run this manually for some reason, have at it. 
`copy-fonts` | Copies all font assets from `src/` to `dist`
`clean` | Deletes all files from the `dist/` folder
`build` | Clean `dist/` folder, process all CSS and JS, optimize images, and copy asset files (fonts) to `dist/` directory

## More Documentation
Additional documentation can be found in the [Wiki](https://github.com/ascedia/front-end-boilerplate/wiki)
