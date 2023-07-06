// 去除useEffect带参数的提示（警告）
module.exports = {
  plugins: ['react-hooks'],
  rules: {
    ' react-hooks/exhaustive-deps': 0,
  },
};
