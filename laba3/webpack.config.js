var path = require('path');
require('babel-polyfill');

module.exports = {
    entry: "./client/app.js", // входная точка - исходный файл
    output: {
        path: path.resolve(__dirname, './public'), // путь к каталогу выходных файлов - папка public
        publicPath: '/public/',
        filename: "bundle.js" // название создаваемого файла
    },
    devServer: {
        historyApiFallback: true,
        port: 8081,
        open: true
    },
    module: {
        rules: [ //загрузчик для jsx
            {
                test: /\.jsx?$/, // определяем тип файлов
                exclude: /(node_modules)/, // исключаем из обработки папку node_modules
                loader: "babel-loader", // определяем загрузчик
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"] // используемые плагины
                }
            }

        ]
    }
}