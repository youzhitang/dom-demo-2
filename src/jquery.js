window.jQuery = function (selectorOrArray) {
    let elements
    if (typeof selectorOrArray === 'string') {
        elements = document.querySelectorAll(selectorOrArray)
    } else if (selectorOrArray instanceof Array) {
        //接收一个数组
        elements = selectorOrArray
    }
    return {
        oldApi: selectorOrArray.oldApi,
        //return 里的oldApi获取数组的api
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
            array.oldApi = this //this是旧的api

            return jQuery(array)
        },
        end() {
            return this.oldApi //这个this是当前的api (api2)，this.oldApi是api1
        }
    }

}