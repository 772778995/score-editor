const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleancss = require('gulp-clean-css');
// const smushit = require('gulp-smushit');
const htmlmin = require('gulp-htmlmin');
// const clean = require('gulp-clean');

const fs = require('fs');
const path = require('path');

const srcPath = './abc';
const desPath = './dist';
var tasks = [];

function deleteFile(file_path) {
  let files = []
  if (fs.existsSync(file_path)) {
    files = fs.readdirSync(file_path)
    files.forEach((file, index) => {
      const curPath = file_path + '/' + file
      if (fs.statSync(curPath).isDirectory()) { // 如果是文件夹
        deleteFile(curPath) // 递归删除文件
      } else { // 删除文件
        fs.unlinkSync(curPath)
        // console.log('DEL:', curPath);
      }
    })
    fs.rmdirSync(file_path) // 删除文件夹本身
    // console.log('DEL:', path);
  }
}
deleteFile(desPath);

function traverseFolder(folderPath) {
  // 读取文件夹中的所有文件和子文件夹
  const fileNames = fs.readdirSync(folderPath);
 
  fileNames.forEach(filename => {
    const filePath = path.join(folderPath, filename);
    
    // 判断是否为文件夹
    const isDirectory = fs.statSync(filePath).isDirectory();
 
    if (isDirectory) {
        // console.log('DIR:', filePath);
        // 是文件夹，则递归遍历子文件夹
        traverseFolder(filePath);
    } else {
        // 是文件，则进行相应操作
        // console.log('FILE:', filePath); // 输出文件路径
        // 在这里可以执行其他自定义操作
        buildFile(filePath);
    }
  });
}

traverseFolder(srcPath);

function buildFile(filePath){
    var src_file_path = './' + filePath.replace(/\\/g, '/');
    var file_ext = path.extname(src_file_path);
    var file_path = path.dirname(src_file_path);
    var dis_file_path = file_path.replace(srcPath, desPath);
    // console.log('src_file_path :', src_file_path);
    // console.log('dis_file_path :', dis_file_path);
    // return;
    var task_name = 'task_' + tasks.length;
    tasks.push(task_name);
    switch (file_ext) {
        case '.js':
            gulp.task(
                task_name, ()=>{
                    return gulp.src(src_file_path)
                    .pipe(uglify())
                    .pipe(gulp.dest(dis_file_path))
                    .on('end', ()=>{
                        console.log('builded:', src_file_path);
                    });
                }
            );
        break;
        case '.css':
            gulp.task(
                task_name, ()=>{
                    return gulp.src(src_file_path)
                    .pipe(cleancss())
                    .pipe(gulp.dest(dis_file_path))
                    .on('end', ()=>{
                        console.log('builded:', src_file_path);
                    });
                }
            );
        break;
        case '.html':
            gulp.task(
                task_name, ()=>{
                    return gulp.src(src_file_path)
                    .pipe(htmlmin({
                        removeComments: true, //清除HTML注释
                        collapseWhitespace: true, //压缩HTML
                        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input checked />
                        // removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
                        removeScriptTypeAttributes: false, //删除<script>的type="text/javascript"
                        removeStyleLinkTypeAttributes: false, //删除<style>和<link>的type="text/css"
                        minifyJS: true, //压缩页面JS
                        minifyCSS: true //压缩页面CSS
                    }))
                    .pipe(gulp.dest(dis_file_path))
                    .on('end', ()=>{
                        console.log('builded:', src_file_path);
                    });
                }
            );
        break;
        default:
            gulp.task(
                task_name, ()=>{
                    return gulp.src(src_file_path)
                    .pipe(gulp.dest(dis_file_path))
                    .on('end', ()=>{
                        console.log('builded:', src_file_path);
                    })
                }
            );
        break;
    }
}

console.log('tasks starting... 0/' +  tasks.length);
module.exports.default = gulp.series(...tasks); // gulp.parallel(...tasks);
// return;


// gulp.task('clean', function(){
//     console.log('clean');
//     return gulp.src('./dist/*', {read: false})
//     .pipe(clean()).on('end', ()=>{
//         console.log('clean end');
//     });
// })

// 压缩图片
// gulp.task('minimg', function () {
//     return gulp.src('./assets/img/*.{jpg,png}')
//         .pipe(smushit())
//         .pipe(gulp.dest('./dist/assets/img'));
// });

// 批量复制文件
// gulp.task('copy', async function() {
//     // css icons
//     // await gulp.src('./abc/assets/music_score_editor/css/icons/*.{gif,png}')
//     // .pipe(gulp.dest('./dist/assets/music_score_editor/css/icons'));
// })

// 明确指定默认构建操作包含的任务，如果不指定默认构建任务，则需要以参数形式指定任务，如：gulp minscript mincss minhtml copy

// module.exports.default = gulp.series(
//     'clean',
//     'minscript',
//     // 'minscript_components',
//     // 'mincss',
//     // 'minhtml',
//     // gulp.parallel(
//     //     'minscript',
//     //     'mincss',
//     //     'minhtml',
//     //     // 'minimg',
//     // ),
//     // 'copy'
// )
