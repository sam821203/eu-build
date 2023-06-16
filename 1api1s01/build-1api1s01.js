"use strict";

// ==================== 測試時打開 ====================
// import data from "./data-1api1s01.json" assert { type: "json" };
// renderSwiperAPIBanner(data);

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

// 新增 HTML 架構
function renderSwiperAPIBanner(data) {
  const sliderContainer = document.querySelector(
    "#swiperAPIBanner .swiper-wrapper"
  );

  const bannersArray = data.Banners;
  const bannersFilterArray = filterElements(bannersArray, 6);

  // 建立 swiper-slider 架構
  bannersFilterArray.forEach((banner) => {
    const bannerItemWrap = document.createElement("li");
    const bannerItemLink = document.createElement("a");
    const bannerItemImg = document.createElement("img");

    bannerItemWrap.classList.add("swiper-slide");
    bannerItemLink.setAttribute("href", banner.URL);
    bannerItemImg.setAttribute("src", banner.ImageURL);
    bannerItemImg.setAttribute("alt", banner.Title);

    bannerItemLink.appendChild(bannerItemImg);
    bannerItemWrap.appendChild(bannerItemLink);

    // 完成的li加在swiper-wrapper裡
    sliderContainer.appendChild(bannerItemWrap);
  });
}

// fetch API 路徑
function buildSwiperAPIBanner() {
  // 檢測組版系統上是否有填寫 ID
  const dataTitle = document.querySelector(".card--1api1s01.data");
  const dataTitleValue = dataTitle.dataset.depart || 0;

  const url = `https://www.etmall.com.tw/kanban/Get?Type=3&id=${dataTitleValue}`;

  fetch(url)
    .then((response) => checkResponseStatus(response))
    .then((data) => renderSwiperAPIBanner(data))
    .then(() => {
      // 建置輪播 Banner
      var swiperAPIBanner = new Swiper("#swiperAPIBanner", {
        autoplay: {
          delay: 1800,
          disableOnInteraction: false,
        },
        grabCursor: true,
        initialSlide: Math.floor(
          Math.random() *
            document.querySelectorAll("#swiperAPIBanner .swiper-slide").length
        ),
        loop: true,
        speed: 1000,
        spaceBetween: "2.4%",
        centeredSlides: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        slidesPerView: 1.2,
      });
    })

    // 本機端網路不穩
    .catch((error) => {
      throw new Error("本機端fetch失敗：" + error);
    });

  // 初始化 WOW
  new WOW().init();
}

// 建置 section
buildSwiperAPIBanner();
