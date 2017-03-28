/**
 * Created by xiaomin on 2017/3/23.
 */
module.exports ={
    entry:{
        animation:"./js/animation.js"
    },
    output:{
        path: __dirname+"/build",
        filename:"[name].js",
        library:"animation",
        libraryTarget:"umd"
    }
}
