const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: `${__dirname}/src/index.js`, // 唯一入口文件
    output: {
        path: `${__dirname}/public`, // 打包后的文件存放的地方
        filename: 'bundle.js' // 打包后输出文件的文件名
    },
    devtool: 'null',
    mode: 'development',
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'env', 'react', 'es2015'
                        ]
                    }
                },
                exclude: /node_modules/
            }, {
                test: /\.scss|\.css$/,
                loader: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({ filename: 'style.css' }) // 提取出来的样式放在style.css文件中
    ],
    devServer: {
        contentBase: './public', // 本地服务器所加载的页面所在的目录
        historyApiFallback: true, // 不跳转
        hot: false,
        inline: true // 实时刷新
    }

};
