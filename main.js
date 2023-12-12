// import mailData from './scripts/constants.js';
import { ele, renderMails, toggleModal } from "./scripts/ui.js";
import { getDate } from "./scripts/helpers.js";

// ! ** local storagedan verileri al ve string obje
// ! formatına çevir
// ! projede mail verisi olarak hep bunu kullan diziyi
// ! güncellediğinde local storage ı da guncelle

const strMail = localStorage.getItem("mails") || [];
let mailData = JSON.parse(strMail);

// 1- navbar için acılma ve kapanma özelliği
// hamburger menusune tıklanma olayını izle
// tıklanınca nav menusune hide classı ekle.
// zaten kapalıysa hide classını kaldır

ele.menu.addEventListener("click", () => {
  ele.nav.classList.toggle("hide");
});

// 2 - listeleme özelliği
// kullanıcı projeye girme anında mailleri listelicez
//DOMContentLoaded tarayaıcıdaki htmlnin yuklenmesinin bitmesi
// ekran boyutu 1200 px altında ise navbar kapalı gelsin

document.addEventListener("DOMContentLoaded", () => {
  renderMails(mailData);

  if (window.innerWidth < 1200) {
    ele.nav.classList.add("hide");
  }
});

// 3- mail atma özelliği
// oluştur butonuna basınca modal acılacak(display_grid)
// modaldaki carpıya tıklanınca modalı kapat(display_none)

ele.createBtn.addEventListener("click", () => toggleModal(true));
ele.closeBtn.addEventListener("click", () => toggleModal(false));

// eğer tıklanılan elamanın  classında modal wrapper varsa calıstır

ele.modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-wrapper")) {
    toggleModal(false);
  }
});

// 4 ) Mail atma özellği
// acılan modalda formun gonderilme olayını izlicez
// eger butun imputlar doluysa yeni mail oluştur
// değilse kullanıcıya uyarı ver

ele.modalForm.addEventListener("submit", (e) => {
  // sayfayı yenilemeyi engelle
  e.preventDefault(e);

  // formdaki inputların verilerine erişme
  const receiver = e.target[1].value;
  const title = e.target[2].value;
  const message = e.target[3].value;
  // eğer inputlar boşsa uyarı gönder

  // ya da if (!receiver || !title || !message) da yazılabilir
  if (receiver === "" || title === "" || message === "") {
    alert("Please fill in all fields");
  } else {
    // diziye eklemek için mail objesi oluştur

    const newMail = {
      id: new Date().getTime(),
      sender: "Begum",
      receiver: receiver,
      title: title,
      message: message,
      date: getDate(),
    };

    // yeni maili mailler dizisine ekleme

    mailData.unshift(newMail);
    // YA DA

    // const newData = mailData.concat(newMail)
    // renderMails(newData)

    // mailler dizisini local storage a kaydetme

    localStorage.setItem("mails", JSON.stringify(mailData));

    // mailler dizisinin son halini ekrana basma

    renderMails(mailData);

    // modalı kapat
    toggleModal(false);
  }
});


// 5) mail silme özelliği
// maillere tıklanma olayını izlicez

const handleClick = (e) =>{
  const mail = e.target.closest('.mail')
const mailId = mail.dataset.id
  // tıklanılan elemanın id si delete ise maili sil
  if(e.target.id==="delete" && confirm("Are you sure you want to delete?")){
    // id si sileceğimiz eleman eşit olmayan elemanları filtrele
 mailData = mailData.filter((mail)=>mail.id !== Number(mailId))

  //  locali guncelle
  localStorage.setItem("mails", JSON.stringify(mailData))
    // maili htmlden kaldır
    mail.remove()

  }
// tıklanılan eleman yıldız ise maili likela

// id sini bildiğimiz mailin bütün bilgilerini al
// mailin yıldızlı degerini is_stared değerini tersine cevir
// mailler dizisini güncelle yeni maili eski mailin yerine koy
// local storage ı guncelle 
// ara yuzu guncelle

// tıklanılan eleman yıldız ise maili like'la
if (e.target.id === 'star') {
  // 1) id'sini bildiğimiz mail'in bütün bilgilerini al
  const found = mailData.find((item) => item.id === Number(mailId));

  // 2) objenin  is_stared "yıldızlı" değerini tersine çevir
  found.isStared = !found.isStared;

  // 4) local'storage'ı güncelle
  localStorage.setItem('mails', JSON.stringify(mailData));

  // 5) arayüzü güncelle
  renderMails(mailData);
}
};

ele.mailsArea.addEventListener('click', handleClick)

// 6) Navigasyon Menüsü Aktifliği
ele.nav.addEventListener('click', (e) => {
  // eğerki ikinci categorye yani "yıldızlı" kategoorisine tıklanırsa
  if (e.target.id === 'cat2') {
    // dizi içerisnden sadece yıldı olanları al ve ekrana bas
    const filtred = mailData.filter((mail) => mail.isStared === true);
    renderMails(filtred);
  } else {
    // bütün diziyi ekrena bas
    renderMails(mailData);
  }
});
