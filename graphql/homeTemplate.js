const createHomeTemplate = (apiData) => {
  return `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>综合 API Demo - REST + GraphQL</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .header {
          text-align: center;
          margin-bottom: 40px;
          color: white;
        }
        
        .header h1 {
          font-size: 3rem;
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .header p {
          font-size: 1.2rem;
          opacity: 0.9;
        }
        
        .api-section {
          background: white;
          border-radius: 15px;
          padding: 30px;
          margin-bottom: 30px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }
        
        .api-section:hover {
          transform: translateY(-5px);
        }
        
        .api-section h2 {
          color: #667eea;
          margin-bottom: 20px;
          font-size: 2rem;
          border-bottom: 3px solid #667eea;
          padding-bottom: 10px;
        }
        
        .endpoints {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        
        .endpoint {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
          border-left: 4px solid #667eea;
          transition: all 0.3s ease;
        }
        
        .endpoint:hover {
          background: #e9ecef;
          transform: translateX(5px);
        }
        
        .endpoint h3 {
          color: #495057;
          margin-bottom: 10px;
          font-size: 1.1rem;
        }
        
        .endpoint a {
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
          display: inline-block;
          margin-top: 10px;
          padding: 8px 16px;
          background: #667eea;
          color: white;
          border-radius: 5px;
          transition: background 0.3s ease;
        }
        
        .endpoint a:hover {
          background: #5a6fd8;
        }
        
        .graphql-section {
          background: linear-gradient(135deg, #e91e63 0%, #9c27b0 100%);
          color: white;
        }
        
        .graphql-section h2 {
          color: white;
          border-bottom-color: white;
        }
        
        .graphql-section .endpoint {
          background: rgba(255,255,255,0.1);
          border-left-color: white;
          color: white;
        }
        
        .graphql-section .endpoint:hover {
          background: rgba(255,255,255,0.2);
        }
        
        .graphql-section .endpoint h3 {
          color: white;
        }
        
        .graphql-section .endpoint a {
          background: white;
          color: #e91e63;
        }
        
        .graphql-section .endpoint a:hover {
          background: #f8f9fa;
        }
        
        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }
        
        .feature {
          text-align: center;
          padding: 20px;
        }
        
        .feature-icon {
          font-size: 3rem;
          margin-bottom: 15px;
        }
        
        .feature h3 {
          color: #495057;
          margin-bottom: 10px;
        }
        
        .feature p {
          color: #6c757d;
        }
        
        @media (max-width: 768px) {
          .header h1 {
            font-size: 2rem;
          }
          
          .container {
            padding: 15px;
          }
          
          .endpoints {
            grid-template-columns: 1fr;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 综合 API Demo</h1>
          <p>同时提供 REST 和 GraphQL 接口的完整 API 服务</p>
        </div>
        
        <div class="api-section graphql-section">
          <h2>🔮 GraphQL 接口</h2>
          <div class="endpoints">
            <div class="endpoint">
              <h3>GraphQL Playground</h3>
              <p>使用 GraphiQL 界面探索和测试 GraphQL API</p>
              <a href="/graphiql" target="_blank">打开 GraphiQL</a>
            </div>
            <div class="endpoint">
              <h3>简单测试工具</h3>
              <p>不依赖外部库的简单 GraphQL 测试界面</p>
              <a href="/graphql-test" target="_blank">打开测试工具</a>
            </div>
            <div class="endpoint">
              <h3>GraphQL 端点</h3>
              <p>POST 请求到 /graphql 执行 GraphQL 查询</p>
              <a href="/graphql" target="_blank">访问端点</a>
            </div>
          </div>
        </div>
        
        <div class="api-section">
          <h2>📡 REST API 接口</h2>
          <div class="endpoints">
            ${Object.keys(apiData)
              .map(
                (file) => `
              <div class="endpoint">
                <h3>${file.charAt(0).toUpperCase() + file.slice(1)}</h3>
                <p>提供 ${Object.keys(apiData[file]).length} 个数据集合</p>
                ${Object.keys(apiData[file])
                  .map(
                    (key) => `
                  <a href="/api/${file}/${key}" target="_blank">${key}</a>
                `
                  )
                  .join("")}
              </div>
            `
              )
              .join("")}
          </div>
        </div>
        
        <div class="api-section">
          <h2>✨ 特性</h2>
          <div class="features">
            <div class="feature">
              <div class="feature-icon">🔌</div>
              <h3>双接口支持</h3>
              <p>同时提供 REST 和 GraphQL 两种 API 风格</p>
            </div>
            <div class="feature">
              <div class="feature-icon">📊</div>
              <h3>实时数据</h3>
              <p>支持数据的增删改查操作</p>
            </div>
            <div class="feature">
              <div class="feature-icon">🎯</div>
              <h3>灵活查询</h3>
              <p>GraphQL 提供精确的数据查询能力</p>
            </div>
            <div class="feature">
              <div class="feature-icon">🚀</div>
              <h3>高性能</h3>
              <p>基于 JSON Server 的高效数据服务</p>
            </div>
          </div>
        </div>
        
        <div class="api-section">
          <h2>📚 使用示例</h2>
          <div class="endpoints">
            <div class="endpoint">
              <h3>GraphQL 查询示例</h3>
              <pre style="background: #f8f9fa; padding: 15px; border-radius: 5px; overflow-x: auto;">
query {
  blogs {
    id
    title
    author
  }
  products {
    id
    title
    price
  }
}</pre>
            </div>
            <div class="endpoint">
              <h3>REST API 示例</h3>
              <pre style="background: #f8f9fa; padding: 15px; border-radius: 5px; overflow-x: auto;">
GET /api/blog/blogs
GET /api/product/products
GET /api/blog/blogs/1
POST /api/blog/blogs
PUT /api/blog/blogs/1
DELETE /api/blog/blogs/1</pre>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = createHomeTemplate;
