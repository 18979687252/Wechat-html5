const filters = {
    dateFormate(val){
		if(val){
			let date = new Date(val * 1000)
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDate()
            let hour = myDate.getHours()
            let minute = myDate.getMinutes()
            month = month > 9 ? month : '0' + month
            day = day > 9 ? day : '0' + day
            hour = hour > 9 ? hour : '0' + hour
            minute = minute > 9 ? minute : '0' + minute
            return year + '-' + month + '-' + day
		}else{
			return null
		}
	}
}
export default filters
