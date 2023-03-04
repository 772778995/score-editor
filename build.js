const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-js');
const htmlminifier = require('html-minifier-terser');
const CleanCSS = require('clean-css');

const inputDir = path.join(__dirname, './abc'); // 指定输入目录
const outputDir = path.join(__dirname, './dist'); // 指定输出目录

// 遍历目录中的文件
function traverseDirectory(directory, fileHandler) {
  try {
    const files = fs.readdirSync(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        traverseDirectory(filePath, fileHandler);
      } else if (stat.isFile()) {
        fileHandler(filePath);
      }
    }
  } catch (error) {
    console.error(`Failed to traverse directory: ${directory}`);
    console.error(error);
  }
}

// 处理JavaScript文件
function processJavaScriptFile(filePath) {
  try {
    const code = fs.readFileSync(filePath, 'utf8');
    const result = UglifyJS.minify(code);
    if (result.error) {
      console.error(`Failed to minify JavaScript file: ${filePath}`);
      console.error(result.error);
      return;
    }
    fs.writeFileSync(filePath, result.code);
  } catch (error) {
    console.error(`Failed to process JavaScript file: ${filePath}`);
    console.error(error);
  }
}

// 处理CSS文件
function processCSSFile(filePath) {
  try {
    const code = fs.readFileSync(filePath, 'utf8');
    const result = new CleanCSS().minify(code);
    if (result.errors.length) {
      console.error(`Failed to minify CSS file: ${filePath}`);
      console.error(result.errors);
      return;
    }
    fs.writeFileSync(filePath, result.styles);
  } catch (error) {
    console.error(`Failed to process CSS file: ${filePath}`);
    console.error(error);
  }
}

// 处理HTML文件
async function processHTMLFile(file) {
  try {
    const html = await fs.promises.readFile(file, "utf8");
    const minifiedHTML = htmlminifier.minify(html, {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
    });
    const outputPath = file.replace("src", "dist");
    await fs.promises.writeFile(outputPath, minifiedHTML);
  } catch (error) {
    console.error(`Failed to process HTML file: ${file}`);
    console.error(error);
  }
}

// 处理指定目录中的所有文件
traverseDirectory(inputDir, (filePath) => {
  const extname = path.extname(filePath);
  switch (extname) {
    case '.js':
      processJavaScriptFile(filePath);
      break;
    case '.css':
      processCSSFile(filePath);
      break;
    case '.html':
      processHTMLFile(filePath);
      break;
    default:
      break;
  }
  const outputPath = path.join(
    outputDir,
    path.relative(inputDir, filePath)
  );
  try {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.copyFileSync(filePath, outputPath);
  } catch (error) {
    console.error(`Failed to copy file: ${filePath}`);
    console.error(error);
  }
});