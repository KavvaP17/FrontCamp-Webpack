module.exports = function(source) {
    const data = JSON.parse(source);
    const keys = Object.keys(data);
        keys.forEach((key) => {
            if (isNumber(key)) {
                delete data[key];
            }
        });
    return JSON.stringify(data);
};

function isNumber(value) { 
    return !isNaN(parseFloat(value)) 
}