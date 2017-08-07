const gulp = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const cssnano = require("cssnano");
const rename = require("gulp-rename");
const stylelint = require("stylelint");
const reporter = require("postcss-reporter");

gulp.task('style', function(){
    return gulp.src("./src/*.css")
    .pipe(postcss([autoprefixer]))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest('dest/'));
})
gulp.task('rename', ['style'], function(){
    return gulp.src("dest/index.css")
    .pipe(postcss([cssnano]))
    .pipe(rename('index.min.css'))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest("dest/"))
})
gulp.task("lint-style", function(){
    return gulp.src("src/*.css")
    .pipe(
        postcss([stylelint(
            {
                "rules":{
                    "color-no-invalid-hex": 2,
                    "declaration-colon-space-before":[2,"never"],
                    "indentation":[2,2],
                    "number-leading-zero":[2,"always"]

                }
            }),
            reporter({
                clearMessages: true,
            })
        ])
    )
})

gulp.task("default", ["lint-style","rename"]);

const watcher = gulp.watch("src/*.css", ['default']);
watcher.on("change", function(event){
    console.log(`File${event.path}was${event.type},running tashs..:.`);
})
