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
        each(fn) {
            for (let i = 0; i < elements.length; i++) {
                fn.call(null, elements[i], i)
            }
            return this //this就是api对象
        },
        parent() {
            const array = []
            this.each((node) => {
                if (array.indexOf(node.parentNode) === -1) {
                    //如果不在里面就push
                    array.push(node.parentNode)
                }
            })
            return jQuery(array)
        },
        children() {
            const array = []
            this.each((node) => {
                array.push(...node.children)
                //把里面的东西拆开，第一个元素当作第一个参数，第二个元素当作第二个参数
                //等价于
                //array.push(node.children[0],node.children[1],node.children[2]...)
            })
            return jQuery(array)
        },
        print() {
            console.log(elements) //elements 就是对应的元素们
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
        },
        oldApi: selectorOrArray.oldApi,
        //return 里的oldApi获取数组的api
    }

}