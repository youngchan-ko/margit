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