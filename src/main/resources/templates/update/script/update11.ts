

//메인메뉴 갤러리 선택시 갤러리 서브폴더 선택 이벤트
const subMenuEvent = ():void=>{
	const gallerySubtitle = document.querySelector('#gallery_submenu') as HTMLSelectElement; 
	if(gallerySubtitle.value === 'new_subtitle'){
		let galleryNewSubmenuInput:any = document.querySelector('.new_subtitle_input_wrap');
		galleryNewSubmenuInput.style.display = 'block';
	}
}

//메인메뉴 선택 이벤트
const meinMenuEvent = ():void => {
	const mainMenu = document.querySelector('#main_menu') as HTMLSelectElement;
	if(mainMenu.value === 'gallery'){
		let galleryMenuTemplete:any = document.querySelector('.gallery_submenu_wrap');
		galleryMenuTemplete.style.display = 'block';
	}
}




