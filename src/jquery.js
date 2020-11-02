window.jQuery = function (selectorOrArray) {
    let elements
    if (typeof selectorOrArray === 'string') {
        elements = document.querySelectorAll(selectorOrArray)
    } else if (selectorOrArray instanceof Array) {
        //接收一个数组
        elements = selectorOrArray
    }
    return {
        addClass: function (className) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add(className)
            }
            return this
        },
        find(selector) {
            let array = []
            for (let i = 0; i < elements.length; i++) {
                const elements2 = Array.from(elements[i].querySelectorAll(selector))
                array = array.concat(elements2)
            }
            //const newApi = jQuery(array)
            //靠jQuery构造出一个新API,如果每次用同一个API得到新的元素会污染之前的API
            return jQuery(array)
        },
    }

}