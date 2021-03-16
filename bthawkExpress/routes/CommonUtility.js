/**
 * File Name : CommonUtility.js
 * File Type : Utility Class file
 * Creator : Raghvendra Awasthi
 * Version : 1.0
 * This class has methods for getting current date, current time and check for any variable wheather it is empty or not.
 */

// Class for Common Utility Methods
process.env.TZ = 'Asia/Kolkata';
class CommonUtility{
    getDate(){
        var dateObj = new Date();
        let day = dateObj.getDate();
        let month = dateObj.getMonth() + 1;
        month = (month.toString().length == 1) ? "0" + month : month;
        let year = dateObj.getFullYear();
        let date = year + '-' + month + '-' + day;
        return date;
    }
    
    getTime(){
        var dateObj = new Date();
        let hour = dateObj.getHours();
        let min = dateObj.getMinutes();
        let sec = dateObj.getSeconds();
    
        hour = (hour.toString().length == 1) ? "0" + hour : hour;
        min = (min.toString().length == 1) ? "0" + min : min;
        sec = (sec.toString().length == 1) ? "0" + sec : sec;
        let time = hour + ':' + min + ':' + sec;
        return time;
    }

    empty(data){
        if(typeof(data) == 'number' || typeof(data) == 'boolean') { 
            return false; 
        }
        if(typeof(data) == 'undefined' || data === null) {
            return true; 
        }
        if(typeof(data.length) != 'undefined') {
            return data.length == 0;
        }
        var count = 0;
        for(var i in data) {
            if(data.hasOwnProperty(i)) {
                count ++;
            }
        }
        return count == 0;
    }

}

module.exports = CommonUtility;

