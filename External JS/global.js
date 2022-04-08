$(document).ready(function () {
  gsap.registerPlugin(ScrollTrigger);

  $(window).resize(function () {
    ScrollTrigger.refresh();
  });

  function checkScroll() {
    if ($(window).scrollTop() > 150) {
      $("header").addClass("scrolled");
    } else {
      $("header").removeClass("scrolled");
    }
  }

  checkScroll();

  $(window).scroll(function () {
    checkScroll();
  });

  $(".disclosure_opener").on("click", function () {
    $(this).toggleClass("active");
    $(".footer_disclosure").slideToggle();
  });

  $(".mobile_menu_opener").on("click", function () {
    $(this).toggleClass("opened");
	$('body').toggleClass("no_scroll");
	$('header').toggleClass("opened_menu_mobile");
    $(".mobile_nav").fadeToggle();
  });

  $(".fourth_section_list .single_item").on("click", function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(".fourth_section_list_item_info").slideUp();
    } else {
      $(".fourth_section_list .single_item").removeClass("active");
      $(this).addClass("active");

      var currentDescription = $(this).data("description");
      var currentLink = $(this).data("link");
      $(".fourth_section_list_item_info p").text(currentDescription);
      $(".fourth_section_list_item_info a").attr("href", currentLink);
      $(".fourth_section_list_item_info").slideDown();
    }
  });

  function sliderInit() {
    var $slider = $(".hub_slider");
    $slider.each(function () {
      var $sliderParent = $(this).parent();
      $(this).slick({
        slidesToShow: 1.8,
        dots: false,
        infinite: true,
        prevArrow: ".prevButton",
        nextArrow: ".nextButton",
		responsive: [
			
			{
			  breakpoint: 750,
			  settings: {
				slidesToShow: 1.2
			  }
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		]
      });

      if ($(this).find(".item").length > 1) {
        $(this).siblings(".slides-numbers").show();
      }

      $(this).on("afterChange", function (event, slick, currentSlide) {
        $sliderParent.find(".slides-numbers .active").html(currentSlide + 1);
      });

      var sliderItemsNum = $(this)
        .find(".slick-slide")
        .not(".slick-cloned").length;
      $sliderParent.find(".slides-numbers .total").html(sliderItemsNum);
    });

    let animationTrigger = $(".fadein_wrap");

    animationTrigger.each(function () {
      let trigger = $(this);

      gsap.to(animationTrigger, {
        scrollTrigger: {
          trigger: trigger,
          start: "top 70%",
          scroller: "body",

          onEnter: function () {
            $(trigger).addClass("in_view");
          },
        },
      });
    });
  }

  sliderInit();
});
