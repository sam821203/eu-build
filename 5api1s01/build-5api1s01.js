"use strict";

// ==================== 測試時打開 ====================
// import data from "./data-5api1s01.json" assert { type: "json" };
// renderTimeLimitProduct(data);
// ================== 測試時打開 End ==================

// 確認在 fetch 時，http 有無錯誤
function checkResponseStatus(response) {
  if (!response.ok) {
    throw new Error("fetch時http錯誤：" + response.status);
  }
  return response.json();
}

// 新增 HTML 架構
function renderTimeLimitProduct(data) {
  const timeLimitArray = document.querySelectorAll(
    ".card--5api1s01 .build__item"
  );
  const itemLinkArray = document.querySelectorAll(
    ".card--5api1s01 .build__item a"
  );
  const itemImgArray = document.querySelectorAll(".card--5api1s01 .item__img");
  const itemNameArray = document.querySelectorAll(
    ".card--5api1s01 .item__name"
  );
  const itemPriceOriginalArray = document.querySelectorAll(
    ".card--5api1s01 .price-original"
  );
  const itemPriceDiscountArray = document.querySelectorAll(
    ".card--5api1s01 .price-discount"
  );
  const itemTagDiscountArray = document.querySelectorAll(
    ".card--5api1s01 .item__tag--discount"
  );
  const itemTagDiscountFirstElArray = document.querySelectorAll(
    ".card--5api1s01 .item__tag--discount span:first-child"
  );

  timeLimitArray.forEach((el, i) => {
    const products = data[0].Products[i];

    // 只取前面 5 個 build__item 來填資料
    if (i < 5) {
      itemLinkArray[i].setAttribute(
        "href",
        "https://www.etmall.com.tw" + products.pageLink
      );
      itemImgArray[i].setAttribute("data-src", "https:" + products.imageUrl);
      itemNameArray[i].innerText = products.title;
      itemPriceOriginalArray[i].innerText = products.marketingPrice;
      itemPriceDiscountArray[i].innerText = products.finalPrice;

      itemTagDiscountArray[i].firstElementChild.innerText = parseInt(
        products.Discount
      );

      // 判斷是否有 Discount 的值，如果沒有則補上字元 "↓"
      if (products.Discount.length === 0) {
        itemTagDiscountFirstElArray[i].innerText = "1";
        itemTagDiscountArray[i].insertAdjacentHTML(
          "beforeend",
          '<span style="display: inline-block; transform: translateY(-2px);">↓</span>'
        );
      }
    } else {
      return false;
    }
  });

  // 初始化 WOW 和 lazyload
  new WOW().init();
  let initLazyload = lazyload();
}

function buildTimeLimit() {
  const url = "https://www.etmall.com.tw/kanban/Get?Type=1";

  fetch(url)
    .then((response) => checkResponseStatus(response))
    .then((data) => renderTimeLimitProduct(data))

    // 本機端網路不穩
    .catch((error) => {
      throw new Error("本機端fetch失敗：" + error);
    });
}

// 建置 section
buildTimeLimit();
