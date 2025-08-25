const jsonServer = require("json-server");
const path = require("path");
const fs = require("fs");

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// 读取 data 文件夹
const jsonDir = path.join(__dirname, "data");

// 动态加载每个 json 文件
fs.readdirSync(jsonDir).forEach((file) => {
  if (file.endsWith(".json")) {
    const key = path.basename(file, ".json"); // 文件名作为路由名
    const data = require(path.join(jsonDir, file));

    // 取 json 文件的第一个顶级 key 对应的数据
    // 假设 blog.json = { "blogs": [...] }，那么只取 blogs 数组
    const firstKey = Object.keys(data)[0];
    const resource = { [key]: data[firstKey] };

    const router = jsonServer.router(resource);
    server.use(`/api/${key}`, router);
  }
});

server.use(middlewares);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 JSON Server is running on port ${PORT}`);
});
