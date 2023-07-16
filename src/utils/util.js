/**
 * time stamp
 * @param {*} timestamp
 */
const timestampToTime = (timestamp) => {
    let date = new Date(timestamp)  //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-'
    let M =
        (date.getMonth() + 1 < 10 ?
            '0' + (date.getMonth() + 1) :
            date.getMonth() + 1) + '-'
    let D =
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    let h =
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let m =
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
        ':'
    let s =
        date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return Y + M + D + h + m + s
};
/**
 * store localStorage
 */
const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * get localStorage
 */
const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * delete localStorage
 */
const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}

/**
 * set cookie
 **/
function setCookie(name, value, day) {
    let date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + '=' + value + ';expires=' + date;
};

/**
 * get cookie
 **/
function getCookie(name) {
    let reg = RegExp(name + '=([^;]+)');
    let arr = document.cookie.match(reg);
    if (arr) {
        return arr[1];
    } else {
        return '';
    }
};

/**
 * delete cookie
 **/
function delCookie(name) {
    setCookie(name, null, -1);
};

/**
 * export
 **/
export {
    timestampToTime,
    setStore,
    getStore,
    removeStore,
    setCookie,
    getCookie,
    delCookie
}
