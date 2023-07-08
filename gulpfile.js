// function tarea1 (done) {
//     console.log("Primer Tarea");

//     done();
// }
// function tarea2 (done) {
//     console.log("Segunda Tarea");

//     done();
// }

// //LLamar a las funciones anteriormente creadas

// exports.tarea1 = tarea1;
// exports.tarea2 = tarea2;

//Compilar SASS con Gulp
//Las dependencias que instalamos
const {src, dest, watch, parallel} = require('gulp'); //Retorna multiples funciones

/**CSS
 * gulp
 * gulp-sass , sass
 * gulp-sourcemaps
 * gulp-plumber
 * postcss, gulp-postcss
 * autoprefixer
 * cssnano
 */
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

/**Images
 * gulp-imagemin
 */
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//Javascript
const terser = require('gulp-terser-js');

function css (done) {
    //Identificar el archivo .scss a compilar
    src('src/SCSS/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass()) //Compilaro el codigo
        .pipe(postcss([autoprefixer(),cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css')) //Almacenarlo en un archivo de css
    done();
}

function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))

    done();

}

function versionWebp(done){
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))

    done();
}

function versionAvif(done){
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))

    done();
}

function javascript(done){
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));    

    done();
}

function dev (done) {
    watch('src/SCSS/**/*.scss',css);
    watch('src/js/**/*.js',javascript);
    done();
}

exports.css = css;
exports.javascript = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(dev,javascript,versionWebp, versionAvif, imagenes);
