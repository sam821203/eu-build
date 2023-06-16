"use strict";

// ==================== 測試時打開 ====================
// import data from "./data-12api1s02.json" assert { type: "json" };
// renderEveryProduct(data);
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

// 檢查 fetch 過來的資料數量
function checkFetchDataNumber(arr) {
  const result =
    arr.length >= 12 ? (arr = arr.slice(0, 12)) : (arr = arr.slice(0, 6));

  return result;
}

// 新增 HTML 架構
function renderEveryProduct(data) {
  const topTwelveRank = document.getElementById("everyTopTwelveRank");

  /* 確認資料筆數
  如果超過 12 筆就只取 12
  如果小於 12 筆就只取 6 */
  let topTwelveArray = checkFetchDataNumber(data.products);

  // 建立 build__item 架構
  topTwelveArray.forEach((el, i, arr) => {
    const buildItemHTML = `
        <div class="build__item">
          <a href="${"https://www.etmall.com.tw" + data.products[i].pageLink}">
            <div class="item__box">
              <div class="item__pic">
                <img
                  class="item__img lazyload"
                  data-src="${"https:" + data.products[i].imageUrl}"
                  src="1x1_low.png"
                  alt=""
                />
              </div>
              <div class="n-flag__wrap">
                <span class="n-flag__num">
                  <span class="flag__top">TOP</span>
                  <span class="num">${i + 1}</span>
                </span>
              </div>
              <div class="item__info">
                <p class="item__name margin-bottom-md">${
                  data.products[i].title
                }</p>
                <div class="item__price margin-bottom-sm">
                  <span>$</span>
                  <span>${data.products[i].finalPrice}</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      `;

    topTwelveRank.insertAdjacentHTML("beforeend", buildItemHTML);
  });

  // 初始化 WOW 和 lazyload
  new WOW().init();
  let initLazyload = lazyload();
}

// fetch API 路徑
function buildEveryTopRank(id) {
  const url = `https://www.etmall.com.tw/kanban/Get?Type=0&id=${id}`;

  fetch(url)
    .then((response) => checkResponseStatus(response))
    .then((data) => renderEveryProduct(data))

    // 本機端網路不穩
    .catch((error) => {
      throw new Error("本機端fetch失敗：" + error);
    });
}

// 檢測組版系統上是否有填寫 ID
function checkDataTitle(section) {
  const dataTitle = document.querySelector(section);
  const dataTitleValue = dataTitle.dataset.depart;

  return buildEveryTopRank(dataTitleValue || 0);
}

// 建置 section
checkDataTitle(".card--12api1s02");
