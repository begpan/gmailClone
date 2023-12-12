// arayuz işlemlerini ve htmlden aldıgımız elemanları
// cagırdıgımız dosya


// ! htmlden cagrılan elemanlar için yazılır
export const ele ={
    menu:document.querySelector('#menu'),
    nav: document.querySelector('nav'),
    mailsArea: document.querySelector(".mails"),
    modal: document.querySelector('.modal-wrapper'),
    createBtn: document.querySelector('.create'),
    closeBtn: document.querySelector('.close-modal'),
    modalForm: document.querySelector('.modal'),


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
    
 
    { return` <div class="mail" data-id="${mail.id}">
    <div class="info">
        <input type="checkbox">
        <i id="star" class="bi ${
          mail.isStared ? 'bi-star-fill' : 'bi-star'
        }"></i>
        <b>${mail.sender}</b>
    </div>
    <div class="content">
        <p class="title">${mail.title}</p>
        <p class="desc">${mail.message}</p>
    </div>
    <p class="time">${mail.date}</p>
    <div id="button-wrapper">
    <button id="delete">Delete</button>
    </div>
  </div>
    `  }
 );
    ele.mailsArea.innerHTML = mail_html.join(' ');

};


// modali goster gizle
// aldıgı parametre true ise modalı gosterir false
// ise gizler

export const toggleModal = (willOpen)=>{
  ele.modal.style.display = willOpen === true ? 'grid' : 'none';
  // ya da  ele.modal.style.display = willOpen ? 'grid' : 'none'; diye de yazılır

}