var i=lazyload();var n=document.querySelector(".build__wrap");var e=n.getAttribute("data-animate");if(e==="train"){setInterval(function(){r()},4e3)}else if(e==="shine"){setInterval(function(){a()},5500)}else if(e==="priceflipX"){setInterval(function(){u()},4e3)}else if(e==="afterImg"){setInterval(function(){c()},4e3)}function t(i){return Math.floor(Math.random()*i)}function r(){var i=document.querySelectorAll(".build__item .item__price");var n=document.querySelectorAll(".build__item .price__info");var e=o(i.length);i.forEach(function(i){i.classList.remove("pull")});n.forEach(function(i){i.classList.remove("smoke");i.classList.remove("putt")});i[e].classList.add("pull");n[e].classList.add("smoke");n[e].classList.add("putt")}function a(){var i=document.querySelectorAll(".build__item .item__price");var n=o(i.length);i.forEach(function(i){i.classList.remove("shine")});i[n].classList.add("shine")}function u(){var i=document.querySelectorAll(".build__item .item__price");var n=o(i.length);i.forEach(function(i){i.classList.remove("price-flip-x")});i[n].classList.add("price-flip-x")}function c(){var i=document.querySelectorAll(".build__item .price__info span:last-child");var n=o(i.length);i.forEach(function(i){i.classList.remove("after-img")});i[n].classList.add("after-img")}function o(i,n){var n=n||"siblingRandomCheckNowIndex";var e=t(i);while(e===window[n]){e=t(i)}window[n]=e;return e}