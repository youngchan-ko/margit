//리스트 클릭하면 상세페이지 만들어주기
function ContentClickEvent(){
    this.eventTarget = document.querySelectorAll('.card');
    this.navbar = document.querySelector('.navbar');
    this.listWrap = document.querySelector('.listWrap');
    this.addEventListner();
}
ContentClickEvent.prototype = {
    addEventListner : function(){
        this.eventTarget.forEach(element => {
            element.addEventListener('click', function(){
                event.preventDefault();
                let textContentId = element.dataset.textcontentid;
                window.location.href='http://localhost:8080/textDetail/'+textContentId;
                
            }.bind(this))
        });
    }
    
}

//전체 데이터 목록 쓰기
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
                contentsHtml += textContent;
            }else{
                let textContent = this.imgContentWrap
                .replaceAll("{textContentId}", element.id)
                .replace("{textImgFileId}", element.titlePhotoId)
                .replace("{title}", element.title)
                .replace("{content}", element.contentText.replace(extractTextPattern, ""));
                contentsHtml += textContent;
            }
            this.target.innerHTML = contentsHtml;
        });
        new ContentClickEvent();
    }
}



document.addEventListener("DOMContentLoaded", function(){
    var oReq = new XMLHttpRequest();
	oReq.onreadystatechange = function(){
		if(oReq.readyState === 4 && oReq.status === 200){	
			let serverData = JSON.parse(this.responseText);
            new WriteHtml(serverData);
		}
	}
	oReq.open("GET", "/text.ajax");
	oReq.send();
})