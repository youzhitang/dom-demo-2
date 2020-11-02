window.JQuery = function (selector) {
    const elements = document.querySelectorAll(selector)
    // api可以操作elements
    return { //直接return一个对象
        addClass: function (className) {
            // 闭包：函数访问外部变量，addClass访问了elements
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add(className)
            }
            return this
            //addClass里的this是api，这里已经不能return api了，因为已经没有api了，它的名字在外面
        }
    }

}