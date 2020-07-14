import Vue from "vue"
var imageHash=Vue.filter('imageHash',function(data){
        data =Number(data).toFixed(3)
        var newStr=parseFloat(data)
        return newStr
})
export default imageHash