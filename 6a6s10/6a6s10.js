/**
 * Created by jing on 2020/2/27.
 */

setTimeout(function () {
  var winWt = document.body.clientWidth;
  // console.log(winWt);
  // if (winWt < 767) {
    $(".variable-width").slick({
      dots: false,
      infinite: false,
      variableWidth: true,
      autoplay: false,
      arrows: false,
      slidesToShow: 6,
      slidesToScroll: 6,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: true,
          },
        },
      ],
    });
  // }
}, 0);
