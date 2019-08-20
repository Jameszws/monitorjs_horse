export default {

    type(obj) {
        return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '');
    },

    isFunction(func) {
        return this.type(func) === "Function";
    },

    isArray(list) {
        return this.type(list) === 'Array';
    },

    /**
     * 是否为null
     * @param {String} str 
     */
    isNull(str) {
        return str == undefined || str == '' || str == null;
    },

    /**
     * 对象是否为空
     * @param {*} obj 
     */
    objectIsNull(obj) {
        return JSON.stringify(obj) === "{}";
    },

    /**
     * 是否是对象
     * @param {*} obj 
     */
    isObject(obj){
        return this.type(obj) === "Object";
    }
}