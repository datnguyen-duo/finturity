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

  $(".filter_button").on("click", function () {
    var currentPlan = $(this).data("plan");
    $(".filter_button").removeClass("active");
    $(this).addClass("active");

    $(".four_box_section").each(function () {
      if ($(this).data("plan") == currentPlan) {
        $(this).css("display", "flex").addClass("in_view");
      } else {
        $(this).css("display", "none");
      }
    });
  });

  $(".single_team_member").on("click", function () {
    $(this).toggleClass("active");
    $(this).find(".team_description").slideToggle();
  });

  $(".total_posts span").text($(".posts_slider .single_slide").length);

  $(".single_featured_blog").hover(function () {
    let currentImage = $(this).data("blog");

    $(".blog_hero_bottom_content .image_holder img").each(function () {
      if ($(this).data("blog") == currentImage) {
        $(".blog_hero_bottom_content .image_holder img").removeClass("active");
        $(this).addClass("active");
      }
    });
  });

  $(".mobile_menu_opener").on("click", function () {
    $(this).toggleClass("opened");
    $("body").toggleClass("no_scroll");
    $("header").toggleClass("opened_menu_mobile");
    $(".mobile_nav").fadeToggle();
  });

  if ($("body").hasClass("glossary_page")) {
    $(".single_term .single_term_content").on("click", function () {
      $(this).toggleClass("active");
      $(this).find(".tearm_description").slideToggle();
    });

    $(".contact_hero_bottom_content a, .terms_section .left_content a").on(
      "click",
      function () {
        $("#search").val(null);
        $(".single_term").css("display", "block").removeClass("hidden");
        $(".single_letter_wrap").css("display", "block");
      }
    );

    $("a[href^='#']").click(function (e) {
      e.preventDefault();

      $("html, body").animate(
        {
          scrollTop: $($(this).attr("href")).offset().top - 90,
        },
        200
      );
    });

    //get input
    let input = document.getElementById("search");
    //get list of value
    let list = document.querySelectorAll(".single_term");

    //function search on the list.
    function search() {
      for (let i = 0; i < list.length; i += 1) {
        //check the Terms
        if (
          list[i].innerText.toLowerCase().includes(input.value.toLowerCase())
        ) {
          list[i].style.display = "block";
          list[i].classList.remove("hidden");
        } else {
          list[i].style.display = "none";
          list[i].classList.add("hidden");
        }
      }

      $(".single_letter_wrap").each(function (index) {
        if (
          $(this).find(".single_term").length == $(this).find(".hidden").length
        ) {
          $(this).css("display", "none");
        } else {
          $(this).css("display", "block");
        }
      });
    }

    //to the change run search.
    input.addEventListener("input", search);

    function letterSidebar(trigger) {
      $(trigger).addClass("current_letter");
      var currentLetter = $(".current_letter").find("h3").text().toLowerCase();

      $(".terms_section .left_content li").each(function (index) {
        if ($(this).text().toLowerCase() == currentLetter) {
          $(this).addClass("active");
        } else {
          $(this).removeClass("active");
        }
      });
    }

    let letterAnimation = $(".letter_check");

    letterAnimation.each(function () {
      var trigger = $(this);

      gsap.to(letterAnimation, {
        scrollTrigger: {
          trigger: trigger,
          start: "top 20%",
          end: "bottom 80%",
          scroller: "body",

          onEnter: function () {
            letterSidebar(trigger);
          },
          onEnterBack: function () {
            letterSidebar(trigger);
          },
          onLeave: function () {
            $(trigger).removeClass("current_letter");
          },

          onLeaveBack: function () {
            $(trigger).removeClass("current_letter");
          },
        },
      });
    });
  }

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

  $(".partners_slider").slick({
    slidesToShow: 4,
    infinite: true,
    dots: false,
    prevArrow: ".prev_button",
    nextArrow: ".next_button",
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  $(".posts_slider").slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    rows: 3,
    infinite: true,
    dots: true,
    prevArrow: ".prev_post_button",
    nextArrow: ".next_post_button",

    responsive: [
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 6,
        },
      },
    ],
  });

  function scroll_to_anchor(anchor_id) {
    var tag = $("#" + anchor_id);
    $("html,body").animate({ scrollTop: tag.offset().top }, "slow");
  }

  $(".posts_slider").on("afterChange", function () {
    scroll_to_anchor("posts");
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
              slidesToShow: 1.2,
            },
          },
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ],
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
