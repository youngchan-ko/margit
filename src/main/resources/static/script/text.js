function WriteHtml(serverData){
    this.serverData = serverData;
    this.imgContentWrap = document.querySelector('#news_img_content').innerHTML;
    this.textContentWrap = document.querySelector('#news_text_content').innerHTML;
    this.target = document.querySelector('.row');
    this.writeHtml();
}
WriteHtml.prototype = {
    writeHtml : function(){
        let contentsHtml = "";
        let extractTextPattern = /(<([^>]+)>)/gi;
        this.serverData.forEach(element => {
            if(element.titlePhotoId === 0){
                let textContent = this.textContentWrap
                .replaceAll("{textContentId}", element.id)
                .replace("{title}", element.title)
                .replace("{content}", element.contentText.replace(extractTextPattern, ""));
                contentsHtml += textContent
            }else{
                let textContent = this.imgContentWrap
                .replaceAll("{textContentId}", element.id)
                .replace("{textImgFileId}", element.titlePhotoId)
                .replace("{title}", element.title)
                .replace("{content}", element.contentText.replace(extractTextPattern, ""));
                contentsHtml += textContent
            }
            this.target.innerHTML = contentsHtml;
        });
    }
}



document.addEventListener("DOMContentLoaded", function(){
    var oReq = new XMLHttpRequest();
	oReq.onreadystatechange = function(){
		if(oReq.readyState === 4 && oReq.status === 200){	
			let serverData = JSON.parse(this.responseText);
			console.log(serverData);
            new WriteHtml(serverData);
		}
	}
	oReq.open("GET", "/text.ajax");
	oReq.send();
})