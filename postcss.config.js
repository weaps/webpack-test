module.exports = {
  plugins: [
    require('autoprefixer')
  ],
  "preset": [
    [
      'env',
      {
        "targets": {
          "browsers": [
            "last 2 version" // 指定浏览器在最后2个版本里运行
          ]
        }
      }
    ]
  ]
}