import { customAlphabet } from "nanoid";
import Notify from "simple-notify";
import "simple-notify/dist/simple-notify.css";
import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightBox.min.css";

const textKeys = document.querySelector("[data-textKeys]");
const textCurrentKey = document.querySelector("[data-textCurrentKey]");
const btnStart = document.querySelector("[data-type]");
const btnDes = document.querySelector("[data-description]");
let keys = "";
let currentKeyIndex = 0;
let currentKey = "";

const modalDes = basicLightbox.create(`<div class="modal">
    <h2 class="modal__title">Правила гри</h2>
    <p class="modal__text">
      Натисніть кнопку «Почати». На екрані з'явиться випадкова послідовність із 10 літер.
      Натискайте клавіші в тому порядку, у якому вони відображаються.
      Якщо натиснете неправильну клавішу, з'явиться повідомлення про помилку.
      Після правильного введення всієї послідовності гра завершиться.
    </p>
  </div>
`);
const handelShow = () => {
  modalDes.show();
};

btnDes.addEventListener("click", handelShow);

const errorNotice = () => {
  new Notify({
    status: "error",
    title: "Неправильна літера",
    text: "Перевірте розкладку клавіатури",
    effect: "slide",
    speed: 300,
    showIcon: false,
    showCloseButton: false,
    autoclose: true,
    autotimeout: 3000,
    notificationsGap: null,
    notificationsPadding: null,
    type: "outline",
    position: "x-center",
    customWrapper: "",
  });
};

const play = (event) => {
  event.preventDefault();
  console.log(event);
  let pressKey = event.key;
  console.log(pressKey);
  if (currentKey === pressKey) {
    currentKeyIndex++;
    currentKey = keys[currentKeyIndex];
    textCurrentKey.textContent = currentKey;
    console.log(currentKeyIndex);
  } else {
    errorNotice();
  }
  if (currentKeyIndex === keys.length) {
    finish();
    textKeys.textContent = "Молодець! Хороша гра!!";
    textCurrentKey.textContent = "";
  }
};
const start = (event) => {
  textKeys.style.color = " rgb(173, 173, 173)";
  const getKeys = customAlphabet("asdfghjkl", 10);
  keys = getKeys();
  textKeys.textContent = keys;

  currentKeyIndex = 0;
  currentKey = keys[currentKeyIndex];

  textCurrentKey.textContent = currentKey;
  btnStart.dataset.type = "play";
  btnStart.textContent = "Закінчити";

  document.addEventListener("keydown", play);
};

const finish = () => {
  btnStart.dataset.type = "start";
  btnStart.textContent = "Почати";
  textKeys.textContent = "Гра закінчина";
  textCurrentKey.textContent = "";
  textKeys.style.color = "black";
  document.removeEventListener("keydown", play);
};

btnStart.addEventListener("click", () => {
  if (btnStart.dataset.type === "start") {
    start();
  } else {
    finish();
  }
});
