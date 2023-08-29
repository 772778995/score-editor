const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleancss = require('gulp-clean-css');
// const smushit = require('gulp-smushit');
const htmlmin = require('gulp-htmlmin');
const clean = require('gulp-clean');

gulp.task('clean',function(){
    gulp.src('./dist/*',{read: false})
        .pipe(clean());
})

// 压缩js
gulp.task('minscript', function() {
    return gulp.src('./abc/assets/music_score_editor/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/assets/music_score_editor/js'));
})

// 压缩css
gulp.task('mincss', function() {
    return gulp.src('./abc/assets/music_score_editor/css/*.css')
        .pipe(cleancss())
        .pipe(gulp.dest('./dist/assets/music_score_editor/css'));
})

// 压缩html
gulp.task('minhtml', function() {
    return gulp.src('./abc/*.html')
        .pipe(htmlmin({
            removeComments: true, //清除HTML注释
            collapseWhitespace: true, //压缩HTML
            collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input checked />
            removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: false, //删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: false, //删除<style>和<link>的type="text/css"
            minifyJS: true, //压缩页面JS
            minifyCSS: true //压缩页面CSS
        }))
        .pipe(gulp.dest('./dist'));
})

// 压缩图片
// gulp.task('minimg', function () {
//     return gulp.src('./assets/img/*.{jpg,png}')
//         .pipe(smushit())
//         .pipe(gulp.dest('./dist/assets/img'));
// });

// 批量复制文件
gulp.task('copy', async function() {
    gulp.src('./abc/assets/music_score_editor/css/font/*.*').pipe(gulp.dest('./dist/assets/music_score_editor/css/font/'));
    // gulp.src('./assets/json/*.json').pipe(gulp.dest('./dist/assets/json'));
    // gulp.src('./*.{png,ico}').pipe(gulp.dest('./dist'));
})

// 明确指定默认构建操作包含的任务，如果不指定默认构建任务，则需要以参数形式指定任务，如：gulp minscript mincss minhtml copy
module.exports.default = gulp.series(gulp.parallel(
    'clean',
    'minscript',
    'mincss',
    'minhtml',
    // 'minimg',
    'copy'
))