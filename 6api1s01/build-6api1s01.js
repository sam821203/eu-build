"use strict";

// ==================== 測試時打開 ====================
import data from "./data-6api1s01.json" assert { type: "json" };
renderPromoBanner(data);

// ================== 測試時打開 End ==================

// 確認在 fetch 時，http 有無錯誤
function checkResponseStatus(response) {
  if (!response.ok) {
    throw new Error("fetch時http錯誤：" + response.status);
  }
  return response.json();
}

// 過濾 API 裡的資料數量
function filterElements(arr, num) {
  return arr.length > num ? arr.filter((el, i) => i < num) : arr;
}

// 重組 build__item 的 HTML 架構
/* 判斷 陣列數量是否小於 6
如果是，就刪除 build__item 數量，直到等於 Bn 數量
如果不是，就回傳原本的陣列 */
function restructureBuildItems(arr) {
  const promoBannerNodes = document.querySelectorAll(
    ".card--6api1s01 .build__item"
  );
  // 原始陣列數量
  const promoBannerArray = Array.from(promoBannerNodes);

  if (arr.length < 6) {
    const hiddenChildren = promoBannerArray.splice(arr.length);
    const lastElement = promoBannerArray[promoBannerArray.length - 1];
    const lastSecondElement = promoBannerArray.slice(-2, -1)[0];

    hiddenChildren.forEach((el) => el.classList.add("hidden"));

    // 當小餘 6 品時，移除倒數兩個元素的底部間距
    lastElement.classList.add("removeMarginBottom");
    lastSecondElement.classList.add("removeMarginBottom");

    return promoBannerArray.concat(hiddenChildren);
  } else {
    return promoBannerArray;
  }
}

// 新增 HTML 架構
function renderPromoBanner(data) {
  const bannersArray = data.Banners;
  const bannerArray = restructureBuildItems(filterElements(bannersArray, 6));

  bannerArray.forEach((el, i) => {
    const bannerLink = bannerArray[i].firstElementChild.firstElementChild;
    const bannerImg = bannerLink.firstElementChild;
    const banners = data.Banners[i];

    // 控制陣列在 6 品內
    if (i < filterElements(bannersArray, 6).length) {
      bannerLink.setAttribute("href", banners.URL);
      bannerImg.setAttribute("data-src", banners.ImageURL);
      bannerImg.setAttribute("alt", banners.Title);
    } else {
      return false;
    }
  });

  // 初始化 WOW 和 lazyload
  new WOW().init();
  let initLazyload = lazyload();
}

// fetch API 路徑
function buildPromoBanner() {
  // 檢測組版系統上是否有填寫 ID
  const dataTitle = document.querySelector(".card--6api1s01");
  const dataTitleValue = dataTitle.dataset.depart || 0;

  const url = `https://www.etmall.com.tw/kanban/Get?Type=3&id=${dataTitleValue}`;

  fetch(url)
    .then((response) => checkResponseStatus(response))
    .then((data) => renderPromoBanner(data))

    // 本機端網路不穩
    .catch((error) => {
      throw new Error("本機端fetch失敗：" + error);
    });
}

// 建置 section
buildPromoBanner();
