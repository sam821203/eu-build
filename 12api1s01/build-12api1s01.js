"use strict";

// ==================== 測試時打開 ====================
// import data from "./data-12api1s01.json" assert { type: "json" };
// renderAllProduct(data);
// new WOW().init();
// var initLazyload = lazyload();
// ================== 測試時打開 End ==================

// 確認在 fetch 時，http 有無錯誤
function checkResponseStatus(response) {
  if (!response.ok) {
    throw new Error("fetch時http錯誤：" + response.status);
  }
  return response.json();
}

// 新增 HTML 架構
function renderAllProduct(data) {
  const topTwelveRank = document.getElementById("topTwelveRank");
  const topTwelveArray = document.querySelectorAll(
    ".card--12api1s01 .build__item"
  );

  // 每當品數大於 12 品，只取前面
  topTwelveArray.forEach((el, i, arr) => {
    if (i + 1 < 13) {
      const item = topTwelveRank.children[i];
      const itemLink = item.firstElementChild;
      const itemBox = itemLink.firstElementChild;
      const itemPicture = itemBox.children[0].firstElementChild;

      const itemRanking =
        itemBox.children[1].firstElementChild.lastElementChild;
      const itemName = itemBox.children[2].firstElementChild;
      const itemPrice = itemBox.children[2].lastElementChild.lastElementChild;

      itemLink.setAttribute(
        "href",
        "https://www.etmall.com.tw" + data.products[i].pageLink
      );
      itemPicture.setAttribute(
        "data-src",
        "https:" + data.products[i].imageUrl
      );

      itemRanking.innerText = i + 1;
      itemName.innerText = data.products[i].title;
      itemPrice.innerText = data.products[i].finalPrice;
    } else {
      return false;
    }

    // 初始化 WOW 和 lazyload
    new WOW().init();
    let initLazyload = lazyload();
  });
}

function buildAllTopRank() {
  const url = `https://www.etmall.com.tw/kanban/Get?Type=0&id=0`;

  fetch(url)
    .then((response) => checkResponseStatus(response))
    .then((data) => renderAllProduct(data))

    // 本機端網路不穩
    .catch((error) => {
      throw new Error("本機端fetch失敗：" + error);
    });
}

// 建置 section
buildAllTopRank();
