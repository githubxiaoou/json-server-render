const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3000;

server.use(cors()); // 允许跨域

// 读取 data 文件夹
const jsonDir = path.join(__dirname, "data");
const dbFiles = fs.readdirSync(jsonDir);

// 存储数据
// apiData[fileName][key] = value
const apiData = {};

dbFiles.forEach((file) => {
  if (file.endsWith(".json")) {
    const filePath = path.join(jsonDir, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(raw);

    const fileName = path.basename(file, ".json");
    apiData[fileName] = json;

    // 为每个 key 创建二级路由 /api/<file>/<key>
    Object.keys(json).forEach((key) => {
      server.get(`/api/${fileName}/${key}`, (req, res) => {
        res.json(json[key]);
      });
    });
  }
});

// 总览页
server.get("/", (req, res) => {
  let html = `
    <html>
    <head>
      <title>JSON Server Resources</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { margin-bottom: 20px; }
        h2 { margin-top: 15px; }
        ul { list-style: none; padding-left: 0; }
        li { margin-bottom: 5px; }
        a { color: #007bff; text-decoration: underline; }
      </style>
    </head>
    <body>
      <h1>JSON Server Resources</h1>
  `;

  Object.keys(apiData).forEach((file) => {
    html += `<h2>${file}</h2><ul>`;
    Object.keys(apiData[file]).forEach((key) => {
      html += `<li><a href="/api/${file}/${key}" target="_blank">${key}</a></li>`;
    });
    html += `</ul>`;
  });

  html += `
    </body>
    </html>
  `;

  res.send(html);
});

server.use(middlewares);

server.listen(PORT, () => {
  console.log(`🚀 JSON Server is running on port ${PORT}`);
});
