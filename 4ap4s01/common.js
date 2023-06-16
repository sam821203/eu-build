"use strict";

var initLazyload = lazyload();

// 全域變數
var itemPriceNodes = document.querySelectorAll(".build__item .item__price");
var priceInfoNodes = document.querySelectorAll(".build__item .price__info");
var lastPriceInfoNodes = document.querySelectorAll(
  ".build__item .price__info span:last-child"
);

// 產生隨機數字
function getRandom(i) {
  return Math.floor(Math.random() * i);
}

function siblingRandom(arrayLength, globalVariableName) {
  var globalVariableName = globalVariableName || "siblingRandomCheckNowIndex";
  let selectedIndex = getRandom(arrayLength);

  while (selectedIndex === window[globalVariableName]) {
    selectedIndex = getRandom(arrayLength);
  }

  window[globalVariableName] = selectedIndex;

  return selectedIndex;
}

// 動畫：火車噗噗
function trainAnimation() {
  const chooseItemIndex = siblingRandom(itemPriceNodes.length);

  itemPriceNodes.forEach((i) => {
    i.classList.remove("pull");
  });

  priceInfoNodes.forEach(function (i) {
    i.classList.remove("smoke");
    i.classList.remove("putt");
  });

  itemPriceNodes[chooseItemIndex].classList.add("pull");
  priceInfoNodes[chooseItemIndex].classList.add("smoke", "putt");
}

// 動畫：價格標籤閃亮
function shineAnimation() {
  const chooseItemIndex = siblingRandom(itemPriceNodes.length);

  itemPriceNodes.forEach((i) => i.classList.remove("shine"));

  itemPriceNodes[chooseItemIndex].classList.add("shine");
}

// 動畫：價格標籤選轉X軸
function priceFlipXAnimation() {
  const chooseItemIndex = siblingRandom(itemPriceNodes.length);

  itemPriceNodes.forEach((i) => i.classList.remove("price-flip-x"));

  itemPriceNodes[chooseItemIndex].classList.add("price-flip-x");
}

// 動畫：價格標籤附帶圖片微動
function imageAnimation() {
  const chooseItemIndex = siblingRandom(itemPriceNodes.length);

  lastPriceInfoNodes.forEach((i) => i.classList.remove("after-img"));

  lastPriceInfoNodes[chooseItemIndex].classList.add("after-img");
}

// 判斷在組版系統上所填寫的資料
// FIXME:目前只能拉一個宮格，只要兩個以上，就會停留在第一個
// 也需再討論分成多個宮格還是整合為一個
function checkDataAnimate() {
  const buildWrapNodes = document.querySelectorAll(".build__wrap.js-animate");
  buildWrapNodes.forEach((el) => {
    const dataAnimate = el.getAttribute("data-animate");

    switch (dataAnimate) {
      case "train": {
        setInterval(() => trainAnimation(), 4000);
        break;
      }
      case "shine": {
        setInterval(() => shineAnimation(), 5500);
        break;
      }
      case "priceflipX": {
        setInterval(() => priceFlipXAnimation(), 4000);
        break;
      }
      case "afterImg": {
        setInterval(() => imageAnimation(), 4000);
        break;
      }
      default:
        break;
    }
  });
}

checkDataAnimate();
