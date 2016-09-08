
/**
 * 默认全局配置
 */
webpackConfig = {
    entry : { index : '/index.js' },
    output: {
        path: '/script/',
        filename: '[name].js',
    },
    module: {
        loaders: [
            //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    }
};

module.exports = webpackConfig;