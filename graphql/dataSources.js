const fs = require('fs');
const path = require('path');

class DataSources {
  constructor() {
    this.apiData = this.loadData();
  }

  // 加载所有JSON数据文件
  loadData() {
    const jsonDir = path.join(__dirname, '..', 'data');
    const dbFiles = fs.readdirSync(jsonDir);
    const apiData = {};

    dbFiles.forEach((file) => {
      if (file.endsWith('.json')) {
        const filePath = path.join(jsonDir, file);
        const raw = fs.readFileSync(filePath, 'utf-8');
        const json = JSON.parse(raw);
        const fileName = path.basename(file, '.json');
        apiData[fileName] = json;
      }
    });

    return apiData;
  }

  // 保存数据到文件
  saveData(fileName, data) {
    const filePath = path.join(__dirname, '..', 'data', `${fileName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    // 重新加载数据
    this.apiData = this.loadData();
  }

  // Blog 相关方法
  getBlogs() {
    return this.apiData.blog?.blogs || [];
  }

  getBlogById(id) {
    const blogs = this.getBlogs();
    return blogs.find(blog => blog.id == id);
  }

  getBlogsByAuthor(author) {
    const blogs = this.getBlogs();
    return blogs.filter(blog => blog.author === author);
  }

  addBlog(blogData) {
    const blogs = this.getBlogs();
    const newBlog = {
      id: Date.now().toString(),
      ...blogData
    };
    blogs.push(newBlog);
    this.saveData('blog', { blogs });
    return newBlog;
  }

  updateBlog(blogData) {
    const blogs = this.getBlogs();
    const index = blogs.findIndex(blog => blog.id == blogData.id);
    if (index !== -1) {
      blogs[index] = { ...blogs[index], ...blogData };
      this.saveData('blog', { blogs });
      return blogs[index];
    }
    throw new Error('Blog not found');
  }

  deleteBlog(id) {
    const blogs = this.getBlogs();
    const index = blogs.findIndex(blog => blog.id == id);
    if (index !== -1) {
      const deletedBlog = blogs[index];
      blogs.splice(index, 1);
      this.saveData('blog', { blogs });
      return deletedBlog;
    }
    throw new Error('Blog not found');
  }

  // Product 相关方法
  getProducts() {
    return this.apiData.product?.products || [];
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find(product => product.id == id);
  }

  getProductsByPrice(maxPrice) {
    const products = this.getProducts();
    return products.filter(product => product.price <= maxPrice);
  }

  addProduct(productData) {
    const products = this.getProducts();
    const newProduct = {
      id: Date.now(),
      ...productData
    };
    products.push(newProduct);
    this.saveData('product', { products });
    return newProduct;
  }

  updateProduct(productData) {
    const products = this.getProducts();
    const index = products.findIndex(product => product.id == productData.id);
    if (index !== -1) {
      products[index] = { ...products[index], ...productData };
      this.saveData('product', { products });
      return products[index];
    }
    throw new Error('Product not found');
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const index = products.findIndex(product => product.id == id);
    if (index !== -1) {
      const deletedProduct = products[index];
      products.splice(index, 1);
      this.saveData('product', { products });
      return deletedProduct;
    }
    throw new Error('Product not found');
  }

  // Project 相关方法
  getProjects() {
    return this.apiData.project?.projects || [];
  }

  getProjectById(id) {
    const projects = this.getProjects();
    return projects.find(project => project.id == id);
  }

  // Wordle 相关方法
  getWordles() {
    return this.apiData.wordle?.wordles || [];
  }

  getWordleById(id) {
    const wordles = this.getWordles();
    return wordles.find(wordle => wordle.id == id);
  }
}

module.exports = DataSources;
