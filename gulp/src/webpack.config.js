
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
            // 图片转化，小于8K自动转化为base64的编码
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'},
             // 转化ES6的语法
            { test: /\.js$/, loader: 'babel'},
            // 解析.vue文件
            { test: /\.vue$/, loader: 'vue'},
            //html模板编译
            { test: /\.(html|tpl)$/, loader: 'html-loader' },
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    resolve: {
        root: __dirname,
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.scss', '.vue'],
    }
};

module.exports = webpackConfig;