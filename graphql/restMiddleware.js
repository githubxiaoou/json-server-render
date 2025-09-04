const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

// 创建REST API中间件
const createRESTMiddleware = (app) => {
  const jsonDir = path.join(__dirname, '..', 'data');
  const dbFiles = fs.readdirSync(jsonDir);
  
  // 存储数据
  const apiData = {};

  dbFiles.forEach((file) => {
    if (file.endsWith('.json')) {
      const filePath = path.join(jsonDir, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const json = JSON.parse(raw);

      const fileName = path.basename(file, '.json');
      apiData[fileName] = json;

      // 为每个 key 创建 RESTful router 并挂载到 /api/<file>
      Object.keys(json).forEach((key) => {
        const router = jsonServer.router({ [key]: json[key] });
        app.use(`/api/${fileName}`, router);
      });
    }
  });

  return apiData;
};

module.exports = createRESTMiddleware;
