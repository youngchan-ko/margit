package com.margit.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.margit.model.Biography;
import com.margit.model.BiographyCategory;
import com.margit.model.BiographyData;
import com.margit.model.BiographyDeleteItem;
import com.margit.model.Contact;
import com.margit.model.Gallery;
import com.margit.model.GalleryFile;
import com.margit.model.GalleryGroupNameInterface;
import com.margit.model.GalleryModifyData;
import com.margit.model.GallerySaveData;
import com.margit.model.GalleryUpdateData;
import com.margit.model.GalleryViewData;
import com.margit.model.TextImgSaveData;
import com.margit.model.User;
import com.margit.service.BiographyDeleteService;
import com.margit.service.BiographySaveService;
import com.margit.service.BiographyService;
import com.margit.service.BiographyUpdateService;
import com.margit.service.ContactService;
import com.margit.service.GalleryDeleteService;
import com.margit.service.GallerySaveService;
import com.margit.service.GalleryService;
import com.margit.service.GalleryUpdateService;
import com.margit.service.HomeService;
import com.margit.service.JoinService;

@Controller
public class PageController {

	@Autowired
	private JoinService joinService;
	@Autowired
	private ContactService contactService;
	@Autowired
	private BiographyService biographyService;
	@Autowired
	private BiographySaveService biographySaveService;
	@Autowired
	private BiographyUpdateService biographyUpdateService;
	@Autowired
	private BiographyDeleteService biographyDeleteService;
	@Autowired
	private GallerySaveService gallerySaveService;
	@Autowired
	private GalleryUpdateService galleryUpdateService;
	@Autowired
	private GalleryDeleteService galleryDeleteService;
	@Autowired
	private GalleryService galleryService;
	@Autowired
	private HomeService homeService;
	

	
	@GetMapping({"", "/"})
	public String index() {
		return "index";
	}
	
	@ResponseBody
	@GetMapping({"/getMainImg.ajax"})
	public GalleryFile getMainImg() {
		GalleryFile mainImg = homeService.getmainImg();
		return mainImg;
	}
	
	@GetMapping({"/skulptur"})
	public String skulptur() {
		return "skulptur";
	}
	
	@ResponseBody
	@GetMapping({"/getGalleryViewData"})
	public List<GalleryViewData> getGalleryViewData(
			@RequestParam(required=false) String galleryMainMenu) {
		List<GalleryViewData> galleryViewData = 
				galleryService.getGalleryViewData(galleryMainMenu);
		return galleryViewData;
		
	}
	
	//갤러리 그룹별 모든 이미지 가져오기
	@ResponseBody
	@GetMapping({"/getGalleryUpdateData"})
	public List<Gallery> getGroupPhotoData(
			@RequestParam(required=false) String galleryMainMenu,
			@RequestParam(required=false) String galleryGroupName) {
		List<Gallery> galleryGroupPhotoData = 
				galleryService.getGroupPhotoData(galleryMainMenu, galleryGroupName);
		return galleryGroupPhotoData;
	}
	
	//갤러리 개별 사진데이터 가져오기
	@ResponseBody
	@GetMapping({"/getPhotoDetailData"})
	public GalleryModifyData getPhotoDetailData(
			@RequestParam(required=false) int galleryId) {
		GalleryModifyData photoDetailData = galleryUpdateService.getPhotoDetailData(galleryId);
		return photoDetailData;
	}
	
	@ResponseBody
	@GetMapping({"/deleteGalleryData"})
	public int deleteGalleryData(
			@RequestParam(required = false, value = "galleryIdArr") List<Integer> galleryId) 
			{
		
		galleryDeleteService.deleteGalleryFile(galleryId);
		return 1;
		
	}
	
	
	@ResponseBody
	@PostMapping({"/save_gallery"})
	public int saveGallery(GallerySaveData gallerySaveData) {
		gallerySaveService.saveGallery(gallerySaveData);
		
		return 0;
	}
	
	@ResponseBody
	@PostMapping({"/update_photoData"})
	public int saveGallery(GalleryUpdateData galleryUpdateData) {
		int result = galleryUpdateService.updatePhotoData(galleryUpdateData);
		
		return result;
	}

	@ResponseBody
	@PostMapping({"/photoOrderNoModify"})
	public int updatePhotoOrderNo(@RequestParam(required=false) String photoOrderNoModifyData) throws Throwable {

		int updatePhotoOrderNo = galleryUpdateService.updatePhotoOrderNo(photoOrderNoModifyData);
		
		return updatePhotoOrderNo;
	}
	
	@ResponseBody
	@PostMapping({"/galleryGroupOrderNoModify"})
	public int updateGroupOrderNo(@RequestParam(required=false) String groupOrderNoModifyData) throws Throwable {
		System.out.println("pageCon.updateGroupOrderNo()"+groupOrderNoModifyData);
		
		int updateGroupOrderNo = galleryUpdateService.updateGroupOrderNo(groupOrderNoModifyData);
		
		return updateGroupOrderNo;
	}
	
	
	@GetMapping({"/zeichnung"})
	public String zeichnung() {
		return "zeichnung";
	}
	
	@GetMapping({"/objekt"})
	public String objekt() {
		return "objekt";
	}
	
	@ResponseBody
	@GetMapping({"/getGalleryGroupName"})
	public List<GalleryGroupNameInterface> getGallerySubmenu(
			@RequestParam(required=false) String galleryMainMenu) {
		List<GalleryGroupNameInterface> galleryGroupName = 
				galleryUpdateService.getGallerygroupName(galleryMainMenu);
		return galleryGroupName;
		
	}

	@GetMapping({"/text"})
	public String text() {
		return "text";
	}

	@ResponseBody
	@PostMapping({"/testTextImgUpload"})
	public String testTextImgUpload(TextImgSaveData textImgSaveData) {
		System.out.println("upload : "+textImgSaveData);
//		return "http://localhost:8080/download/65";
		return "{ \"uploaded\" : true, \"url\" : \"http://localhost:8080/download/65\"}";
		}

	@GetMapping({"/presse"})
	public String presse() {
		return "presse";
	}
	
	@GetMapping({"/biography"})
	public String biography() {
		return "biography";
	}
	
	@ResponseBody
	@PostMapping({"/saveBiography"})
	public Biography saveBiography(BiographyData biographyData) {
		System.out.println("PageCon-saveBiography : "+biographyData);
		Biography biography = biographySaveService.saveBiography(biographyData);
		return biography;
	}
	
	@ResponseBody
	@GetMapping({"/biography.ajax"})
	public Map<String, Object> biography_ajax() {
		List<BiographyCategory> biographyCategoryList = biographyService.biographyCategoryList();
		List<BiographyData> biographyData =biographyService.getBiography();
		
		
		Map<String, Object> lists = new HashMap<String, Object>();
		lists.put("biographyCategoryList", biographyCategoryList);
		lists.put("biographyData", biographyData);
		
		return lists;
	}
	
	@ResponseBody
	@PostMapping({"/biographyGroupModify"})
	public int updateBiographyGroup(@RequestParam(required=false) String biographyGroupModifyData) throws Throwable {
		int updateBiographyGroup = biographyUpdateService.updateBiographyGroup(biographyGroupModifyData);
		return updateBiographyGroup;
	}
	
	@ResponseBody
	@PostMapping({"/biographyModify"})
	public Biography updateBiography(Biography biography){
		Biography updateBiography = biographyUpdateService.updateBiography(biography);
		return updateBiography;
	}

	@ResponseBody
	@GetMapping({"/getBiographyDeleteItem"})
	public BiographyDeleteItem getBiographyDeleteItem(@RequestParam(required=false) String biographyCategory) {
		BiographyDeleteItem biographyDeleteItem = biographyUpdateService.getBiographyDeleteItem(biographyCategory);
		return biographyDeleteItem;
	}
	
	@ResponseBody
	@GetMapping({"/deleteBiographyData"})
	public int deleteBiographyData(
			@RequestParam(required = false, value = "biographyIdArr") List<Integer> biographyId) 
	{
		biographyDeleteService.deleteBiography(biographyId);
		return 1;
	}

	@GetMapping({"/contact"})
	public String contact() {
		return "contact";
	}
	
	@ResponseBody
	@GetMapping({"/contact.ajax"})
	public Contact contact_ajax(){
		Contact contactData = contactService.getContact();
		return contactData;
	}

	@ResponseBody
	@PostMapping({"/updateContact"})
	public Contact updateContact(Contact contact){
		Contact updateResult = contactService.updateContact(contact);
		return updateResult;
	}
	
	
	
	
	
	@GetMapping({"/update"})
	public String update() {
		return "update";
	}

	@GetMapping({"/loginForm"})
	public String loginForm() {
		return "loginForm";
	}
	
	@GetMapping({"/joinForm"})
	public String joinForm() {
		return "join";
	}

	@PostMapping({"/joinPrc"})
	public String joinPrc(User user) {
		System.out.println(user);
		String aa = joinService.joinMember(user);
		System.out.println(aa);
		return "redirect:/loginForm";
	}
}
