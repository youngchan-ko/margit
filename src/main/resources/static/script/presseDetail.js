function GetData(){
    this.presseContentId = window.location.pathname.split("/presseDetail/")[1];
    this.getData();
}
GetData.prototype = {
    getData : function(){
        var oReq = new XMLHttpRequest();
	    oReq.onreadystatechange = function(){
		if(oReq.readyState === 4 && oReq.status === 200){	
			let serverData = JSON.parse(oReq.responseText);
            this.writeContent(serverData);  
            }
        }.bind(this)
            oReq.open("GET", "/getPresseContent.ajax/"+this.presseContentId);
            oReq.send();
    },
    writeContent : function(serverData){
        let titleWrap = document.querySelector('.titleWrap');
        let contentWrap = document.querySelector('.textContentWrap');
        
        titleWrap.innerHTML = serverData.title;
        contentWrap.innerHTML = serverData.contentText;
    }
}

document.addEventListener("DOMContentLoaded", function(){
    new GetData();
})