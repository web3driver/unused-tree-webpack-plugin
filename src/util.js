function _deepCopy(srcObj, obj) {
    let _res = srcObj || {};
    Object.keys(obj).map(function (v) {
        if (_isObject(obj[v])) {
            _res[v] = _deepCopy(_res[v], obj[v])
        } else {
            _res[v] = obj[v]
        }
    })
    return _res
}

function _isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

module.exports = {
    deepCopy: _deepCopy
}