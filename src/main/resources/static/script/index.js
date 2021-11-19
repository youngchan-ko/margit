function WriteImg(){
    this.imgWriteTarget = document.querySelector('.img_container');
    this.exhibitionWriteTarget = document.querySelector('.exhibition_container');
    this.imgTemplate = document.querySelector('#home_img_content').innerText;
    this.exhibitionTemplate = document.querySelector('#home_exhibition_content').innerText;
    this.getImg();
}
WriteImg.prototype = {
    getImg : function(){
        var oReq = new XMLHttpRequest();
	    oReq.onreadystatechange = function(){
            if(oReq.readyState === 4 && oReq.status === 200){		
                var serverData = JSON.parse(oReq.responseText);
                console.log(serverData);
                if(serverData.exhibition != null){
                    this.writeExhibition(serverData.exhibition);
                }else{
                    this.writeImgHtml(serverData.galleryFile);
                }
            }
        }.bind(this)
        oReq.open("GET", "/getMainImg.ajax");
        oReq.send();
    },
    writeImgHtml : function(imgData){
        let imgHtml = this.imgTemplate.replace("{file_path}", imgData.id);
        this.imgWriteTarget.insertAdjacentHTML('afterbegin', imgHtml);
    },
    writeExhibition : function(serverData){
        let exhibitionHtml = this.exhibitionTemplate
        .replace("{imgId}", serverData.galleryFileId)
        .replace("{title}", serverData.exhibitionTitle)
        .replace("{place}", serverData.exhibitionPlace)
        .replace("{date}", serverData.exhibitionDate)
        .replaceAll("{link}", serverData.exhibitionLink);

        this.exhibitionWriteTarget.insertAdjacentHTML('afterbegin', exhibitionHtml);
    }
}

document.addEventListener("DOMContentLoaded", function(){
    new WriteImg();
});