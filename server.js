const express = require("express");
const cors = require("cors");
const jsonServer = require("json-server");
const path = require("path");

// 导入自定义模块
const createGraphQLMiddleware = require("./graphql/middleware");
const createRESTMiddleware = require("./graphql/restMiddleware");
const createHomeTemplate = require("./graphql/homeTemplate");

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 设置 GraphQL 路由
app.use("/graphql", createGraphQLMiddleware());

// 设置 REST API 路由
const apiData = createRESTMiddleware(app);

// GraphiQL 界面
app.get("/graphiql", (req, res) => {
  res.sendFile(path.join(__dirname, "graphql", "graphiql.html"));
});

// 简单 GraphQL 测试界面
app.get("/graphql-test", (req, res) => {
  res.sendFile(path.join(__dirname, "graphql", "simple-test.html"));
});

// 主页路由
app.get("/", (req, res) => {
  res.send(createHomeTemplate(apiData));
});

// 健康检查端点
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    services: {
      rest: "active",
      graphql: "active",
    },
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log("🚀 综合 API Demo 服务器启动成功!");
  console.log(`📍 服务地址: http://localhost:${PORT}`);
  console.log(`🔮 GraphQL: http://localhost:${PORT}/graphql`);
  console.log(`🎨 GraphiQL: http://localhost:${PORT}/graphiql`);
  console.log(`📡 REST API: http://localhost:${PORT}/api`);
  console.log(`🏠 主页: http://localhost:${PORT}`);
  console.log("✨ 同时支持 REST 和 GraphQL 接口");
});
