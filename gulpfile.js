'use strict'

const gulp = require('gulp')
const { series } = gulp
const sass = require('gulp-sass')
const minifyCSS = require('gulp-minify-css')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify-es').default
const gzip = require('gulp-gzip')
const nodemon = require('gulp-nodemon')

sass.compiler = require('node-sass')

function SassFile() {
    // return gulp.src('./dev/scss/*/*.scss')
    return gulp.src('./dev/scss/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/src'))
}

function Nodemon(done) {
    nodemon({
        script: 'app.js'
        , tasks: ['default']
        ,ext: 'js scss html'
        ,watch: [
                'dev/*',
                'index.html',
                'blog/index.html',
                'about/index.html',
                'work/index.html',
                'contact/index.html'
            ]
        ,env: { 'NODE_ENV': 'development'}
        , done: done
    })
}

// function Babel() {

// }

function MinifyCSSFile () {
    return gulp.src('./css/src/index.css')
        .pipe(minifyCSS({
            keepBreaks: true
        }))
        .pipe(rename(function(path) {
            path.basename += '.min'
            path.extname = '.css'
        }))
        .pipe(gulp.dest('./css'))
}

function Uglify () {
    return gulp.src('./dev/js/index.js')
        // .pipe(babel({
        //     presets: ['@babel/env'],
        //     plugins: ["@babel/transform-runtime"]
        // }))
        .pipe(uglify())
        .pipe(rename(function(path) {
            path.basename += '.min'
            path.extname = '.js'
        }))
        .pipe(gulp.dest('./js'))
}

function Gzip () {
    return gulp.src('./js/index.min.js')
        .pipe(gzip())
        .pipe(gulp.dest('./js'))
}

// gulp.task('default',['minify-css','uglify'])
const build = gulp.series(SassFile,MinifyCSSFile,Uglify,Gzip)

gulp.task('default', build)
gulp.task('start', Nodemon)