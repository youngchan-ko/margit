document.addEventListener("DOMContentLoaded", function(){
	var oReq = new XMLHttpRequest();
	oReq.onreadystatechange = function(){
		if(oReq.readyState === 4 && oReq.status === 200){	
            console.log(this.responseText);	
		}
	}
	oReq.open("GET", "/biography.ajax");
	oReq.send();
});