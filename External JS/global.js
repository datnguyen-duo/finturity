$(document).ready(function () {
  gsap.registerPlugin(ScrollTrigger);

  var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", "".concat(vh, "px"));
  window.addEventListener("resize", function () {
    // We execute the same script as before
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", "".concat(vh, "px"));
  });

  function loadVideo(){
    if (window.innerWidth > 730) {   
      var source = $('.desktop_video source');
      source.attr('src', '');
      
      source.attr('src', source.data('src'));
      $('.desktop_video')[0].load()
      
    } else{
      var source = $('.mobile_video source');
      source.attr('src', '');
      
      source.attr('src', source.data('src'));
      $('.mobile_video')[0].load()
    } 
  }

  if($('body').hasClass('home_page')){
    loadVideo();

    $( window ).resize(function() {
      loadVideo();
    });
  }

  if (window.location.hash) {
      
      $("html, body").animate(
        {
          scrollTop: $(window.location.hash).offset().top - 90,
        },
        200
      );
  }

  $(window).resize(function () {
    ScrollTrigger.refresh();
  });

  if($('body').hasClass('contact_page')){
    $("input, textarea").on("keyup change", function(e) {
      if($(this).val() !== ""){
        $(this).parent().addClass('dark');
      } else{
        $(this).parent().removeClass('dark');
      }
    }) 
  }

  function checkScroll() {
    if ($(window).scrollTop() > 150) {
      $("header, .terms_section .left").addClass("scrolled");
    } else {
      $("header, .terms_section .left").removeClass("scrolled");
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
    var slideno = $(this).data('slide');
    $('.four_box_section_slider').slick('slickGoTo', slideno - 1);

    // var currentPlan = $(this).data("plan");
    $(".filter_button").removeClass("active");
    $(this).addClass("active");

    // $(".four_box_section").each(function () {
    //   if ($(this).data("plan") == currentPlan) {
    //     $(this).css("display", "flex").addClass("in_view");
    //   } else {
    //     $(this).css("display", "none");
    //   }
    // });
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
  }, function() {
    $(".blog_hero_bottom_content .image_holder img").removeClass("active");
    $(".blog_hero_bottom_content .image_holder img.main_image").addClass("active");
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

  $(".four_box_section_slider").slick({
    slidesToShow: 1,
    infinite: false,
    dots: false,
    arrows: false,
    draggable: false,
    swipe: false,
    touchMove: false
    // prevArrow: ".prev_post_button",
    // nextArrow: ".next_post_button",
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
    var counter = false;

    animationTrigger.each(function () {
      let trigger = $(this);

      gsap.to(animationTrigger, {
        scrollTrigger: {
          trigger: trigger,
          start: "top 70%",
          scroller: "body",

          onEnter: function () {
            $(trigger).addClass("in_view");

            if ($(trigger).hasClass("services_second_content")) {
              $(this).find('video').each(function () {
                $(this)[0].play();
              })
            }

            if ($(trigger).hasClass("about_second_section_content") && counter == false) {
              counter = true;
              $(".number").each(function () {
                $(this)
                  .prop("Counter", 0)
                  .animate(
                    {
                      Counter: $(this).text(),
                    },
                    {
                      duration: 2000,
                      easing: "swing",
                      step: function (now) {
                        
                        if ($(this).hasClass("retierment")) {
                          $(this).text("$" + Math.ceil(now) + "M+");
                        } else if ($(this).hasClass("employee")) {
                          $(this).text(getRupeesFormat(Math.ceil(now)) + "+");
                        } else if ($(this).hasClass("capital")) {
                          $(this).text(getFormat("$" + Math.ceil(now)) + "B+");
                        } else {
                          $(this).text(Math.ceil(now) + "+");
                        }
                      },
                    }
                  );
              });
    
              function getRupeesFormat(val) {
                while (/(\d+)(\d{3})/.test(val.toString())) {
                  val = val.toString().replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
                }
                return val;
              }
    
              function getFormat(val) {
                while (/(\d+)(\d{2})/.test(val.toString())) {
                  val = val.toString().replace(/(\d+)(\d{2})/, "$1" + "." + "5");
                }
                return val;
              }
            }
          },
        },
      });
    });
  }

  sliderInit();
});
