# 🚀 综合 API Demo

一个同时提供 **REST** 和 **GraphQL** 接口的完整 API 服务演示项目。

## ✨ 特性

- 🔌 **双接口支持**: 同时提供 REST 和 GraphQL 两种 API 风格
- 📊 **实时数据**: 支持数据的增删改查操作
- 🎯 **灵活查询**: GraphQL 提供精确的数据查询能力
- 🚀 **高性能**: 基于 JSON Server 的高效数据服务
- 🎨 **美观界面**: 现代化的响应式 Web 界面
- 📱 **移动友好**: 完全响应式设计

## 🏗️ 项目结构

```
json-server-render/
├── data/                   # 数据文件目录
│   ├── blog.json          # 博客数据
│   ├── product.json       # 产品数据
│   ├── project.json       # 项目数据
│   └── wordle.json        # Wordle 游戏数据
├── graphql/               # GraphQL 相关模块
│   ├── schema.js          # GraphQL Schema 定义
│   ├── dataSources.js     # 数据源和业务逻辑
│   ├── middleware.js      # GraphQL 中间件
│   ├── restMiddleware.js  # REST API 中间件
│   └── homeTemplate.js    # 主页模板
├── server.js              # 主服务器文件
├── package.json           # 项目配置
└── README.md              # 项目说明
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动服务

```bash
# 生产环境
npm start

# 开发环境（支持热重载）
npm run dev
```

### 3. 访问服务

- 🏠 **主页**: http://localhost:3000
- 🔮 **GraphQL**: http://localhost:3000/graphql
- 📡 **REST API**: http://localhost:3000/api
- 💚 **健康检查**: http://localhost:3000/health

## 📚 API 使用指南

### GraphQL 接口

#### 查询示例

```graphql
# 获取所有博客
query {
  blogs {
    id
    title
    author
    body
  }
}

# 获取所有产品
query {
  products {
    id
    title
    price
    description
  }
}

# 按作者查询博客
query {
  blogsByAuthor(author: "mario") {
    id
    title
    author
  }
}

# 按价格筛选产品
query {
  productsByPrice(maxPrice: 15) {
    id
    title
    price
  }
}
```

#### 修改示例

```graphql
# 添加新博客
mutation {
  addBlog(
    title: "新博客标题"
    body: "博客内容..."
    author: "作者名"
  ) {
    id
    title
    author
  }
}

# 更新博客
mutation {
  updateBlog(
    id: "1"
    title: "更新后的标题"
    body: "更新后的内容"
  ) {
    id
    title
    body
  }
}

# 删除博客
mutation {
  deleteBlog(id: "1") {
    id
    title
  }
}
```

### REST API 接口

#### 博客 API

```bash
# 获取所有博客
GET /api/blog/blogs

# 获取特定博客
GET /api/blog/blogs/1

# 创建新博客
POST /api/blog/blogs
Content-Type: application/json

{
  "title": "新博客标题",
  "body": "博客内容...",
  "author": "作者名"
}

# 更新博客
PUT /api/blog/blogs/1
Content-Type: application/json

{
  "title": "更新后的标题",
  "body": "更新后的内容"
}

# 删除博客
DELETE /api/blog/blogs/1
```

#### 产品 API

```bash
# 获取所有产品
GET /api/product/products

# 获取特定产品
GET /api/product/products/1

# 创建新产品
POST /api/product/products
Content-Type: application/json

{
  "title": "产品名称",
  "description": "产品描述",
  "price": 99,
  "img": "图片URL"
}

# 更新产品
PUT /api/product/products/1
Content-Type: application/json

{
  "price": 89
}

# 删除产品
DELETE /api/product/products/1
```

## 🔧 技术栈

- **Node.js**: 服务器运行环境
- **Express**: Web 应用框架
- **GraphQL**: 查询语言和运行时
- **express-graphql**: Express GraphQL 中间件
- **JSON Server**: 快速创建 REST API
- **CORS**: 跨域资源共享支持

## 📁 数据模型

### Blog (博客)
```json
{
  "id": "唯一标识",
  "title": "博客标题",
  "body": "博客内容",
  "author": "作者名"
}
```

### Product (产品)
```json
{
  "id": "唯一标识",
  "title": "产品名称",
  "description": "产品描述",
  "price": "价格",
  "img": "产品图片URL"
}
```

### Project (项目)
```json
{
  "id": "唯一标识",
  "name": "项目名称",
  "description": "项目描述",
  "status": "项目状态"
}
```

### Wordle (Wordle游戏)
```json
{
  "id": "唯一标识",
  "word": "单词",
  "date": "日期"
}
```

## 🎯 开发说明

### 添加新的数据类型

1. 在 `data/` 目录下创建新的 JSON 文件
2. 在 `graphql/schema.js` 中定义新的 GraphQL 类型
3. 在 `graphql/dataSources.js` 中添加相应的数据访问方法
4. 在 `graphql/schema.js` 中添加查询和修改字段

### 自定义中间件

- GraphQL 中间件: `graphql/middleware.js`
- REST API 中间件: `graphql/restMiddleware.js`
- 主页模板: `graphql/homeTemplate.js`

## 🌟 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📄 许可证

ISC License

---

**享受使用 GraphQL 和 REST 的双重 API 体验！** 🎉
