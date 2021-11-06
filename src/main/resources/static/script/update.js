//---------------------------------------Exhibition------------------------
function ExhibitionEvent(){
    this.exhibitionWrap = document.querySelector('#exhibition_wrap').innerText;
    this.fileInputWrap = document.querySelector('#file_wrap_template').innerText;
    this.menuWrap = document.querySelector('.menu_wrap');
    this.mainMenuWrap = document.querySelector('.main_menu_wrap');
    this.saveBtn = document.querySelector('.exhibition_save_btn');
    this.deleteBtn = document.querySelector('.exhibition_delete_btn');
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
        new CheckFileType();
    }
}


// ---------------------------------------Contact-------------------------
//컨택트 변경 저장버튼 이벤트
function UpdateContactSaveBtnEvent(){
    this.eventListner();

}
UpdateContactSaveBtnEvent.prototype = {
    eventListner : function(){
        $('.save_btn').off().on('click', function(){
            this.makeFormData();
        }.bind(this))
    },
    makeFormData : function(){
        let formData = new FormData();

        let street = document.querySelector('#contact_street_input').value;
        let houseNumber = document.querySelector('#contact_housenumber_input').value;
        let postcode = document.querySelector('#contact_postcode_input').value;
        let city = document.querySelector('#contact_city_input').value;
        let email = document.querySelector('#contact_email_input').value;
        let phone = document.querySelector('#contact_phone_input').value;
        let homepageOwner = document.querySelector('#contact_homepage_owner_input').value;
        let homepageProducer = document.querySelector('#contact_homepage_producer_input').value;
        let homepageCategory = document.querySelector('#contact_Homepage_category_input').value;
        let liabilityText = document.querySelector('#contact_liability_text_input').value;
        let filteredLiabilityText = liabilityText.replace(/(\n|\r\n)/g, '<br>');
        
        let linksText = document.querySelector('#contact_links_text_input').value;
        let filteredLinksText = linksText.replace(/(\n|\r\n)/g, '<br>');
        
        formData.append("id", 1);
        formData.append("street", street);
        formData.append("houseNumber", houseNumber);
        formData.append("postcode", postcode);
        formData.append("city", city);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("homepageOwner", homepageOwner);
        formData.append("homepageProducer", homepageProducer);
        formData.append("homepageCategory", homepageCategory);
        formData.append("liabilityText", filteredLiabilityText);
        formData.append("linksText", filteredLinksText);
        
        this.sendAjax(formData);
    },
    sendAjax : function(formData){
        var oReq = new XMLHttpRequest();
        oReq.onreadystatechange = function(){
            if(oReq.readyState === 4 && oReq.status === 200){		
                var serverData = JSON.parse(oReq.responseText);
                alert("파일 저장을 완료했습니다.")
                window.location.href='http://localhost:8080/update';
            }
        }.bind(this);
        oReq.open("POST", "/updateContact");
        oReq.send(formData);
    }
}

//컨택트 선택시 변경창 만들어주기
function ContactEvent(){
    this.menuWrap = $('.menu_wrap');
    this.mainMenuWrap = $('.main_menu_wrap');
    this.contactWrap = $('#contact_wrap')[0].innerHTML;
    this.saveBtn = $('.save_btn')[0];
    this.deleteBtn = $('.delete_btn')[0];
    this.connectAjax();
    
}
ContactEvent.prototype = {
    connectAjax : function(){
        var oReq = new XMLHttpRequest();
        oReq.onreadystatechange = function(){
            if(oReq.readyState === 4 && oReq.status === 200){		
                var serverData = JSON.parse(oReq.responseText);
                console.log(serverData);
                this.writeContactWrap(serverData);
                
            }
        }.bind(this);
        oReq.open("GET", "/contact.ajax");
        oReq.send();
    },
    writeContactWrap : function(contactData){
        this.initHtml();
        let filteredLiabilityText = contactData.liabilityText.replace(/<br\s*[\/]?>/gi, '\r\n');
        let filteredLinksText = contactData.linksText.replace(/<br\s*[\/]?>/gi, '\r\n');
        let editContactHtml = this.contactWrap
            .replace('{street}',contactData.street)
            .replace('{housenumber}',contactData.houseNumber)
            .replace('{postcode}',contactData.postcode)
            .replace('{city}',contactData.city)
            .replace('{phone}',contactData.phone)
            .replace('{email}',contactData.email)
            .replace('{homepage_owner}',contactData.homepageOwner)
            .replace('{homepage_producer}',contactData.homepageProducer)
            .replace('{Homepage_category}',contactData.homepageCategory)
            .replace('{liability_text}',filteredLiabilityText)
            .replace('{links_text}',filteredLinksText);
            this.saveBtn.style.display = 'block';
        this.menuWrap.after(editContactHtml);
        new UpdateContactSaveBtnEvent();
    },
    initHtml : function(){
        if(this.menuWrap.nextAll('div').length > 0){
            this.menuWrap.nextAll('div').remove();
        }
        if(this.menuWrap.nextAll('table').length > 0){
            this.menuWrap.nextAll('table').remove();
        }
        this.saveBtn.style.display = 'none';
        this.deleteBtn.style.display = 'none';
    }
}

// ---------------------------------------Biography---------------------

//바이오그라피 삭제버튼 이벤트
function BiographyDeleteBtnEvent(){
    this.checkList = document.querySelectorAll("input[class=biography_item_check]:checked");
    this.eventListner();
}
BiographyDeleteBtnEvent.prototype = {
    eventListner : function(){
        $('.delete_btn').off().on('click', function(){
            var biographyIdArr = new Array();

            this.checkList.forEach(function(element){
                var idNum = Number(element.dataset.biographyid);
                biographyIdArr.push(idNum);
            });

            var oReq = new XMLHttpRequest();
            oReq.onreadystatechange = function(){
                if(oReq.readyState === 4 && oReq.status === 200){		
                    alert("파일삭제에 성공했습니다.");
                    window.location.href='http://localhost:8080/update';
                }
            }
            oReq.open("GET", "/deleteBiographyData?biographyIdArr="+biographyIdArr);
            oReq.send();

        }.bind(this)); 
    
    }
}
//바이오그라피 삭제 선택시 뷰 만들기
function WriteBiographyDeleteView(){
    this.menuWrap = $('.menu_wrap');
    this.biographyDeleteWrap = $('#biography_table_wrap')[0].innerHTML;
    this.biographyDeleteItem = $('#biography_table_item')[0].innerHTML;
    this.categoryName = document.querySelector('#submenu').value;
    this.deleteBtn = $('.delete_btn')[0];
    this.getDeleteItems();
}
WriteBiographyDeleteView.prototype = {
    getDeleteItems : function(){
        var oReq = new XMLHttpRequest();
        oReq.onreadystatechange = function(){
            if(oReq.readyState === 4 && oReq.status === 200){		
                var serverData = JSON.parse(oReq.responseText);
                console.log(serverData);
                this.makeDeleteTable(serverData);
            }
        }.bind(this);
        oReq.open("GET", "/getBiographyDeleteItem?biographyCategory="+this.categoryName);
        oReq.send();
    },
    makeDeleteTable : function(deleteItems){
        let tableItems = "";
        for(i=0; i<deleteItems.biography.length; i++){
            tableItems += this.biographyDeleteItem
                .replace('{id}', deleteItems.biography[i].id)
                .replace('{start_year}', deleteItems.biography[i].start_year)
                .replace('{end_year}', deleteItems.biography[i].end_year)
                .replace('{bio_text}', deleteItems.biography[i].biography_text);
        }
        let biographyDeleteTable = this.biographyDeleteWrap.replace('{item_tr}', tableItems);
        this.menuWrap.after(biographyDeleteTable);
        this.checkboxEvent();
        
    },
    checkboxEvent : function(){
        let biographyCheckbox = $('.biography_item_check');
        biographyCheckbox.change(function(){
            if(biographyCheckbox.is(':checked')===true){
                this.deleteBtn.disabled = false;
                this.deleteBtn.style.backgroundColor="#F7381A";
                new BiographyDeleteBtnEvent();
            }else{
                this.deleteBtn.disabled = true;
                this.deleteBtn.style.backgroundColor="grey";
            }
        }.bind(this))
    }
}
//바이오그라피 변경메뉴 세이브버튼 이벤트
function BiographyModifySaveBtnEvent(biographyId, biographyCategoryId){
    this.biographyId = biographyId;
    this.biographyCategoryId = biographyCategoryId;
    this.eventListner();
}
BiographyModifySaveBtnEvent.prototype = {
    eventListner : function(){
        $('.save_btn').off().on('click', function(){
            this.makeFormData();
        }.bind(this))
    },
    makeFormData : function(){
        let formData = new FormData();
        
        let startYearInput = document.querySelector('#start_year_input');
        let endYearInput = document.querySelector('#end_year_input');
        let textInput = document.querySelector('#biography_text_input');
        var filteredText = textInput.value.replace(/(\n|\r\n)/g, '<br>');
        
        formData.append("id", this.biographyId);
        formData.append("biographycategory_id", this.biographyCategoryId);
        formData.append("start_year", startYearInput.value);
        formData.append("end_year", endYearInput.value);
        formData.append("biography_text", filteredText);

        this.sendAjax(formData);
    },
    sendAjax : function(formData){
        var oReq = new XMLHttpRequest();
	    oReq.onreadystatechange = function(){
            if(oReq.readyState === 4 && oReq.status === 200){		
                var serverData = JSON.parse(this.responseText);
                alert("파일저장에 성공했습니다.");
                window.location.href='http://localhost:8080/update';
            }
        }
        oReq.open("POST", "/biographyModify");
        oReq.send(formData);
    }
}

//바이오그라피 변경메뉴 선택시 뷰 만들기
function WriteBiographyModifyView(){
    this.menuWrap = $('.menu_wrap');
    this.submenuValue = document.querySelector('#submenu').value;
    this.biographyModifyTableWrap = document.querySelector('#biography_modify_table_wrap').innerHTML;
    this.biographyModifyItemWrap = document.querySelector('#biography_modify_table_item').innerHTML;
    this.saveBtn = document.querySelector('.save_btn');
    this.deleteBtn = document.querySelector('.delete_btn');
    this.insertWrap = document.querySelector('#biography_input_template').innerHTML;
    this.getModifyData();
}
WriteBiographyModifyView.prototype = {
    getModifyData : function(){
        var oReq = new XMLHttpRequest();
	    oReq.onreadystatechange = function(){
            if(oReq.readyState === 4 && oReq.status === 200){		
                var serverData = JSON.parse(oReq.responseText);
                this.writeHtml(serverData);
            }
        }.bind(this)
        oReq.open("GET", "/getBiographyDeleteItem?biographyCategory="+this.submenuValue);
        oReq.send();
    },
    writeHtml : function(itemData){
        let itemHtml = '';
        itemData.biography.forEach(element => {
            let currentItemHtml = this.biographyModifyItemWrap
            .replace("{id}", element.id)
            .replace("{start_year}", element.start_year)
            .replace("{end_year}", element.end_year)
            .replace("{bio_text}", element.biography_text)
            itemHtml +=currentItemHtml
        });
        let biographyModifyHtml = this.biographyModifyTableWrap.replace("{item_tr}", itemHtml);
        this.menuWrap.after(biographyModifyHtml);
        this.itemClickEvent(itemData.biographyCategoryId);
    },
    itemClickEvent : function(biographyCategoryId){
        let eventTarget = document.querySelectorAll('.biography_modify_item');
        eventTarget.forEach(element => {
            element.addEventListener('click', function(){
                this.writeModifyItemHtml(element, biographyCategoryId);
                
            }.bind(this))
            
        });
    },
    writeModifyItemHtml : function(element, biographyCategoryId){
        this.initHtml();
        this.saveBtn.style.display = 'block';
        this.menuWrap.after(this.insertWrap);
        let startYearInput = document.querySelector('#start_year_input');
        let endYearInput = document.querySelector('#end_year_input');
        let textInput = document.querySelector('#biography_text_input');
        let filteredTextInput = element.children[3].innerHTML.replace(/<br\s*[\/]?>/gi, '\r\n');
        startYearInput.value = Number(element.children[1].innerText);
        if(element.children[2].innerText != 'null'){
            endYearInput.value = Number(element.children[2].innerText);
        }
        textInput.innerHTML = filteredTextInput;
        new BiographyModifySaveBtnEvent(element.children[0].innerText,biographyCategoryId);
    },
    initHtml : function(){
        if(this.menuWrap.nextAll('div').length > 0){
            this.menuWrap.nextAll('div').remove();
        }
        if(this.menuWrap.nextAll('table').length > 0){
            this.menuWrap.nextAll('table').remove();
        }
        this.saveBtn.style.display = 'none';
        this.deleteBtn.style.display = 'none';
    }
}

//바이오그라피 추가, 삭제, 변경 이벤트
function BiographyDeleteSaveEvent(){
    this.menuWrap = $('.menu_wrap');
    this.deleteSaveValue = $('#delete_insert')[0].value;
    this.biographyDeleteWrap = $('#biography_table_wrap')[0].innerHTML;
    this.biographyDeleteItem = $('#biography_table_item')[0].innerHTML;
    this.biographyInputTemplate = $('#biography_input_template')[0].innerHTML;
    this.saveBtn = $('.save_btn')[0];
    this.deleteBtn = $('.delete_btn')[0];
    this.writeHtml();
}
BiographyDeleteSaveEvent.prototype = {
    writeHtml : function(){
        switch(this.deleteSaveValue){
            case 'delete':
                this.initHtml();
                this.deleteBtn.style.display = 'block';
                new WriteBiographyDeleteView();
                break;
                
            case'insert' : 
                this.initHtml();
                this.menuWrap.after(this.biographyInputTemplate);
                this.saveBtn.style.display = 'block';
                new BiographySaveEvent();
                break;

            case'modify' :
                this.initHtml();
                new WriteBiographyModifyView();
                break;
        }
    },
    initHtml : function(){
        if(this.menuWrap.nextAll('div').length > 0){
            this.menuWrap.nextAll('div').remove();
        }
        if(this.menuWrap.nextAll('table').length > 0){
            this.menuWrap.nextAll('table').remove();
        }
        this.saveBtn.style.display = 'none';
        this.deleteBtn.style.display = 'none';
    }
}

//바이오그라피 새로만들때 세이브버튼 이벤트
function BiographySaveEvent(){
    this.saveBtn = document.querySelector('.save_btn');
    this.newSubtitleInput = document.querySelector('#new_subtitle_input');
    this.startYearInput = document.querySelector('#start_year_input');
    this.endYearInput = document.querySelector('#end_year_input');
    this.bioTextInput = document.querySelector('#biography_text_input')
    this.submenu =document.querySelector('#submenu');
    this.saveBtnAddEventListner();
}
BiographySaveEvent.prototype = {
    saveBtnAddEventListner : function(){
        $('.save_btn').off().on('click', function(){
            if(this.submenu ==="new_subtitle"){
                let newSubtitleResult = this.checkNewSubtitleValue();
                let startYearResult = this.checkStartYearValue();
                let textResult = this.checkTextInputValue();
                if(newSubtitleResult+startYearResult+textResult === 3){
                    this.makeFormData();
                }

            }else{
                let startYearResult = this.checkStartYearValue();
                let textResult = this.checkTextInputValue();
                if(startYearResult+textResult === 2){
                    this.makeFormData();
                }
            }
        }.bind(this));

    },
    makeFormData : function(){
        var formData = new FormData();
        if(this.submenu.value==="new_subtitle"){
            formData.append("biography_category", this.newSubtitleInput.value);

        }else{
            formData.append("biography_category", this.submenu.value)
        }
        formData.append("start_year", this.startYearInput.value);
        formData.append("end_year", this.endYearInput.value);
        var filteredText = this.bioTextInput.value.replace(/(\n|\r\n)/g, '<br>');
        formData.append("biography_text", filteredText);
        this.sendAjax(formData);
    },
    sendAjax :function(formData){
        var oReq = new XMLHttpRequest();
	    oReq.onreadystatechange = function(){
            if(oReq.readyState === 4 && oReq.status === 200){		
                var serverData = JSON.parse(this.responseText);
                alert("파일저장에 성공했습니다.");
            }
        }
        oReq.open("POST", "/saveBiography");
        oReq.send(formData);
    },
    checkNewSubtitleValue : function(){
        if(this.newSubtitleInput.value.length === 0){
            alert('새로운 그룹이름을 확인하세요.')
        }else{
            return 1;
        }
    },
    checkStartYearValue : function(){
        if(this.startYearInput.value.length === 0){
            alert('시작년 입력값을 확인하세요.')
        }else{
            return 1;
        }
    },
    checkTextInputValue : function(){
        if(this.bioTextInput.value.length === 0){
            alert('텍스트 입력값을 확인하세요.')
        }else{
            return 1;
        }
    }

}

//바이오그라피 그룹 순서, 이름변경 메뉴 버튼 이벤트
function BiographyGroupModifyBtnEvent(){
    this.upBtnEvent();
    this.downBtnEvent();
}
BiographyGroupModifyBtnEvent.prototype = {
    upBtnEvent : function(){
        let upBtn=document.querySelectorAll('.biographyGroupModifyItem_upBtn');
        upBtn.forEach(element => {
            element.addEventListener('click', function(){
                this.upBtnFn(event);
                this.upBtnDisable();
            }.bind(this))
        });
    },
    upBtnFn : function(event){
        if(event.target.parentNode.parentNode.previousElementSibling != null){
            
            let currentGroupOrderNoInput = event.target.parentNode.nextElementSibling.nextElementSibling.firstElementChild;
            let newPhotoOrderNoValue = parseInt(currentGroupOrderNoInput.value)-1;
            let currentpreviousSiblingInput = event.target.parentNode.parentNode.previousElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild;
            let newpreviousSiblingValue = parseInt(currentpreviousSiblingInput.value)+1;
            currentpreviousSiblingInput.value=newpreviousSiblingValue;
            
                
            let clone = event.target.parentNode.parentNode.cloneNode(true);
            event.target.parentNode.parentNode.previousElementSibling.insertAdjacentHTML('beforebegin', clone.outerHTML);
            
            event.target.parentElement.parentElement.previousElementSibling.previousElementSibling.children[3].firstElementChild.value = newPhotoOrderNoValue;
    
            event.target.parentNode.parentNode.remove();
            this.upBtnEvent();
            this.upBtnDisable();
            this.downBtnEvent();
            this.downBtnDisable();
        }
    },
    upBtnDisable : function(){
        let OrderNoInput = document.querySelectorAll('.biographyGroupModifyItem_groupOrderNo_input');
        OrderNoInput.forEach(element => {
            let upBtnTarget = element.parentNode.previousElementSibling.previousElementSibling.firstElementChild;
            let downBtnTarget = element.parentNode.previousElementSibling.firstElementChild;
            let firstCheckValue = parseInt(element.value);
            let LastCheckPoint = element.parentNode.parentNode.nextElementSibling;
            if(firstCheckValue === 1){
                upBtnTarget.disabled = true;
            }else if(LastCheckPoint === null){
                downBtnTarget.disabled = true;
            }else{
                upBtnTarget.disabled = false;
                downBtnTarget.disabled = false;
            }
            
        });
    },
    downBtnEvent : function(){
        let downBtn=document.querySelectorAll('.biographyGroupModifyItem_downBtn');
        downBtn.forEach(element => {
            element.addEventListener('click', function(){
                this.downBtnFn(event);
                this.downBtnDisable();
            }.bind(this))
        });
    },
    downBtnFn :function(event){
        if(event.target.parentNode.parentNode.nextElementSibling != null){

            let currentGroupOrderNoNode = event.target.parentNode.nextElementSibling.firstElementChild;
            let newGroupOrderNoValue = parseInt(currentGroupOrderNoNode.value)+1;
            let currentNextSiblingInput = event.target.parentNode.parentNode.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild;
            let newpnextSiblingValue = parseInt(currentNextSiblingInput.value)-1;
            
            currentNextSiblingInput.value=newpnextSiblingValue;
            
                
            let clone = event.target.parentNode.parentNode.cloneNode(true);
            event.target.parentNode.parentNode.nextElementSibling.insertAdjacentHTML('afterend', clone.outerHTML);
            event.target.parentElement.parentElement.nextElementSibling.nextElementSibling.children[3].firstElementChild.value = newGroupOrderNoValue;
    
            event.target.parentNode.parentNode.remove();
            this.downBtnEvent();
            this.downBtnDisable();
            this.upBtnEvent();
            this.upBtnDisable();
        }
    },
    downBtnDisable : function(){
        let OrderNoInput = document.querySelectorAll('.biographyGroupModifyItem_groupOrderNo_input');
        OrderNoInput.forEach(element => {
            let downBtnTarget = element.parentNode.previousElementSibling.firstElementChild;
            let upBtnTarget = element.parentNode.previousElementSibling.previousElementSibling.firstElementChild;
            let LastCheckPoint = element.parentNode.parentNode.nextElementSibling;
            let firstCheckValue = parseInt(element.value);
            if(LastCheckPoint === null){
                downBtnTarget.disabled = true;
            }else if(firstCheckValue === 1){
                upBtnTarget.disabled = true;
            }else{
                downBtnTarget.disabled = false;
                upBtnTarget.disabled = false;
            }
        });
    }
}

//바이오그라피 그룹 순서 변경메뉴에 저장버튼 이벤트
function BiographyGroupModifySendBtnEvent(){
    this.eventListner();
}
BiographyGroupModifySendBtnEvent.prototype={
    eventListner : function(){
        $('.save_btn').off().on('click', function(){
            this.makeFormData();
        }.bind(this));
    },
    makeFormData : function(){
        let photoOrderNoItem = document.querySelectorAll('.biographyGroupModifyItem');
        let dataArr = new Array();
        let formData = new FormData();
        photoOrderNoItem.forEach(element => {
            let elementBiographyCategoryId = parseInt(element.firstElementChild.innerText);
            let elementGroupOrderNo = parseInt(element.children[3].firstElementChild.value);
            let elementGroupName = element.children[4].firstElementChild.value

            let dataObj = {
                biographyCategoryId:elementBiographyCategoryId,
                categoryTurn:elementGroupOrderNo,
                biographyCategory:elementGroupName
            }
            dataArr.push(dataObj);
        });
        let jsonDataArr = JSON.stringify(dataArr);
        formData.append("biographyGroupModifyData",jsonDataArr);
        this.sendAjax(formData);
    },
    sendAjax : function(formData){
        var oReq = new XMLHttpRequest();
        oReq.open("POST", "/biographyGroupModify");
        oReq.onreadystatechange = function(){
            if(oReq.readyState === 4 && oReq.status === 200){		
                alert("그룹 순서와 이름을 변경했습니다.");
                window.location.href='http://localhost:8080/update';
            }
        }
        oReq.send(formData);
    }
}    

//바이오그라피 그룹변경 뷰 만들어주기
function WriteBiographyGroupModifyHtml(){
    this.menuWrap = $('.menu_wrap');
    this.mainMenuValue = document.querySelector('#main_menu').value;
    this.groupModifyWrap = document.querySelector('#biographyGroupModifyWrap').innerText;
    this.groupModyfyItemWrap = document.querySelector('#biographyGroupModifyTableItem').innerText;
    this.getGroupName();
}
WriteBiographyGroupModifyHtml.prototype={
    getGroupName : function(){
        var oReq = new XMLHttpRequest();
	    oReq.onreadystatechange = function(){
            if(oReq.readyState === 4 && oReq.status === 200){		
                var serverData = JSON.parse(oReq.responseText);
                this.writeHtml(serverData.biographyCategoryList);
            }
        }.bind(this);
        oReq.open("GET", "/biography.ajax");
        oReq.send();
    },
    writeHtml : function(serverData){
        let items = '';
        for(i=0; i<serverData.length; i++){
            let currentItemHtml = '';
            if(i===0){
                currentItemHtml = this.groupModyfyItemWrap
                                .replace("{biographyCategoryId}", serverData[i].id)
                                .replace("{upBtnDisabled}", 'disabled')
                                .replace("{downBtnDisabled}", '')
                                .replace("{groupOrderNo}", serverData[i].turn)
                                .replace("{groupName}", serverData[i].biography_category);
                items +=currentItemHtml;
            }else if(i===serverData.length-1){
                currentItemHtml = this.groupModyfyItemWrap
                                .replace("{biographyCategoryId}", serverData[i].id)
                                .replace("{upBtnDisabled}", '')
                                .replace("{downBtnDisabled}", 'disabled')
                                .replace("{groupOrderNo}", serverData[i].turn)
                                .replace("{groupName}", serverData[i].biography_category);
                items +=currentItemHtml;
            }else{
                currentItemHtml = this.groupModyfyItemWrap
                                .replace("{biographyCategoryId}", serverData[i].id)
                                .replace("{upBtnDisabled}", '')
                                .replace("{downBtnDisabled}", '')
                                .replace("{groupOrderNo}", serverData[i].turn)
                                .replace("{groupName}", serverData[i].biography_category);
                items +=currentItemHtml;
            }
        }
        
        let groupModifyHtml = this.groupModifyWrap
                                    .replace("{groupItems}",items);

        if($('.menu_wrap').nextAll('div').length > 0){
            $('.menu_wrap').nextAll('div').css("display", "none");
        }
        if($('.menu_wrap').nextAll('table').length > 0){
            $('.menu_wrap').nextAll('table').css("display", "none");
        }

        this.menuWrap.after(groupModifyHtml);
        new BiographyGroupModifyBtnEvent();
        new BiographyGroupModifySendBtnEvent();
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
        if(this.menuWrap.nextAll('table').length > 0){
            this.menuWrap.nextAll('table').remove();
        }
        if(this.biographySubtitle === 'new_subtitle'){
            this.newSubtitleInput.style.display = 'inline-block';
            this.selectDeleteInsert.style.display = 'none';
            this.menuWrap.after(this.biographyInputTemplate);
            this.saveBtn.style.display = 'block';
            new BiographySaveEvent();
        }else if(this.biographySubtitle === 'default'){
            this.newSubtitleInput.style.display = 'none';
            this.saveBtn.style.display = 'none';
            this.deleteBtn.style.display = 'none';
            this.selectDeleteInsert.style.display = 'none';
        }else if(this.biographySubtitle === 'groupOrderNoModify'){
            this.newSubtitleInput.style.display = 'none';
            this.saveBtn.style.display = 'block';
            this.deleteBtn.style.display = 'none';
            this.selectDeleteInsert.style.display = 'none';
            new WriteBiographyGroupModifyHtml();
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

//저장버튼 이벤트
function NewsSaveBtnEvent(){
    this.saveBtn = $('.save_btn')[0];
}
NewsSaveBtnEvent.prototype = {
    eventListner : function(){
        this.saveBtn.addEventListener('click', function(){
            
            debugger;
        })
    }
}

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
                new NewsSaveBtnEvent();
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
//갤러리 사진 순서변경 메뉴만들기
function ModifyPhotoOrderNoBtnEvent(){
    this.upBtnEvent();
    this.downBtnEvent();
}
ModifyPhotoOrderNoBtnEvent.prototype = {
    upBtnEvent : function(){
        let upBtn=document.querySelectorAll('.photoOrderNoModifyItem_upBtn');
        upBtn.forEach(element => {
            element.addEventListener('click', function(){
                this.upBtnFn(event);
                this.upBtnDisable();
            }.bind(this))
        });
    },
    upBtnFn : function(event){
        if(event.target.parentNode.parentNode.previousElementSibling != null){
            
            let currentPhotoOrderNoInput = event.target.parentNode.nextElementSibling.nextElementSibling.firstElementChild;
            let newPhotoOrderNoValue = parseInt(currentPhotoOrderNoInput.value)-1;
            let currentpreviousSiblingInput = event.target.parentNode.parentNode.previousElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild;
            let newpreviousSiblingValue = parseInt(currentpreviousSiblingInput.value)+1;
            currentpreviousSiblingInput.value=newpreviousSiblingValue;
            
                
            let clone = event.target.parentNode.parentNode.cloneNode(true);
            event.target.parentNode.parentNode.previousElementSibling.insertAdjacentHTML('beforebegin', clone.outerHTML);
            
            event.target.parentElement.parentElement.previousElementSibling.previousElementSibling.children[3].firstElementChild.value = newPhotoOrderNoValue;
    
            event.target.parentNode.parentNode.remove();
            this.upBtnEvent();
            this.upBtnDisable();
            this.downBtnEvent();
            this.downBtnDisable();
        }
    },
    upBtnDisable : function(){
        let OrderNoInput = document.querySelectorAll('.photoOrderNoModifyItem_photoOrderNo_input');
        OrderNoInput.forEach(element => {
            let upBtnTarget = element.parentNode.previousElementSibling.previousElementSibling.firstElementChild;
            let downBtnTarget = element.parentNode.previousElementSibling.firstElementChild;
            let firstCheckValue = parseInt(element.value);
            let LastCheckPoint = element.parentNode.parentNode.nextElementSibling;
            if(firstCheckValue === 1){
                upBtnTarget.disabled = true;
            }else if(LastCheckPoint === null){
                downBtnTarget.disabled = true;
            }else{
                upBtnTarget.disabled = false;
                downBtnTarget.disabled = false;
            }
            
        });
    },
    downBtnEvent : function(){
        let downBtn=document.querySelectorAll('.photoOrderNoModifyItem_downBtn');
        downBtn.forEach(element => {
            element.addEventListener('click', function(){
                this.downBtnFn(event);
                this.downBtnDisable();
            }.bind(this))
        });
    },
    downBtnFn :function(event){
        if(event.target.parentNode.parentNode.nextElementSibling != null){

            let currentPhotoOrderNoNode = event.target.parentNode.nextElementSibling.firstElementChild;
            let newPhotoOrderNoValue = parseInt(currentPhotoOrderNoNode.value)+1;
            let currentNextSiblingNode = event.target.parentNode.parentNode.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild;
            let newpnextSiblingValue = parseInt(currentNextSiblingNode.value)-1;
            
            currentNextSiblingNode.value=newpnextSiblingValue;
            
                
            let clone = event.target.parentNode.parentNode.cloneNode(true);
            event.target.parentNode.parentNode.nextElementSibling.insertAdjacentHTML('afterend', clone.outerHTML);
            event.target.parentElement.parentElement.nextElementSibling.nextElementSibling.children[3].firstElementChild.value = newPhotoOrderNoValue;
    
            event.target.parentNode.parentNode.remove();
            this.downBtnEvent();
            this.downBtnDisable();
            this.upBtnEvent();
            this.upBtnDisable();
        }
    },
    downBtnDisable : function(){
        let OrderNoInput = document.querySelectorAll('.photoOrderNoModifyItem_photoOrderNo_input');
        OrderNoInput.forEach(element => {
            let downBtnTarget = element.parentNode.previousElementSibling.firstElementChild;
            let upBtnTarget = element.parentNode.previousElementSibling.previousElementSibling.firstElementChild;
            let LastCheckPoint = element.parentNode.parentNode.nextElementSibling;
            let firstCheckValue = parseInt(element.value);
            if(LastCheckPoint === null){
                downBtnTarget.disabled = true;
            }else if(firstCheckValue === 1){
                upBtnTarget.disabled = true;
            }else{
                downBtnTarget.disabled = false;
                upBtnTarget.disabled = false;
            }
            
        });
    }
}

//사진 순서 변경메뉴에 저장버튼 이벤트
function GalleryPhotoOrderNoModifySendBtnEvent(){
    this.eventListner();
}
GalleryPhotoOrderNoModifySendBtnEvent.prototype={
    eventListner : function(){
        $('.save_btn').off().on('click', function(){
            this.makeFormData();
        }.bind(this));
    },
    makeFormData : function(){
        let photoOrderNoItem = document.querySelectorAll('.photoOrderNoModifyItem');
        let dataArr = new Array();
        let formData = new FormData();
        photoOrderNoItem.forEach(element => {
            let elementGalleryId = parseInt(element.firstElementChild.innerText);
            let elementPhotoOrderNo = parseInt(element.children[3].firstElementChild.value);
            let dataObj = {
                galleryId:elementGalleryId,
                photoOrderNo:elementPhotoOrderNo
            }
            dataArr.push(dataObj);
        });
        let jsonDataArr = JSON.stringify(dataArr);
        formData.append("photoOrderNoModifyData",jsonDataArr);
        this.sendAjax(formData);
    },
    sendAjax : function(formData){
        var oReq = new XMLHttpRequest();
        oReq.open("POST", "/photoOrderNoModify");
        oReq.onreadystatechange = function(){
            if(oReq.readyState === 4 && oReq.status === 200){		
                alert("사진 순서를 변경했습니다.");
                window.location.href='http://localhost:8080/update';
            }
        }
        oReq.send(formData);
    }
}    
    


//갤러리 사진 삭제 버튼 이벤트
function GalleryDeleteBtnEvent(){
    this.checkList = document.querySelectorAll("input[class=delete_img_check]:checked");
    this.eventListner();
}
GalleryDeleteBtnEvent.prototype={
    eventListner : function(){
        $('.delete_btn').off().on('click', function(){
            var galleryIdArr = new Array();
            
            this.checkList.forEach(function (element) {
                let idNum = Number(element.dataset.galleryid);
                galleryIdArr.push(idNum);
            });
            

            var oReq = new XMLHttpRequest();
            oReq.onreadystatechange = function(){
                if(oReq.readyState === 4 && oReq.status === 200){		
                    alert("파일삭제에 성공했습니다.");
                    window.location.href='http://localhost:8080/update';
                }
            }
            oReq.open("GET", "/deleteGalleryData?galleryIdArr="+galleryIdArr);
            oReq.send();
            
        }.bind(this));
   }
}

//갤러리 SendBtn이벤트
function GallerySendBtnEvent(){
    this.mainMenu = document.querySelector('#main_menu');
    this.submenuValue = document.querySelector('#submenu').value;
    this.newSubtitle = document.querySelector('#new_subtitle_input');
    this.imgTitle = document.querySelector('#img_title');
    this.imgExpl = document.querySelector('#img_explanation_text');
    this.fileTarget = document.querySelector('.gallery_upload_file');
    this.deleteInsertValue = document.querySelector('#delete_insert').value;
    this.galleryId = document.querySelector('#gallery_id').value;
    this.ajaxUrl = '';
    this.ajaxMethod ='';
    this.eventListener();
}
GallerySendBtnEvent.prototype = {
    eventListener : function(){
        $('.save_btn').off().on('click', function() {
            
            let imgNameResult = this.checkImgTitle();
            let imgFileResult = this.checkImgFile();
            let result = imgNameResult+imgFileResult;
            if(result === 2){
                let groupName = '';
                if(document.querySelector('#submenu').value === 'new_subtitle'){
                    let categoryNameResult = this.checkCategoryName();
                    if(categoryNameResult === 1){
                        groupName = this.newSubtitle.value;
                        this.makeFormData(groupName);
                    }
                }else{
                    groupName = document.querySelector('#submenu').value;
                    this.makeFormData(groupName);
                }
            };
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
        if(document.querySelector('#delete_insert').value === "modify"){
            formData.append("galleryId", Number(document.querySelector('#gallery_id').value));
        }
        this.sendAjax(formData);
    },
    makeAjaxUrl : function(){
        if(document.querySelector('#submenu').value ==="new_subtitle" ||document.querySelector('#delete_insert').value ==="insert"){
            this.ajaxUrl = "/save_gallery";
            this.ajaxMethod = "POST";
        }else if(document.querySelector('#delete_insert').value === "modify"){
            this.ajaxUrl = "/update_photoData";
            this.ajaxMethod = "POST";
        }
        
    },
    sendAjax : function(formData){
        this.makeAjaxUrl();
        var oReq = new XMLHttpRequest();
	    oReq.onreadystatechange = function(){
            if(oReq.readyState === 4 && oReq.status === 200){		
                var serverData = JSON.parse(this.responseText);
                alert("파일저장에 성공했습니다.");
            }
        }
        oReq.open(this.ajaxMethod, this.ajaxUrl);
        oReq.send(formData);
    }
}
// 지금 이거 사용하지 않음 사용하게되면 주석 바꿔주고 이 주석이 남아있다면 이거 전체 지우기
function CheckPhotoName(){
    this.photoName = document.querySelector('#img_title');
    this.photoNameInputBlurEvent();
}
CheckPhotoName.prototype = {
    photoNameInputBlurEvent : function(){
        this.photoName.addEventListener('blur', function(){
            var textFilter = /^.{3}$/;
            var textValueCheck = (textFilter).test(this.photoName.value);
            if(!textValueCheck){
                alert("사진 제목을 입력하세요.");
            }
        }.bind(this))
    }
}

//갤러리 서브메뉴 선택후 저장, 삭제, 수정, 사진순서변경 선택시 이벤트
function GalleryDeleteSaveEvent(){
    this.menuWrap = $('.menu_wrap');
    this.mainMenuValue = document.querySelector('#main_menu').value;
    this.submenuValue = document.querySelector('#submenu').value;
    this.deleteSaveValue = $('#delete_insert')[0].value;
    this.deleteTemplate = $('#delete_preview_wrap')[0].innerHTML;
    this.modifyTemplate = $('#modify_preview_wrap')[0].innerHTML;
    this.deleteMenuWrap = $('.delete_img_wrap');
    this.modifyMenuWrap = $('.modify_img_wrap');
    this.deleteList = $('#delete_preview')[0].innerHTML;
    this.modifyList = $('#modify_preview')[0].innerHTML;
    this.deleteBtn = $('.delete_btn')[0];
    this.imgTitle = $('.img_title_wrap')[0];
    this.imgExpl = $('.img_expl_wrap')[0];
    this.fileInput = $('.file_wrap')[0];
    this.saveBtn = $('.save_btn')[0];
    this.thumListTarget = document.querySelector('.item');
    this.thumImgTarget = document.querySelector('.item_thumb');
    this.galleryIdInput = document.querySelector('#gallery_id');
    this.photoOrderNoModifyWrap = document.querySelector('#photoOrderNoModifyWrap').innerText;
    this.photoOrderNoModifyTableItem = document.querySelector('#photoOrderNoModifyTableItem').innerText;
    this.makeDeleteMenu();
}
GalleryDeleteSaveEvent.prototype = {
    makeDeleteMenu : function(){
        switch (this.deleteSaveValue) {
            case 'insert':
                this.htmlInit();
                this.imgTitle.style.display ='block';
                this.imgExpl.style.display ='block';
                this.fileInput.style.display ='block';
                this.saveBtn.style.display ='block';
                new GallerySendBtnEvent();
                break;
                
            case 'delete':
                this.htmlInit();
                this.deleteGroupPhotoData();
                break;
            
            case 'modify':
                this.htmlInit();
                this.modifyGroupPhotoData();
                break;
            
            case 'photoOrderNoModify':
                this.htmlInit();
                this.modifyPhotoOrderNoData();
                break;
        }
        
    },
    checkboxEvent : function(){
        let galleryCheckbox = $('.delete_img_check');
        galleryCheckbox.change(function(){
            if(galleryCheckbox.is(':checked')===true){
                this.deleteBtn.disabled = false;
                this.deleteBtn.style.backgroundColor="#F7381A";
                new GalleryDeleteBtnEvent();
            }else{
                this.deleteBtn.disabled = true;
                this.deleteBtn.style.backgroundColor="grey";
            }
        }.bind(this))
    },
    deleteGroupPhotoData : function(){
        var oReq = new XMLHttpRequest();
            oReq.onreadystatechange = function(){
                if(oReq.readyState === 4 && oReq.status === 200){		
                    var serverData = JSON.parse(oReq.responseText);
                    let deleteItems ="";
                    serverData.forEach(element => {
                        let deleteItem = this.deleteList
                        .replace("{galleryId}",element.id)
                        .replace("{imgPath}","download/"+element.galleryFileId);
                        
                        deleteItems +=deleteItem;
                    });
                    let deleteHtml = this.deleteTemplate.replace("{groupPhotoData}",deleteItems);
                    this.menuWrap.after(deleteHtml);
                    this.deleteBtn.style.display = 'block';
                    this.checkboxEvent();
                }
            }.bind(this)
            oReq.open("GET", "/getGalleryUpdateData?galleryMainMenu="+this.mainMenuValue+"&galleryGroupName="+this.submenuValue);
            oReq.send();
    },
    modifyGroupPhotoData : function(){
        var oReq = new XMLHttpRequest();
            oReq.onreadystatechange = function(){
                if(oReq.readyState === 4 && oReq.status === 200){		
                    var serverData = JSON.parse(oReq.responseText);
                    let modifyItems ="";
                    serverData.forEach(element => {
                        let modifyItem = this.modifyList
                        .replace("{galleryId}",element.id)
                        .replace("{imgPath}","download/"+element.galleryFileId);
                        
                        modifyItems +=modifyItem;
                    });
                    let modifyHtml = this.modifyTemplate.replace("{groupPhotoData}",modifyItems);
                    this.menuWrap.after(modifyHtml);
                    this.saveBtn.style.display = 'block';
                    this.modifyListClickEvent();
                    new GallerySendBtnEvent();
                }
            }.bind(this)
            oReq.open("GET", "/getGalleryUpdateData?galleryMainMenu="+this.mainMenuValue+"&galleryGroupName="+this.submenuValue);
            oReq.send();
    },
    modifyListClickEvent : function(){
        let modifyListTarget = document.querySelectorAll('.modify_list');
        
        modifyListTarget.forEach(element => {
            element.addEventListener('click', function(){
                var oReq = new XMLHttpRequest();
                oReq.onreadystatechange = function(){
                    if(oReq.readyState === 4 && oReq.status === 200){	
                        var photoDetailData = JSON.parse(oReq.responseText);	
                        console.log(photoDetailData);
                        this.htmlInit();
                        this.imgTitle.style.display ='block';
                        this.imgTitle.getElementsByTagName("input")[0].value=photoDetailData.gallery.photoName; 
                        this.imgExpl.style.display ='block';
                        this.imgExpl.getElementsByTagName("input")[0].value=photoDetailData.gallery.photoExpl;
                        this.fileInput.style.display ='block';
                        this.saveBtn.style.display ='block';
                        new CheckFileType();
                        this.thumListTarget.style.display = 'inline-block';
                        this.thumImgTarget.src ='download/'+photoDetailData.gallery.galleryFileId;
                        // document.querySelector('.gallery_upload_file').value ='download/'+photoDetailData.gallery.galleryFileId;
                        new CheckFileType().cancelEvent();
                        this.galleryIdInput.value = photoDetailData.gallery.id;
                    }
                }.bind(this)
                oReq.open("GET", "/getPhotoDetailData?galleryId="+element.firstElementChild.dataset.galleryid);
                oReq.send();
            }.bind(this))
        });
    },
    modifyPhotoOrderNoData :function(){
        var oReq = new XMLHttpRequest();
        oReq.onreadystatechange = function(){
            if(oReq.readyState === 4 && oReq.status === 200){		
                var serverData = JSON.parse(oReq.responseText);
                console.log(serverData);
                let itemHtml ="";

                for(i=0; i<serverData.length; i++){
                    let currentItemHtml = '';
                    if(i===0){
                        currentItemHtml = this.photoOrderNoModifyTableItem
                        .replace("{galleryId}", serverData[i].id)
                        .replace("{upBtnDisabled}", 'disabled')
                        .replace("{downBtnDisabled}", '')
                        .replace("{PhotoOrderNo}", serverData[i].photoOrderNo)
                        .replace("{galleryFileId}", serverData[i].galleryFileId)
                        .replace("{photoName}", serverData[i].photoName);
                        itemHtml +=currentItemHtml;
                    }else if(i===serverData.length-1){
                        currentItemHtml = this.photoOrderNoModifyTableItem
                        .replace("{galleryId}", serverData[i].id)
                        .replace("{upBtnDisabled}", '')
                        .replace("{downBtnDisabled}", 'disabled')
                        .replace("{PhotoOrderNo}", serverData[i].photoOrderNo)
                        .replace("{galleryFileId}", serverData[i].galleryFileId)
                        .replace("{photoName}", serverData[i].photoName);
                        itemHtml +=currentItemHtml;
                    }else{
                        currentItemHtml = this.photoOrderNoModifyTableItem
                        .replace("{galleryId}", serverData[i].id)
                        .replace("{upBtnDisabled}", '')
                        .replace("{downBtnDisabled}", '')
                        .replace("{PhotoOrderNo}", serverData[i].photoOrderNo)
                        .replace("{galleryFileId}", serverData[i].galleryFileId)
                        .replace("{photoName}", serverData[i].photoName);
                        itemHtml +=currentItemHtml;
                    }
                }
                
                let photoOrderNoModifyTableHtml = this.photoOrderNoModifyWrap
                .replace("{photoItems}", itemHtml);

                this.menuWrap.after(photoOrderNoModifyTableHtml);
                this.saveBtn.style.display ='block';
                new ModifyPhotoOrderNoBtnEvent();
                new GalleryPhotoOrderNoModifySendBtnEvent();
            }
        }.bind(this)
        oReq.open("GET", "/getGalleryUpdateData?galleryMainMenu="+this.mainMenuValue+"&galleryGroupName="+this.submenuValue);
        oReq.send();
    },
    htmlInit : function(){
        this.imgTitle.style.display ='none';
        this.imgExpl.style.display ='none';
        this.fileInput.style.display ='none';
        this.saveBtn.style.display ='none';
        this.deleteBtn.style.display = 'none';
        
        if($('.menu_wrap').nextAll('div').length > 0){
            $('.menu_wrap').nextAll('div').css("display", "none");
        }
        if($('.menu_wrap').nextAll('table').length > 0){
            $('.menu_wrap').nextAll('table').css("display", "none");
        }
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

//그룹 순서변경 메뉴에서 저장버튼 이벤트
function GalleryGroupOrderNoModifySendBtnEvent(){
    this.eventListner();
}
GalleryGroupOrderNoModifySendBtnEvent.prototype = {
    eventListner : function(){
        $('.save_btn').off().on('click', function(){
            this.makeFormData();
        }.bind(this));
    },
    makeFormData : function(){
        let groupOrderNoItem = document.querySelectorAll('.groupOrderNoModifyItem');
        let dataArr = new Array();
        let formData = new FormData();
        groupOrderNoItem.forEach(element => {
            let elementGroupName = element.children[3].innerText;
            let elementGroupOrderNo = parseInt(element.children[2].firstElementChild.value);
            let dataObj = {
                groupName:elementGroupName,
                groupOrderNo:elementGroupOrderNo
            }
            dataArr.push(dataObj);
        });
        let jsonDataArr = JSON.stringify(dataArr);
        formData.append("groupOrderNoModifyData",jsonDataArr);
        this.sendAjax(formData);
    },
    sendAjax : function(formData){
        var oReq = new XMLHttpRequest();
        oReq.open("POST", "/galleryGroupOrderNoModify");
        oReq.onreadystatechange = function(){
            if(oReq.readyState === 4 && oReq.status === 200){		
                alert("그룹 순서를 변경했습니다.");
                window.location.href='http://localhost:8080/update';
            }
        }
        oReq.send(formData);
    }
}

//그룹 순서변경 메뉴 버튼 이벤트
function ModifyGroupOrderNoBtnEvent(){
    this.upBtnEvent();
    this.downBtnEvent();
}
ModifyGroupOrderNoBtnEvent.prototype = {
    upBtnEvent : function(){
        let upBtn=document.querySelectorAll('.groupOrderNoModifyItem_upBtn');
        upBtn.forEach(element => {
            element.addEventListener('click', function(){
                this.upBtnFn(event);
                this.upBtnDisable();
            }.bind(this))
        });
    },
    upBtnFn : function(event){
        if(event.target.parentNode.parentNode.previousElementSibling != null){
            
            let currentPhotoOrderNoInput = event.target.parentNode.nextElementSibling.nextElementSibling.firstElementChild;
            let newPhotoOrderNoValue = parseInt(currentPhotoOrderNoInput.value)-1;
            let currentpreviousSiblingInput = event.target.parentNode.parentNode.previousElementSibling.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild;
            let newpreviousSiblingValue = parseInt(currentpreviousSiblingInput.value)+1;
            currentpreviousSiblingInput.value=newpreviousSiblingValue;
            
                
            let clone = event.target.parentNode.parentNode.cloneNode(true);
            event.target.parentNode.parentNode.previousElementSibling.insertAdjacentHTML('beforebegin', clone.outerHTML);
            
            event.target.parentElement.parentElement.previousElementSibling.previousElementSibling.children[2].firstElementChild.value = newPhotoOrderNoValue;
    
            event.target.parentNode.parentNode.remove();
            this.upBtnEvent();
            this.upBtnDisable();
            this.downBtnEvent();
            this.downBtnDisable();
        }
    },
    upBtnDisable : function(){
        let OrderNoInput = document.querySelectorAll('.groupOrderNoModifyItem_groupOrderNo_input');
        OrderNoInput.forEach(element => {
            let upBtnTarget = element.parentNode.previousElementSibling.previousElementSibling.firstElementChild;
            let downBtnTarget = element.parentNode.previousElementSibling.firstElementChild;
            let firstCheckValue = parseInt(element.value);
            let LastCheckPoint = element.parentNode.parentNode.nextElementSibling;
            if(firstCheckValue === 1){
                upBtnTarget.disabled = true;
            }else if(LastCheckPoint === null){
                downBtnTarget.disabled = true;
            }else{
                upBtnTarget.disabled = false;
                downBtnTarget.disabled = false;
            }
            
        });
    },
    downBtnEvent : function(){
        let downBtn=document.querySelectorAll('.groupOrderNoModifyItem_downBtn');
        downBtn.forEach(element => {
            element.addEventListener('click', function(){
                this.downBtnFn(event);
                this.downBtnDisable();
            }.bind(this))
        });
    },
    downBtnFn :function(event){
        if(event.target.parentNode.parentNode.nextElementSibling != null){

            let currentPhotoOrderNoNode = event.target.parentNode.nextElementSibling.firstElementChild;
            let newPhotoOrderNoValue = parseInt(currentPhotoOrderNoNode.value)+1;
            let currentNextSiblingNode = event.target.parentNode.parentNode.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild;
            let newpnextSiblingValue = parseInt(currentNextSiblingNode.value)-1;
            
            currentNextSiblingNode.value=newpnextSiblingValue;
            
                
            let clone = event.target.parentNode.parentNode.cloneNode(true);
            event.target.parentNode.parentNode.nextElementSibling.insertAdjacentHTML('afterend', clone.outerHTML);
            event.target.parentElement.parentElement.nextElementSibling.nextElementSibling.children[2].firstElementChild.value = newPhotoOrderNoValue;
    
            event.target.parentNode.parentNode.remove();
            this.downBtnEvent();
            this.downBtnDisable();
            this.upBtnEvent();
            this.upBtnDisable();
        }
    },
    downBtnDisable : function(){
        let OrderNoInput = document.querySelectorAll('.groupOrderNoModifyItem_groupOrderNo_input');
        OrderNoInput.forEach(element => {
            let downBtnTarget = element.parentNode.previousElementSibling.firstElementChild;
            let upBtnTarget = element.parentNode.previousElementSibling.previousElementSibling.firstElementChild;
            let LastCheckPoint = element.parentNode.parentNode.nextElementSibling;
            let firstCheckValue = parseInt(element.value);
            if(LastCheckPoint === null){
                downBtnTarget.disabled = true;
            }else if(firstCheckValue === 1){
                upBtnTarget.disabled = true;
            }else{
                downBtnTarget.disabled = false;
                upBtnTarget.disabled = false;
            }
        });
    }
}

//갤러리 그룹변경 뷰 만들어주기
function WriteGalleryGroupOrderNoModifyHtml(){
    this.menuWrap = $('.menu_wrap');
    this.mainMenuValue = document.querySelector('#main_menu').value;
    this.groupOrderNoModifyWrap = document.querySelector('#groupOrderNoModifyWrap').innerText;
    this.groupOrderNoModyfyItemWrap = document.querySelector('#groupOrderNoModifyTableItem').innerText;
    this.getGroupName();
}
WriteGalleryGroupOrderNoModifyHtml.prototype={
    getGroupName : function(){
        var oReq = new XMLHttpRequest();
	    oReq.onreadystatechange = function(){
            if(oReq.readyState === 4 && oReq.status === 200){		
                var serverData = JSON.parse(oReq.responseText);
                this.writeHtml(serverData);
            }
        }.bind(this);
        oReq.open("GET", "/getGalleryGroupName?galleryMainMenu="+this.mainMenuValue);
        oReq.send();
    },
    writeHtml : function(serverData){
        let items = '';
        for(i=0; i<serverData.length; i++){
            let currentItemHtml = '';
            if(i===0){
                currentItemHtml = this.groupOrderNoModyfyItemWrap
                                .replace("{upBtnDisabled}", 'disabled')
                                .replace("{groupOrderNo}", serverData[i].groupOrderNo)
                                .replace("{groupName}", serverData[i].groupName);
                items +=currentItemHtml;
            }else if(i===serverData.length-1){
                currentItemHtml = this.groupOrderNoModyfyItemWrap
                                .replace("{upBtnDisabled}", '')
                                .replace("{downBtnDisabled}", 'disabled')
                                .replace("{groupOrderNo}", serverData[i].groupOrderNo)
                                .replace("{groupName}", serverData[i].groupName);
                items +=currentItemHtml;
            }else{
                currentItemHtml = this.groupOrderNoModyfyItemWrap
                                .replace("{upBtnDisabled}", '')
                                .replace("{downBtnDisabled}", '')
                                .replace("{groupOrderNo}", serverData[i].groupOrderNo)
                                .replace("{groupName}", serverData[i].groupName);
                items +=currentItemHtml;
            }
        }
        
        let groupOrderNoModifyHtml = this.groupOrderNoModifyWrap
                                    .replace("{groupItems}",items);

        if($('.menu_wrap').nextAll('div').length > 0){
            $('.menu_wrap').nextAll('div').css("display", "none");
        }
        if($('.menu_wrap').nextAll('table').length > 0){
            $('.menu_wrap').nextAll('table').css("display", "none");
        }

        this.menuWrap.after(groupOrderNoModifyHtml);
        new ModifyGroupOrderNoBtnEvent();
        new GalleryGroupOrderNoModifySendBtnEvent();
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
    this.gallerySaveBtn = $('.save_btn')[0];
    this.galleryDeleteBtn = $('.delete_btn')[0];
    this.photoOrderNoOption =$('.photoOrderNoModifyOption')[0];
    this.checkSubtitle();
}
GallerySubMenuEvent.prototype = {
    //갤러리 서브메뉴 선택에 따른 select와 input창 만들고 없애기
    checkSubtitle : function(){
        
        if(this.menuWrap.nextAll('div').length > 0){
            this.menuWrap.nextAll('div').remove();
        }
        if(this.menuWrap.nextAll('table').length > 0){
            this.menuWrap.nextAll('table').remove();
        }
        if(this.gallerySubtitle === 'new_subtitle'){
            new InitBtn();
            this.newSubtitleInput.style.display = 'inline-block';
            this.selectDeleteInsert.style.display = 'none';
            this.menuWrap.after(this.imgTextareaTemplate + this.fileInput);
            this.gallerySaveBtn.style.display = 'block';
            new CheckFileType();
            new GallerySendBtnEvent();
        }else if(this.gallerySubtitle === 'default'){
            this.newSubtitleInput.style.display = 'none';
            this.gallerySaveBtn.style.display = 'none';
            this.galleryDeleteBtn.style.display = 'none';
            this.selectDeleteInsert.style.display = 'none';
        }else if(this.gallerySubtitle === 'goupOrderNoModify'){
            new InitBtn();
            this.gallerySaveBtn.style.display = 'block';
            this.selectDeleteInsert.style.display = 'none';
            this.newSubtitleInput.style.display = 'none';
            new WriteGalleryGroupOrderNoModifyHtml();
        }else{
            this.newSubtitleInput.style.display = 'none';
            this.selectDeleteInsert.style.display = 'inline-block';
            this.menuWrap.after(this.imgTextareaTemplate + this.fileInput);
            this.gallerySaveBtn.style.display = 'block';
            this.photoOrderNoOption.style.display = 'inline-block';
            new GalleryDeleteSaveEvent();
            new CheckFileType();
        }
    }
}


// -------------------------------------공통 로직------------------
function InitBtn(){
    this.SaveBtn = document.querySelector('.save_btn');
    this.DeleteBtn = document.querySelector('.delete_btn');
    this.deactivateBtn();
}
InitBtn.prototype = {
    deactivateBtn : function(){
        this.SaveBtn.style.display = 'none';
        this.DeleteBtn.style.display = 'none';
    }
}
//서브메뉴 갱신하기
function WriteSubmenu(submenu, mainValue) {
    this.mainValue = mainValue;
    this.submenuTemplate = $('#subtitle_template')[0].innerHTML;
    this.submenuOption = $('#select_options')[0].innerHTML;
    this.mainMenuWrap = $(".main_menu_wrap");
    this.deleteInsertWrap = $('.delete_insert_wrap')[0];
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
        if(this.mainValue === 'Gallery'){
            var galleryGroupOrderNoOption = this.submenuOption
                                            .replace('{options}', "groupOrderNoModify")
                                            .replace('{upper_options}', "die Gruppen-Reihenfolge ändern");
            options += galleryGroupOrderNoOption;                            
        }
        if(this.mainValue === 'biography'){
            var galleryGroupOrderNoOption = this.submenuOption
                                            .replace('{options}', "groupOrderNoModify")
                                            .replace('{upper_options}', "die Gruppen-Reihenfolge & Name ändern");
            options += galleryGroupOrderNoOption;                            
        }
        $(".option_target").after(options);
    },
  
    //subtitle HTML만들기
    writeSubtitles : function(){
        if(this.mainMenuWrap.next().length > 0){
            this.mainMenuWrap.next().remove();
        }
        new InitBtn();
        var upperMainValue =this.mainValue.charAt(0).toUpperCase() + this.mainValue.slice(1);
        var submenuHtml = this.submenuTemplate.replaceAll('{main_value}',upperMainValue);
        this.mainMenuWrap.after(submenuHtml);
        if(this.mainValue === "news"||"press"){
            $(".option_target").next().remove();
        }
        this.makeOptions();
        for(i=0; i<$('.submenu_wrap').nextAll('div').length; i++){
            $('.submenu_wrap').nextAll('div')[i].style.display = 'none';
        }
    }
}

//메인메뉴 선택 이벤트

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
        case 'press':
            var examNewsSubmenu = ['neue Text(new text)','Änderung(modify)','Löschung(delete)'];
            new WriteSubmenu(examNewsSubmenu,mainMenu.value);
            new NewsSubMenuEvent();
            break;
        
        case 'biography':
            var oReq = new XMLHttpRequest();
            oReq.onreadystatechange = function(){
                if(oReq.readyState === 4 && oReq.status === 200){		
                    var serverData = JSON.parse(this.responseText);
                    let biographySubtitle = [];
                    serverData.biographyCategoryList.forEach(function(currentDataEliment){
                        biographySubtitle.push(currentDataEliment.biography_category); 
                    });
                    new WriteSubmenu(biographySubtitle,mainMenu.value);
                }
            }
            oReq.open("GET", "/biography.ajax");
            oReq.send();
            break;
        
        case 'contact':
            new InitBtn();
            new ContactEvent();
            break;
        
        case 'exhibition':
            new InitBtn();
            new ExhibitionEvent();
            break;
    }
};


