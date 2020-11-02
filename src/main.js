JQuery('.test') //不返回元素们，返回api对象
    //既然先声明了api又马上用了api，那就不声明变量了
    .addClass('red') //addClass前面传了什么this就是什么
    .addClass('blue') //这里的this就是api
    .addClass('green')// 链式操作：用api调了一个函数，这个函数再返回api

// obj.fn(p1) //函数里的this就是obj
// obj.fn.call(obj, p1)