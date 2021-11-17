//File 확장자 검사, add, delete
function CheckFileType(){
    this.fileTarget = document.querySelector('.gallery_upload_file');
    this.thumListTarget = document.querySelector('.item');
    this.thumImgTarget = document.querySelector('.item_thumb');
    this.cancelTarget = document.querySelector('.spr_book');
    this.fileTargetEvent();
}
CheckFileType.prototype = {
    fileTargetEvent : function(){
        this.fileTarget.addEventListener('change', function(){
            var image = event.target.files[0];
            var checkImageType = this.valideImageType(image.type);
            if(checkImageType){
                this.thumListTarget.style.display = 'inline-block';
                this.thumImgTarget.src = window.URL.createObjectURL(image);
                this.cancelEvent();
            }else{
                alert("Die Erweiterung der Bilddatei ist nur jpg und png.(이미지 파일의 확장자는 jpg와 png만 가능합니다.)");
            }
        }.bind(this))
    },
    valideImageType : function(imageType){
        const result = ([ 'image/jpeg',
                          'image/png',
                          'image/jpg' ].indexOf(imageType) > -1);
        return result;
    },
    cancelEvent : function(){
        this.cancelTarget.addEventListener('click', function(){
            this.thumListTarget.style.display = 'none';
            this.thumImgTarget.src = "";
            this.fileTarget.value = "";
        }.bind(this))
    }
}


function WriteEditor(){
    this.menuWrap = $('.navbar');
    this.fileInputWrap = document.querySelector('#file_wrap_template').innerText;
    this.editor = document.querySelector('#text_modify_textarea').innerHTML;
    this.writeHtml();
}
WriteEditor.prototype = {
    writeHtml : function(){
        let textInsertHtml = this.editor.replace("{fileInput}", this.fileInputWrap);
        this.menuWrap.after(textInsertHtml);
        new CheckFileType();
    }
}

document.addEventListener("DOMContentLoaded", function(){

    new WriteEditor();
})