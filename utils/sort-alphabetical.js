module.exports.SortStringProperty = function (array = [], prop) {
    return sorted = array.sort((a,b) => {
        let fa = a[prop].toLowerCase(),
            fb = b[prop].toLowerCase()
        
        if (fa < fb) {
            return -1
        } else if (fa > fb) {
            return 1
        } else {
            return 0
        }
    })
}