function WriteImg(){
    this.WriteTarget = document.querySelector('.img_contaner');
    this.imgTemplate = document.querySelector('#home_img_content').innerText;
    this.getImg();
}
WriteImg.prototype = {
    getImg : function(){
        var oReq = new XMLHttpRequest();
	    oReq.onreadystatechange = function(){
            if(oReq.readyState === 4 && oReq.status === 200){		
                var serverData = JSON.parse(oReq.responseText);
                console.log(serverData);
                this.writeImgHtml(serverData);
            }
        }.bind(this)
        oReq.open("GET", "/getMainImg.ajax");
        oReq.send();
    },
    writeImgHtml : function(imgData){
        let imgHtml = this.imgTemplate.replace("{file_path}", imgData.id);
        this.WriteTarget.insertAdjacentHTML('afterbegin', imgHtml);
    }
}
document.addEventListener("DOMContentLoaded", function(){
    new WriteImg();
});