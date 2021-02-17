
var date = () => {
    var dateObj = new Date();
    let day = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    month = (month.toString().length == 1) ? "0"+month : month;
    let year = dateObj.getFullYear();
    let date = year+'-'+month+'-'+day;
    return "Date : "+date;
}

module.exports = date;