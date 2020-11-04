window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
    let elements
    if (typeof selectorOrArrayOrTemplate === 'string') {
        if (selectorOrArrayOrTemplate[0] === '<') {
            //创建div
            elements = [createElement(selectorOrArrayOrTemplate)]
        } else {
            //查找div
            elements = document.querySelectorAll(selectorOrArrayOrTemplate)
        }
    } else if (selectorOrArrayOrTemplate instanceof Array) {
        //接收一个数组
        elements = selectorOrArrayOrTemplate
    }
    function createElement(string) {
        const container = document.createElement('template')
        container.innerHTML = string.trim()
        return container.content.firstChild
    }

    // api 可以操作elements
    const api = Object.create(jQuery.prototype)
    //创建一个对象，这个对象的__proto__为jQuery.prototype
    // 相当于 const api = {__proto__:jQuery.prototype}
    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArrayOrTemplate.oldApi
    })
    // api.elements= elements
    //api.oldApi=selectorOrArrayOrTemplate.oldApi
    return api
}

jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    jquery: true,
    get(index) {
        return this.elements[index];
    },
    appendTo(node) {
        if (node instanceof Element) {
            this.each(el => node.appendChild(el))
        } else if (node.jquery === true) {
            this.each(el => node.get(0).appendChild(el))
        }
    },
    append(children) {
        if (children instanceof Element) {
            this.get(0).appendChild(children);
        } else if (children instanceof HTMLCollection) {
            for (let i = 0; i < children.length; i++) {
                this.get(0).appendChild(children[i])
            }
        } else if (children.jquery === true) {
            children.each(node => this.get(0).appendChild(node))
        }
    },
    addClass(className) {
        for (let i = 0; i < this.elements.length; i++) {
            const element = this.elements[i]
            element.classList.add(className)
        }
        return this
    },
    each(fn) {
        for (let i = 0; i < this.elements.length; i++) {
            fn.call(null, this.elements[i], i)
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
        this.each(node => {
            if (array.indexOf(node.parentNode) === -1) {
                array.push(...node.children);
            }
        })
        return jQuery(array)
    },
    print() {
        console.log(this.elements) //elements 就是对应的元素们
    },
    find(selector) {
        let array = []
        for (let i = 0; i < this.elements.length; i++) {
            const elements2 = Array.from(this.elements[i].querySelectorAll(selector))
            array = array.concat(this.elements2)
        }
        array.oldApi = this //this是旧的api

        return jQuery(array)
    },
    end() {
        return this.oldApi //这个this是当前的api (api2)，this.oldApi是api1
    },


}