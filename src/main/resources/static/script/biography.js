function WriteCategory(serverData){
	this.category = serverData.biographyCategoryList;
	this.contentsData = serverData.biographyData;
	this.categoryTarget = document.querySelector('.accordion');
	this.categoryWrap = document.querySelector('#category_wrap').innerText;
	this.contentsWrap = document.querySelector('#contents_wrap').innerText;
	this.writeCategory();

}
WriteCategory.prototype = {
	//카테고리 아코디언, 컨텐츠 만들기
	writeCategory : function(){
		let itemHtml ="";
		this.category.forEach(function(currentElement){
			let biographyText = "";
			let categoryName = currentElement.biography_category;
			if(categoryName != "Vita"){
				let randomId = Math.floor(Math.random() * 1010);
				let categoryAccordion = this.categoryWrap
				.replaceAll("{category}", categoryName)
				.replaceAll("{ramdomId}",randomId);
				

				this.contentsData.forEach(function(currentDataEliment){
					if(currentDataEliment.biography_category == categoryName){
						let withYearHtml = "";
						let contentsHtml = "";
						contentsHtml = this.contentsWrap.replace("{text}",currentDataEliment.biography_text);
						if(currentDataEliment.end_year == null||currentDataEliment.end_year ===""){
							withYearHtml = contentsHtml.replace("{year}",currentDataEliment.start_year);
							biographyText += withYearHtml;
						}else{
							withYearHtml =contentsHtml.replace("{year}",currentDataEliment.start_year+" - "+currentDataEliment.end_year);
							biographyText += withYearHtml;
						}
					}
				}.bind(this))
				
				let finalAccodionContents = categoryAccordion.replace("{contents}", biographyText);
				itemHtml += finalAccodionContents;
			}
		}.bind(this))
			this.categoryTarget.innerHTML = itemHtml;
	},
	writeItems : function(){
		
	}
}

function WriteBasicContents(serverData){
	this.category = serverData.biographyCategoryList;
	this.contentsData = serverData.biographyData;
	this.basicCategoryTarget = document.querySelector('.standard_wrap');
	this.contentsWrap = document.querySelector('#contents_wrap').innerText;
	this.writeBasicContents();
}
WriteBasicContents.prototype = {
	//기본 프로필 작성
	writeBasicContents : function(){
		this.contentsData.forEach(function(currentElement){ 
			if(currentElement.biography_category === "Vita"){
				let withYearHtml = "";
				let basicContentsHtml = "";
				basicContentsHtml = this.contentsWrap.replace("{text}",currentElement.biography_text);
				if(currentElement.end_year != null){
					withYearHtml =basicContentsHtml.replace("{year}",currentElement.start_year+" - "+currentElement.end_year);
					this.basicCategoryTarget.insertAdjacentHTML('afterbegin',withYearHtml);
				}else{
					withYearHtml = basicContentsHtml.replace("{year}",currentElement.start_year);
					this.basicCategoryTarget.insertAdjacentHTML('afterbegin',withYearHtml);
				}
			}
		}.bind(this))
	}
	
}
document.addEventListener("DOMContentLoaded", function(){
	var oReq = new XMLHttpRequest();
	oReq.onreadystatechange = function(){
		if(oReq.readyState === 4 && oReq.status === 200){	
			let serverData = JSON.parse(this.responseText);
            new WriteBasicContents(serverData);	
			new WriteCategory(serverData);
		}
	}
	oReq.open("GET", "/biography.ajax");
	oReq.send();
});