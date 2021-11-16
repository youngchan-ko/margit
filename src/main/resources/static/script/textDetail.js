function GetData(){
    this.textContentId = window.location.pathname.split("/textDetail/")[1];
    this.getData();
}
GetData.prototype = {
    getData : function(){
        var oReq = new XMLHttpRequest();
	    oReq.onreadystatechange = function(){
		if(oReq.readyState === 4 && oReq.status === 200){	
			let serverData = JSON.parse(oReq.responseText);
			console.log(serverData);
            this.writeContent(serverData);  
            }
        }.bind(this)
            oReq.open("GET", "/getTextContent.ajax/"+this.textContentId);
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