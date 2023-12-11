// arayuz işlemlerini ve htmlden aldıgımız elemanları
// cagırdıgımız dosya


// ! htmlden cagrılan elemanlar için yazılır
export const ele ={
    menu:document.querySelector('#menu'),
    nav: document.querySelector('nav'),
    mailsArea: document.querySelector(".mails")
}


// ! ekrana mailleri basan bir fonksiyon yazılır
// mailData ekrana basılacak mailler
// mailData dizisindeki her bir mail için htmldeki
// mails alanına bir mail bas

import mailData from "./constants.js"

export const renderMails = (mailData) => {
    // mailData dizisindeki her bir mail için bir
    // mail html oluşturu ve mail_html dizisine aktar
  const mail_html =  mailData.map(
    (mail) => 
    
 
    { return` <div class="mail">
    <div class="info">
        <input type="checkbox">
        <i class="bi bi-star-fill"></i>
        <b>${mail.sender}</b>
    </div>
    <div class="content">
        <p class="title">${mail.title}</p>
        <p class="desc">${mail.message}</p>
    </div>
    <p class="time">${mail.date}</p>
    <button>Sil</button>
  </div>
    `  }
 );
    ele.mailsArea.innerHTML = mail_html.join(' ');

};

