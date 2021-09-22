//ajax로 컨텐츠 받아와서 뿌려주기
//현재는 let testArray로 해놨음
//콘택트 페이지 수정메뉴 만들기

// (function($){
//     writeHtml = {
        

//         writeContents : function(data){
//             let testArray = data;
//             let contentHtml = $('#contact_content_wrap')[0].innerText;
            
//             let content = contentHtml.replace("{Straße}",testArray[0].Straße)
//             .replace("{HausNummer}",testArray[0].HausNummer)
//             .replace("{Postleitzahl}",testArray[0].Postleitzahl)
//             .replace("{Stadt}",testArray[0].Stadt)
//             .replace("{Telefonnummer}",testArray[0].Telefonnummer)
//             .replace("{Email}",testArray[0].Email)
//             .replace("{homepage_owner}",testArray[0].homepage_owner)
//             .replace("{homepage_producer}",testArray[0].homepage_producer)
//             .replace("{Homepage_category}",testArray[0].Homepage_category)
//             .replace("{liability_text}",testArray[0].liability_text)
//             .replace("{links_text}",testArray[0].links_text);
            
//             $('.navbar').after(content);
//         },
//         ajax : function(){
//             $.ajax({
//                 url: "/contact_ajax",
//                 type: "GET",
//                 cache: false,
//                 dataType: "json",
//                 data: "",
//                 success: function(data){
//                     writeContents(data);
//                     console.log(data);
//                 },
//                 error: function (request, status, error){
//                     var msg = "ERROR : " + request.status + "<br>"
//                     msg += + "내용 : " + request.responseText + "<br>" + error;
//                     console.log(msg);
//                 }
//                 });
//         }
//     } 
//     $(document).ready(writeHtml.ajax());
   
// })(jQuery);


function WriteHtml(contactData){
    this.contentHtml = $('#contact_content_wrap')[0].innerText;
    this.afterTarget = $('.navbar');
    this.contactData = JSON.parse(contactData);
    this.writeContent();
}
WriteHtml.prototype = {
    writeContent : function(){
        let content = this.contentHtml.replace("{Straße}",this.contactData.street)
            .replace("{HausNummer}",this.contactData.houseNumber)
            .replace("{Postleitzahl}",this.contactData.postcode)
            .replace("{Stadt}",this.contactData.city)
            .replace("{Telefonnummer}",this.contactData.phone)
            .replace("{Email}",this.contactData.email)
            .replace("{homepage_owner}",this.contactData.homepageOwner)
            .replace("{homepage_producer}",this.contactData.homepageProducer)
            .replace("{Homepage_category}",this.contactData.homepageCategory)
            .replace("{liability_text}",this.contactData.liabilityText)
            .replace("{links_text}",this.contactData.linksText);

        this.afterTarget.after(content);
    }
}

document.addEventListener("DOMContentLoaded", function(){
	var oReq = new XMLHttpRequest();
	oReq.onreadystatechange = function(){
		if(oReq.readyState === 4 && oReq.status === 200){	
            new WriteHtml(this.responseText);	
		}
	}
	oReq.open("GET", "/contact.ajax");
	oReq.send();
});