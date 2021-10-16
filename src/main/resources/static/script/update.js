//---------------------------------------Exhibition------------------------
function ExhibitionEvent(){
    this.exhibitionWrap = document.querySelector('#exhibition_wrap').innerText;
    this.fileInputWrap = document.querySelector('#file_wrap_template').innerText;
    this.menuWrap = document.querySelector('.menu_wrap');
    this.mainMenuWrap = document.querySelector('.main_menu_wrap');
    this.saveBtn = document.querySelector('.save_btn');
    this.deleteBtn = document.querySelector('.delete_btn');
    this.writeModifyMenu();
}
ExhibitionEvent.prototype = {
    checkServer : function(){
        if(this.mainMenuWrap.nextAll('div').length > 0){
            this.mainMenuWrap.nextAll('div').style.display = 'none';
        }
        // 여기서 결과값에 따라서 버튼 보이기 해주면 좋을듯
        // 현재는 this.writeNewInfo(),this.writeModifyMenu()에서 따로만들었음.
    },
    writeNewInfo : function(){
        this.menuWrap.insertAdjacentHTML('afterend', this.fileInputWrap + this.exhibitionWrap);
        this.saveBtn.style.display = 'block';
        new CheckFileType();
    },
    writeModifyMenu : function(){
        this.menuWrap.insertAdjacentHTML('afterend', this.fileInputWrap + this.exhibitionWrap);
        this.saveBtn.style.display = 'inline-block';
        this.deleteBtn.style.display = 'inline-block';
    }
}


// ---------------------------------------Contact-------------------------
//ContactEvent.connectAjax ajax로 데이터 받아와서 뿌리는걸로 바꿔주기
function ContactEvent(){
    this.menuWrap = $('.menu_wrap');
    this.mainMenuWrap = $('.main_menu_wrap');
    this.contactWrap = $('#contact_wrap')[0].innerHTML;
    this.saveBtn = $('.save_btn');
    this.deleteBtn = $('.delete_btn');
    this.connectAjax();
    
}
ContactEvent.prototype = {
    connectAjax : function(){
        let testArray = [
            {"Street":"Humboldtstraße", 
            "HouseNumber":"15", 
            "postcode":"A-4020", 
            "City":"Linz",
            "Email":"fey.flei@aon.at",
            "TelephonNumber":"+43 650 389 4710",
            "homepage_owner":"Margit Feyerer-Fleischanderl",
            "homepage_producer":"Youngchan Kim",
            "Homepage_category":"Persönliche Homepage der Künstlerin",
            "liability_text":"Sämtliche Texte auf der Website wurden sorgfältig geprüft. Dessen ungeachtet kann keine Garantie für Richtigkeit, Vollständigkeit und Aktualität der Angaben übernommen werden.",
            "links_text":"Links auf diese Website - auch auf Seiten in der Tiefe - sind erwünscht. Eine Übernahme des Hauptfensters in ein Frame-Set des Linksetzers ist unzulässig. Eigene Links auf fremde Seiten stellen nur Wegweiser zu diesen Seiten dar; sie werden deshalb regelmäßig mittels externem Link in einem eigenen Browserfenster dargestellt. Der Herausgeber identifiziert sich nicht mit dem Inhalt der Seiten, auf die gelinkt wird und übernimmt dafür keine Haftung; er setzt bewusst auch Links auf Seiten, auf denen andere Meinungen vertreten werden, um dem Leser ein möglichst breites Spektrum zu bieten. Sollte eine der Seiten, auf die gelinkt wird, bedenkliche oder rechtswidrige Inhalte aufweisen, wird um Mitteilung ersucht; in einem solchen Falle wird der Link sofort gelöscht."
            }
        ];
        this.writeContactWrap(testArray);
    },

    writeContactWrap : function(contactData){
        if(this.mainMenuWrap.nextAll('div').length > 0){
            this.mainMenuWrap.nextAll('div').css('display','none');
        }
        
        let editContactHtml = this.contactWrap
            .replace('{street}',contactData[0].Street)
            .replace('{housenumber}',contactData[0].HouseNumber)
            .replace('{postcode}',contactData[0].postcode)
            .replace('{city}',contactData[0].City)
            .replace('{phone}',contactData[0].TelephonNumber)
            .replace('{email}',contactData[0].Email)
            .replace('{homepage_owner}',contactData[0].homepage_owner)
            .replace('{homepage_producer}',contactData[0].homepage_producer)
            .replace('{Homepage_category}',contactData[0].Homepage_category)
            .replace('{liability_text}',contactData[0].liability_text)
            .replace('{links_text}',contactData[0].links_text);
        this.deleteBtn.css('display', 'none');
        this.saveBtn.css('display', 'block');
        this.menuWrap.after(editContactHtml);
    }
}

// ---------------------------------------Biography---------------------

function BiographyDeleteSaveEvent(){
    this.menuWrap = $('.menu_wrap');
    this.deleteSaveValue = $('#delete_insert')[0].value;
    this.biographyDeleteWrap = $('#biography_table_wrap')[0].innerHTML;
    this.biographyDeleteItem = $('#biography_table_item')[0].innerHTML;
    this.biographyInputTemplate = $('#biography_input_template')[0].innerHTML;
    this.saveBtn = $('.save_btn')[0];
    this.deleteBtn = $('.delete_btn')[0];
    this.makeDeleteMenu();
}
BiographyDeleteSaveEvent.prototype = {
    makeDeleteMenu : function(){
        if(this.menuWrap.nextAll('div').length > 0){
            this.menuWrap.nextAll('div').remove();
        }
        if(this.menuWrap.nextAll('table').length > 0){
            this.menuWrap.nextAll('table').remove();
        }
       
        switch(this.deleteSaveValue){
            case 'delete':
                var biographyDeleteTable = this.makeTable();
                this.menuWrap.after(biographyDeleteTable);
                this.saveBtn.style.display = 'none';
                this.deleteBtn.style.display = 'block';
                this.checkboxEvent();
                break;
                
            case'insert' : 
                this.menuWrap.after(this.biographyInputTemplate);
                this.saveBtn.style.display = 'block';
                this.deleteBtn.style.display = 'none';
                break;
        }
    },
    makeTable : function(){
        let testArray = [
            {"id": 1, "start_year": 2000, "end_year": 2000, "bio_text": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},
            {"id": 2, "start_year": 2002, "end_year": 2004, "bio_text": "bbbbbbbbbbbbbbbbbbbbbbbbbbb"},
            {"id": 3, "start_year": 2020, "end_year": 2021, "bio_text": "ccccccccccccccccccccccccccc"}
        ];
        let tableItems = "";
        for(i=0; i<testArray.length; i++){
            tableItems += this.biographyDeleteItem.replace('{id}', testArray[i].id)
                                    .replace('{start_year}', testArray[i].start_year)
                                    .replace('{end_year}', testArray[i].end_year)
                                    .replace('{bio_text}', testArray[i].bio_text);
        }
        let biographyDeleteTable = this.biographyDeleteWrap.replace('{item_tr}', tableItems);
        return(biographyDeleteTable);
    },
    checkboxEvent : function(){
        let biographyCheckbox = $('.biography_item_check');
        biographyCheckbox.change(function(){
            if(biographyCheckbox.is(':checked')===true){
                this.deleteBtn.disabled = false;
                this.deleteBtn.style.backgroundColor="#F7381A";
            }else{
                this.deleteBtn.disabled = true;
                this.deleteBtn.style.backgroundColor="grey";
            }
        }.bind(this))
    }
}

// 바이오그라피 서브메뉴 선택에따른 뷰
function BiographySubMenuEvent(){
    this.menuWrap = $('.menu_wrap');
    this.biographySubtitle = $('#submenu')[0].value;
    this.newSubtitleInput = $('.new_subtitle_input_wrap')[0];
    this.selectDeleteInsert = $('.delete_insert_wrap')[0];
    this.biographyInputTemplate = $('#biography_input_template')[0].innerHTML;
    this.saveBtn = $('.save_btn')[0];
    this.deleteBtn = $('.delete_btn')[0];
    this.checkSubtitle();
}
BiographySubMenuEvent.prototype = {
    checkSubtitle : function(){
        if(this.menuWrap.nextAll('div').length > 0){
            this.menuWrap.nextAll('div').remove();
        }
        if(this.biographySubtitle === 'new_subtitle'){
            this.newSubtitleInput.style.display = 'inline-block';
            this.selectDeleteInsert.style.display = 'none';
            this.menuWrap.after(this.biographyInputTemplate);
            this.saveBtn.style.display = 'block';
            
        }else if(this.biographySubtitle === 'default'){
            this.newSubtitleInput.style.display = 'none';
            this.saveBtn.style.display = 'none';
            this.deleteBtn.style.display = 'none';
            this.selectDeleteInsert.style.display = 'none';
        }else{
            this.newSubtitleInput.style.display = 'none';
            this.selectDeleteInsert.style.display = 'inline-block';
            this.menuWrap.after(this.biographyInputTemplate);
            this.saveBtn.style.display = 'block';
            new BiographyDeleteSaveEvent();
            
        }
    }
}


// ---------------------------------------Text---------------------
//뉴스 서브메뉴 선택에 따른 뷰 보여주기
//수정 선택시에 데이터 받아서 채워주기 변경해야함.
function NewsSubMenuEvent(){
    this.menuWrap = $('.menu_wrap');
    this.submenuValue = $('#submenu')[0].value;
    this.textInsertWrap = $('#text_textarea')[0].innerHTML;
    this.saveBtn = $('.save_btn')[0];
    this.deleteBtn = $('.delete_btn')[0];
    this.writeHtml();
}
NewsSubMenuEvent.prototype = {
    //사용자 옵션 선택에 따른 입력,수정,삭제 뷰 보여주기
    writeHtml : function(){
        if(this.menuWrap.nextAll('div').length > 0){
            this.menuWrap.nextAll('div').remove();
        }
        console.log(this.submenuValue);
        switch(this.submenuValue){

            case 'default': 
                this.saveBtn.style.display ='none';
                this.deleteBtn.style.display ='none';
                break;

            case 'neue Text(new text)': 
                this.menuWrap.after(this.textInsertWrap);
                this.saveBtn.style.display ='block';
                this.deleteBtn.style.display ='none';
                break;

            case 'Änderung(modify)':
                this.menuWrap.after(this.textInsertWrap);
                this.saveBtn.style.display ='block';
                this.deleteBtn.style.display ='none';
                break;

            case 'Löschung(delete)':
                this.saveBtn.style.display ='none';
                this.deleteBtn.style.display ='block';
                break;
            
        }
    }
}




// ------------------------------------Gallery--------------------
//갤러리 SendBtn이벤트
function GallerySendBtnEvent(){
    this.sendTarget = document.querySelector('.save_btn');
    this.mainMenu = document.querySelector('#main_menu');
    this.submenuValue = document.querySelector('#submenu').value;
    this.newSubtitle = document.querySelector('#new_subtitle_input');
    this.imgTitle = document.querySelector('#img_title');
    this.imgExpl = document.querySelector('#img_explanation_text');
    this.fileTarget = document.querySelector('.gallery_upload_file');
    this.eventListener();
}
GallerySendBtnEvent.prototype = {
    eventListener : function(){
        this.sendTarget.addEventListener('click', function(){
            // event.preventDefault();
            // event.stopImmediatePropagation();
            event.stopPropagation();

            let imgNameResult = this.checkImgTitle();
            let imgFileResult = this.checkImgFile();
            let result = imgNameResult+imgFileResult;
            if(result === 2){
                let groupName = '';
                if(this.submenuValue === 'new_subtitle'){
                    let categoryNameResult = this.checkCategoryName();
                    if(categoryNameResult === 1){
                        groupName = this.newSubtitle.value;
                        this.makeFormData(groupName);
                    }
                }else{
                    groupName = this.submenuValue;
                    this.makeFormData(groupName);
                }
            }
        }.bind(this));
    
    },
    checkCategoryName : function(){
        if(this.newSubtitle.value.length === 0){
            alert('그룹 이름을 확인해 주세요.');
        }else{
            return 1;
        }
    },
    checkImgTitle: function(){
        if(this.imgTitle.value.length === 0){
            alert('사진 이름을 확인해 주세요.');
        }else{
            return 1;
        }
    },
    checkImgFile: function(){
        if(this.fileTarget.files.length === 0){
            alert('사진 파일을 확인해 주세요.');
        }else{
            return 1;
        }
    },
    makeFormData : function(groupName){
        var formData = new FormData();

        formData.append("galleryCategory", this.mainMenu.value);
        formData.append("groupName", groupName);
        formData.append("photoName", this.imgTitle.value);
        formData.append("photoExpl", this.imgExpl.value);
        formData.append("imgFile", this.fileTarget.files[0]);
        this.sendAjax(formData);
    },
    sendAjax : function(formData){
        var oReq = new XMLHttpRequest();
	    oReq.onreadystatechange = function(){
            if(oReq.readyState === 4 && oReq.status === 200){		
                var serverData = JSON.parse(this.responseText);
                alert("파일저장에 성공했습니다.");
                
            }
        }
        oReq.open("POST", "/save_gallery");
        oReq.send(formData);
    }
}
    
//갤러리 서브메뉴 선택후 저장, 삭제 선택시 이벤트
//deleteList템플릿 바꿔주기(함수를 만들어서 호출해주기)
function GalleryDeleteSaveEvent(){
    this.menuWrap = $('.menu_wrap');
    this.deleteSaveValue = $('#delete_insert')[0].value;
    this.deleteTemplate = $('#delete_preview_wrap')[0].innerHTML;
    this.deleteMenuWrap = $('.delete_img_wrap');
    this.deleteList = $('#delete_menu_item')[0].innerHTML;
    this.deleteBtn = $('.delete_btn')[0];
    this.imgTitle = $('.img_title_wrap')[0];
    this.imgExpl = $('.img_expl_wrap')[0];
    this.fileInput = $('.file_wrap')[0];
    this.saveBtn = $('.save_btn')[0];
    this.makeDeleteMenu();
}
GalleryDeleteSaveEvent.prototype = {
    makeDeleteMenu : function(){
        if(this.deleteSaveValue === 'delete'){
            this.imgTitle.style.display ='none';
            this.imgExpl.style.display ='none';
            this.fileInput.style.display ='none';
            this.saveBtn.style.display ='none';
            this.menuWrap.after(this.deleteTemplate);
            this.deleteBtn.style.display = 'block';
            $('.delete_ul').append(this.deleteList);
            this.checkboxEvent();
        }else{
            if(this.deleteMenuWrap.length > 0){
                this.deleteMenuWrap[0].style.display = 'none';
            }
            this.deleteBtn.style.display = 'none';
            this.imgTitle.style.display ='block';
            this.imgExpl.style.display ='block';
            this.fileInput.style.display ='block';
            this.saveBtn.style.display ='block';
            new GallerySendBtnEvent();
        }
    },
    checkboxEvent : function(){
        let galleryCheckbox = $('.delete_img_check');
        galleryCheckbox.change(function(){
            if(galleryCheckbox.is(':checked')===true){
                this.deleteBtn.disabled = false;
                this.deleteBtn.style.backgroundColor="#F7381A";
            }else{
                this.deleteBtn.disabled = true;
                this.deleteBtn.style.backgroundColor="grey";
            }
        }.bind(this))
    }
}


//갤러리 업데이트시
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


//갤러리 서브폴더 값에따라
//이미지설명 인풋, 파일인풋, 저장버튼 보이기 이벤트
function GallerySubMenuEvent(){
    
    this.menuWrap = $('.menu_wrap');
    this.gallerySubtitle = $('#submenu')[0].value;
    this.newSubtitleInput = $('.new_subtitle_input_wrap')[0];
    this.imgTextareaTemplate = $('#gallery_img_expl')[0].innerHTML;
    this.selectDeleteInsert = $('.delete_insert_wrap')[0];
    this.fileInput = $('#file_wrap_template')[0].innerHTML;
    this.saveBtn = $('.save_btn')[0];
    this.deleteBtn = $('.delete_btn')[0];
    this.checkSubtitle();
}
GallerySubMenuEvent.prototype = {
    //갤러리 서브메뉴 선택에 따른 select와 input창 만들고 없애기
    checkSubtitle : function(){
        
        if(this.menuWrap.nextAll('div').length > 0){
            this.menuWrap.nextAll('div').remove();
        }
        if(this.gallerySubtitle === 'new_subtitle'){
            this.newSubtitleInput.style.display = 'inline-block';
            this.selectDeleteInsert.style.display = 'none';
            this.menuWrap.after(this.imgTextareaTemplate + this.fileInput);
            this.saveBtn.style.display = 'block';
            new CheckFileType();
            new GallerySendBtnEvent();
        }else if(this.gallerySubtitle === 'default'){
            this.newSubtitleInput.style.display = 'none';
            this.saveBtn.style.display = 'none';
            this.deleteBtn.style.display = 'none';
            this.selectDeleteInsert.style.display = 'none';
        }else{
            this.newSubtitleInput.style.display = 'none';
            this.selectDeleteInsert.style.display = 'inline-block';
            this.menuWrap.after(this.imgTextareaTemplate + this.fileInput);
            this.saveBtn.style.display = 'block';
            new GalleryDeleteSaveEvent();
            new CheckFileType();
        }
    }
}


// -------------------------------------공통 로직------------------


//서브메뉴 갱신하기
function WriteSubmenu(submenu, mainValue) {
    this.mainValue = mainValue;
    this.submenuTemplate = $('#subtitle_template')[0].innerHTML;
    this.submenuOption = $('#select_options')[0].innerHTML;
    this.mainMenuWrap = $(".main_menu_wrap");
    this.deleteInsertWrap = $('.delete_insert_wrap')[0];
    this.saveBtn = $('.save_btn')[0];
    this.deleteBtn = $('.delete_btn')[0];
    this.submenu = submenu;
    this.writeSubtitles();
}
WriteSubmenu.prototype = {
    //subtitle option만들기
    makeOptions : function(){
        var options = '';
        for(i=0; i<this.submenu.length; i++){
            var optionValue = this.submenu[i];
            var optionInnerText = optionValue.charAt(0).toUpperCase() + optionValue.slice(1);
            var replaceOptions = this.submenuOption.replace('{options}', optionValue)
                                                          .replace('{upper_options}', optionInnerText);
            options += replaceOptions;
        }
        $(".option_target").after(options);
    },
  
    //subtitle HTML만들기
    writeSubtitles : function(){
        if(this.mainMenuWrap.next().length > 0){
            this.mainMenuWrap.next().remove();
        }
        this.saveBtn.style.display = 'none';
        this.deleteBtn.style.display = 'none';
        var upperMainValue =this.mainValue.charAt(0).toUpperCase() + this.mainValue.slice(1);
        var submenuHtml = this.submenuTemplate.replaceAll('{main_value}',upperMainValue);
        this.mainMenuWrap.after(submenuHtml);
        if(this.mainValue === "news"){
            $(".option_target").next().remove();
        }
        this.makeOptions();
        for(i=0; i<$('.submenu_wrap').nextAll('div').length; i++){
            $('.submenu_wrap').nextAll('div')[i].style.display = 'none';
        }
    }
}

//메인메뉴 선택 이벤트
//ajax로 Submenu받아와서 바꿔주기
//--------------------------------------------log지우기
function mainMenuEvent(){
    var mainMenu = document.querySelector('#main_menu');
    if($('.menu_wrap').nextAll('div').length > 0){
        $('.menu_wrap').nextAll('div').remove();
    }
    if($('.menu_wrap').nextAll('table').length > 0){
        $('.menu_wrap').nextAll('table').remove();
    }
    switch(mainMenu.value){
        case 'default':
            $('.menu_wrap').nextAll('div').remove();
            for(i=0; i<$('.main_menu_wrap').nextAll('div').length; i++){
                $('.main_menu_wrap').nextAll('div')[i].style.display = 'none';
            }
            for(i=0; i<$('.menu_wrap').nextAll('button').length; i++){
                $('.menu_wrap').nextAll('button')[i].style.display = 'none';
            }
            break;

        case 'skulptur':
        case 'zeichnung': 
        case 'objekt':
            var oReq = new XMLHttpRequest();
            oReq.onreadystatechange = function(){
                if(oReq.readyState === 4 && oReq.status === 200){		
                    var serverData = JSON.parse(this.responseText);
                    console.log(serverData);
                    let gallerySubtitle = [];
                    serverData.forEach(function(currentDataEliment){
                        gallerySubtitle.push(currentDataEliment.groupName); 
                    });
                    new WriteSubmenu(gallerySubtitle,'Gallery');
                }
            }
            oReq.open("GET", "/getGalleryGroupName?galleryMainMenu="+mainMenu.value);
            oReq.send();
            
            break;

        case 'news':
            var examNewsSubmenu = ['neue Text(new text)','Änderung(modify)','Löschung(delete)'];
            new WriteSubmenu(examNewsSubmenu,mainMenu.value);
            break;
        
        case 'biography':
            var examBiographySubmenu = ['Vita','einzelausstellungen','gruppenausstellungen','lesungen','ankäufe - Stipendien'];
            new WriteSubmenu(examBiographySubmenu,mainMenu.value);
            break;
        
        case 'contact':
            new ContactEvent();
            break;
        
        case 'exhibition':
            new ExhibitionEvent();
            break;
    }
};


