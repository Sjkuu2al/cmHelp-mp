export  function toast(title:string, icon:any = 'none', duration = 1500) {
	if(title) {
		uni.showToast({
		    title,
		    icon,
		    duration
		})
	}
}
