const files = require.context("./", true, /\.js$/);

const modules = files.keys().reduce((modules, path) => {
  const name = path.replace(/^\.\/(.*)\.js$/, "$1");
  if (name === "index") return modules;
  const module = files(path);
  modules[name] = module;
  return modules;
}, {});

export default modules;
