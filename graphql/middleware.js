const { graphql } = require("graphql");
const schema = require("./schema");
const DataSources = require("./dataSources");

// 创建GraphQL中间件
const createGraphQLMiddleware = () => {
  return async (req, res) => {
    // 只处理 POST 请求
    if (req.method !== "POST") {
      res
        .status(405)
        .json({ error: "Method not allowed. Use POST for GraphQL queries." });
      return;
    }

    try {
      const { query, variables, operationName } = req.body;

      // 验证查询是否存在
      if (!query) {
        res.status(400).json({
          errors: [{ message: "Missing query parameter" }],
        });
        return;
      }

      // 创建数据源实例
      const dataSources = new DataSources();

      // 执行 GraphQL 查询
      const result = await graphql({
        schema,
        source: query,
        variableValues: variables,
        operationName,
        contextValue: { dataSources },
      });

      // 返回结果
      res.json(result);
    } catch (error) {
      console.error("GraphQL Error:", error);
      res.status(500).json({
        errors: [
          {
            message: error.message,
            stack:
              process.env.NODE_ENV === "development" ? error.stack : undefined,
          },
        ],
      });
    }
  };
};

module.exports = createGraphQLMiddleware;
