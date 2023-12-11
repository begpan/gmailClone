import mailData from './scripts/constants.js';
import {ele, renderMails} from './scripts/ui.js';


// 1- navbar için acılma ve kapanma özelliği
// hamburger menusune tıklanma olayını izle
// tıklanınca nav menusune hide classı ekle. 
// zaten kapalıysa hide classını kaldır

ele.menu.addEventListener('click', ()=>{
    ele.nav.classList.toggle('hide');

}
);


// 2 - listeleme özelliği
// kullanıcı projeye girme anında mailleri listelicez
//DOMContentLoaded tarayaıcıdaki htmlnin yuklenmesinin bitmesi

document.addEventListener('DOMContentLoaded', ()=>{
    renderMails(mailData)
})


