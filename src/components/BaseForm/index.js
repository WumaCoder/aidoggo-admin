const files = require.context("./", true, /\.vue$/); // 批量读取模块文件

const modules = files.keys().reduce((modules, path) => {
  const name = path.replace(/^\.\/(.*)\.vue$/, "$1");
  if (name === "index") return modules;
  const module = files(path);
  modules[name] = module.default;
  return modules;
}, {});

export default modules;
