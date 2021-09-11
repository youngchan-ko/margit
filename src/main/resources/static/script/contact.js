//ajax로 컨텐츠 받아와서 뿌려주기
//현재는 let testArray로 해놨음
//콘택트 페이지 수정메뉴 만들기

(function($){
    writeHtml = {
        

        writeContents : function(){
            let testArray = [
                {"Straße":"Humboldtstraße", 
                "HausNummer":"15", 
                "Postleitzahl":"A-4020", 
                "Stadt":"Linz",
                "Email":"fey.flei@aon.at",
                "Telefonnummer":"+43 650 389 4710",
                "homepage_owner":"Margit Feyerer-Fleischanderl",
                "homepage_producer":"Youngchan Kim",
                "Homepage_category":"Persönliche Homepage der Künstlerin",
                "liability_text":"Sämtliche Texte auf der Website wurden sorgfältig geprüft. Dessen ungeachtet kann keine Garantie für Richtigkeit, Vollständigkeit und Aktualität der Angaben übernommen werden.",
                "links_text":"Links auf diese Website - auch auf Seiten in der Tiefe - sind erwünscht. Eine Übernahme des Hauptfensters in ein Frame-Set des Linksetzers ist unzulässig. Eigene Links auf fremde Seiten stellen nur Wegweiser zu diesen Seiten dar; sie werden deshalb regelmäßig mittels externem Link in einem eigenen Browserfenster dargestellt. Der Herausgeber identifiziert sich nicht mit dem Inhalt der Seiten, auf die gelinkt wird und übernimmt dafür keine Haftung; er setzt bewusst auch Links auf Seiten, auf denen andere Meinungen vertreten werden, um dem Leser ein möglichst breites Spektrum zu bieten. Sollte eine der Seiten, auf die gelinkt wird, bedenkliche oder rechtswidrige Inhalte aufweisen, wird um Mitteilung ersucht; in einem solchen Falle wird der Link sofort gelöscht."
                }
            ];
            let contentHtml = $('#contact_content_wrap')[0].innerText;
            
            let content = contentHtml.replace("{Straße}",testArray[0].Straße)
            .replace("{HausNummer}",testArray[0].HausNummer)
            .replace("{Postleitzahl}",testArray[0].Postleitzahl)
            .replace("{Stadt}",testArray[0].Stadt)
            .replace("{Telefonnummer}",testArray[0].Telefonnummer)
            .replace("{Email}",testArray[0].Email)
            .replace("{homepage_owner}",testArray[0].homepage_owner)
            .replace("{homepage_producer}",testArray[0].homepage_producer)
            .replace("{Homepage_category}",testArray[0].Homepage_category)
            .replace("{liability_text}",testArray[0].liability_text)
            .replace("{links_text}",testArray[0].links_text);
            
            $('.navbar').after(content);
        }
    } 
    $(document).ready(writeHtml.writeContents());
   
})(jQuery);


// function WriteHtml(){
//     this.contentHtml = $('#contact_content_wrap')[0].innerText;
//     this.afterTarget = $('.navbar');
//     this.writeContent();
// }
// WriteHtml.prototype = {
//     writeContent : function(){
//         let testArray = [
//             {"Straße":"Humboldtstraße", 

//             "HausNummer":"15", 

//             "Postleitzahl":"A-4020", 

//             "Stadt":"Linz",

//             "Email":"fey.flei@aon.at",

//             "Telefonnummer":"+43 650 389 4710",

//             "homepage_owner":"Margit Feyerer-Fleischanderl",

//             "homepage_producer":"Youngchan Kim",

//             "Homepage_category":"Persönliche Homepage der Künstlerin",

//             "liability_text":"Sämtliche Texte auf der Website wurden sorgfältig geprüft. Dessen ungeachtet kann keine Garantie für Richtigkeit, Vollständigkeit und Aktualität der Angaben übernommen werden.",

//             "links_text":"Links auf diese Website - auch auf Seiten in der Tiefe - sind erwünscht. Eine Übernahme des Hauptfensters in ein Frame-Set des Linksetzers ist unzulässig. Eigene Links auf fremde Seiten stellen nur Wegweiser zu diesen Seiten dar; sie werden deshalb regelmäßig mittels externem Link in einem eigenen Browserfenster dargestellt. Der Herausgeber identifiziert sich nicht mit dem Inhalt der Seiten, auf die gelinkt wird und übernimmt dafür keine Haftung; er setzt bewusst auch Links auf Seiten, auf denen andere Meinungen vertreten werden, um dem Leser ein möglichst breites Spektrum zu bieten. Sollte eine der Seiten, auf die gelinkt wird, bedenkliche oder rechtswidrige Inhalte aufweisen, wird um Mitteilung ersucht; in einem solchen Falle wird der Link sofort gelöscht."
//             }
//         ];
//         debugger;
//         let content = this.contentHtml.replace("{Straße}",testArray[0].Straße)
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

//         this.afterTarget.after(content);
//     }
// }

// $(document).ready(new WriteHtml());