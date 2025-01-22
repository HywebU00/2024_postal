// -----------------------------------------------------------------------
// -----   fancyBox新增需要綁定才有效果   -----------------------------------
// -----------------------------------------------------------------------
if (document.querySelectorAll('[data-fancybox]').length > 0) {
    Fancybox.bind('[data-fancybox]', {
        l10n: Fancybox.l10n.zh_TW,
    });
}

// 自行加入的JS請寫在這裡
(function () {
    // 確保選取元素存在再操作
    function addEventIfExists(selector, event, handler) {
        var element = document.querySelector(selector);
        if (element) {
            element.addEventListener(event, handler);
        }
    }

    function addEventToAllIfExists(selector, event, handler) {
        var elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            elements.forEach(function(element) {
                element.addEventListener(event, handler);
            });
        }
    }

    // m1 郵你生活圈，就差你一員！
    document.addEventListener("DOMContentLoaded", function () {
        // 遍歷每個 .mpSlider 元素
        document.querySelectorAll(".mpSlider").forEach(function (sliderContainer) {
            const slides = sliderContainer.querySelectorAll(".swiper-slide");
            const paginationTitles = Array.from(slides, slide => slide.dataset.title);

            // 初始化 Swiper
            const swiper = new Swiper(sliderContainer.querySelector(".swiper"), {
            slidesPerView: 1,
            loop: false,
            pagination: {
                el: sliderContainer.querySelector(".swiperDots"),
                bulletElement: "button",
                clickable: true,
                renderBullet: function (index, className) {
                return `<button class="${className} noFonts" aria-label="${paginationTitles[index]}">${paginationTitles[index]}</button>`;
                },
            },
            navigation: {
                nextEl: sliderContainer.querySelector(".nextSlider"),
                prevEl: sliderContainer.querySelector(".prevSlider"),
                disabledClass: "swiperArrow-disabled",
            },
            on: {
                init: function () {
                // 初始化時對應的第一個 li 加入 .act
                const steps = sliderContainer.closest(".container").querySelectorAll("ul.step li");
                steps[0].classList.add("act");
                },
                slideChange: function () {
                const steps = sliderContainer.closest(".container").querySelectorAll("ul.step li");

                // 清除所有步驟的 .act 樣式
                steps.forEach(li => li.classList.remove("act"));

                // 根據當前 slide 索引為對應的步驟添加 .act 樣式
                const activeIndex = this.activeIndex;
                if (steps[activeIndex]) {
                    steps[activeIndex].classList.add("act");
                }
                }
            }
            });
        });
    });

    // m2
    document.addEventListener("DOMContentLoaded", function () {
    // 選取所有 .tab 父層
    document.querySelectorAll(".tab").forEach(function (tabContainer) {
        const tabLinks = tabContainer.querySelectorAll(".tabTitle a");
        const tabSections = tabContainer.querySelectorAll(".tabItems section");

        // 頁籤初始化 - 設置第一個 .act 和 .show
        tabLinks[0].classList.add("act");
        tabSections[0].classList.add("show");

        // 為每個頁籤按鈕添加點擊事件
        tabLinks.forEach((link, index) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            // 清除所有頁籤按鈕的 .act，並為當前點擊的按鈕添加 .act
            tabLinks.forEach((link) => link.classList.remove("act"));
            link.classList.add("act");

            // 清除所有 section 的 .show，並顯示對應的 section
            tabSections.forEach((section) => section.classList.remove("show"));
            tabSections[index].classList.add("show");
        });
        });
    });
    });

    // // m4 常見問題
    // document.querySelectorAll('._QA .item').forEach((item, index) => {
    //     const btnSwitch = item.querySelector('.btn-switch');
    //     const answerSection = item.querySelector('.A');

    //     btnSwitch.addEventListener('click', function() {
    //         // 判斷 btn-switch 是否有 .act 類
    //         if (btnSwitch.classList.contains('act')) {
    //             btnSwitch.classList.remove('act');  // 移除 .act
    //             answerSection.classList.remove('show');  // 隱藏 .A
    //         } else {
    //             btnSwitch.classList.add('act');  // 添加 .act
    //             answerSection.classList.add('show');  // 顯示 .A
    //         }
    //     });
    // });

    // nav 功能
    addEventIfExists('.sidebarCtrl', 'click', function() {
        var sidebarCtrl = document.querySelector('.sidebarCtrl');
        var headerNav = document.querySelector('header nav');
        
        if (sidebarCtrl && headerNav) {
            if (sidebarCtrl.classList.contains('act')) {
                // 如果 .sidebarCtrl 有 .act 類，移除 .act 和 .show
                sidebarCtrl.classList.remove('act');
                headerNav.classList.remove('show');
            } else {
                // 否則，添加 .act 和 .show
                sidebarCtrl.classList.add('act');
                headerNav.classList.add('show');
            }
        }
    });

    // 跳窗關閉功能
    addEventIfExists('#mask .btnClose', 'click', function() {
        var mask = document.getElementById('mask');
        if (mask) {
            mask.style.display = 'none';
        }
    });

    addEventIfExists('#mask_below .btnClose', 'click', function() {
        var maskBelow = document.getElementById('mask_below');
        if (maskBelow) {
            maskBelow.classList.add('_hide');
        }
    });

    // 展開popup
    addEventToAllIfExists('._openAlert', 'click', function() {
        var maskPopup = document.getElementById('mask');
        if (maskPopup) {
            maskPopup.classList.remove('_hide');
        }
    });
    // 展開下方跳窗
    addEventToAllIfExists('._openMask', 'click', function() {
        var maskBelow = document.getElementById('mask_below');
        if (maskBelow) {
            maskBelow.classList.remove('_hide');
        }
    });

    // mask
    addEventIfExists('#mask_below .btnToEnd', 'click', function() {
        var content = document.querySelector('.scrollCover .content');
        var scrollCover = document.querySelector('.scrollCover');
        if (content && scrollCover) {
            var contentHeight = content.offsetHeight;
            scrollCover.scrollTo({
                top: contentHeight,
                behavior: 'smooth'
            });
        }

        var btnToEnd = document.querySelector('.btnToEnd');
        if (btnToEnd) {
            btnToEnd.style.transition = 'opacity 0.5s';
            btnToEnd.style.opacity = '0';
            setTimeout(function() {
                btnToEnd.style.display = 'none';
            }, 500);
        }

        var btnOpenMask = document.querySelector('.btn._openMask');
        if (btnOpenMask) {
            btnOpenMask.classList.remove('_disable');
            btnOpenMask.addEventListener('click', function() {
                var maskBelow = document.getElementById('mask_below');
                if (maskBelow) {
                    maskBelow.classList.add('_hide');
                }
            });
        }
    });

    // password_toggle
    addEventToAllIfExists('.content._psssToggle .btn', 'click', function() {
        var content = this.closest('.content._psssToggle');
        var input = content ? content.querySelector('input[name="password"]') : null;
        if (input) {
            if (this.classList.contains('_iconShow')) {
                this.classList.remove('_iconShow');
                input.setAttribute('type', 'password');
                this.setAttribute('aria-label', '顯示密碼');
            } else {
                this.classList.add('_iconShow');
                input.setAttribute('type', 'text');
                this.setAttribute('aria-label', '隱藏密碼');
            }
        }
    });

    // 回頁首：偵聽 window 滾動事件
    window.addEventListener('scroll', function() {
        var scrollToTopButton = document.querySelector('.scrollToTop');
        if (scrollToTopButton) {
            if (window.scrollY > 200) {
                if (scrollToTopButton.style.display === 'none' || scrollToTopButton.style.display === '') {
                    scrollToTopButton.style.display = 'block';
                    setTimeout(function() {
                        scrollToTopButton.style.opacity = '1';
                    }, 10);
                }
            } else {
                scrollToTopButton.style.opacity = '0';
                setTimeout(function() {
                    scrollToTopButton.style.display = 'none';
                }, 500);
            }
        }
    });

    // 回頁首：點擊事件
    addEventIfExists('.scrollToTop', 'click', function(e) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        var goCenterLink = document.querySelector('a.goCenter');
        if (goCenterLink) {
            goCenterLink.focus();
        }
        e.preventDefault();
    });

    //cp輪播
    const cpSwiper = new Swiper('.cpSlider .swiper', {
        slidesPerView: 4,
        spaceBetween: 20,
        loop: false,
        // 切換點
        pagination: {
            el: '.cpSlider .swiperDots',
            bulletElement: 'button',
            clickable: true,
        },
        // 切換箭頭
        navigation: {
            nextEl: '.cpSlider .nextSlider', //自行設定樣式
            prevEl: '.cpSlider .prevSlider', //自行設定樣式
            disabledClass: 'swiperArrow-disabled', //不可點選樣式
        },
        breakpoints: {
            100: {
            slidesPerView: 2,
            },
            767: {
            slidesPerView: 4,
            },
        },
    });

    //大圖輪播
    // let mpSliderItem = document.querySelectorAll('.mpSlider .swiper-slide');
    // let mpSliderPagination = [];
    // mpSliderItem.forEach((item, index) => {
    //     mpSliderPagination.push(item.dataset.title);
    // });
    // const mpSlider = new Swiper('.mpSlider .swiper', {
    //     slidesPerView: 1,
    //     loop: false,
    //     // 切換點
    //     pagination: {
    //         el: '.mpSlider .swiperDots',
    //         bulletElement: 'button',
    //         clickable: true,
    //         renderBullet: function (index, className) {
    //             return `<button class="${className} noFonts" aria-label="${mpSliderPagination[index]}">${mpSliderPagination[index]}</button>`;
    //         },
    //     },
    //     // 切換箭頭
    //     navigation: {
    //         nextEl: '.mpSlider .nextSlider', //自行設定樣式
    //         prevEl: '.mpSlider .prevSlider', //自行設定樣式
    //         disabledClass: 'swiperArrow-disabled', //不可點選樣式
    //     },
    // });

    // banner輪播
    // let bannerSliderItem = document.querySelectorAll('.bannerSlider .swiper-slide');
    // let bannerSliderPagination = [];
    // bannerSliderItem.forEach((item, index) => {
    //     bannerSliderPagination.push(item.dataset.title);
    // });
    // const bannerSlider = new Swiper('.bannerSlider .swiper', {
    //     slidesPerView: 1.3, // 每次顯示 1.3 張，確保左右各露出 1/3
    //     spaceBetween: 30,   // 幻燈片之間的距離，可根據需求調整
    //     centeredSlides: true, // 啟用居中顯示
    //     loop: false,          // 關閉循環播放，避免左右滑動無限循環
    //     // 切換點
    //     pagination: {
    //         el: '.bannerSlider .swiperDots',
    //         bulletElement: 'button',
    //         clickable: true,
    //         renderBullet: function (index, className) {
    //             return `<button class="${className} noFonts" aria-label="${bannerSliderPagination[index]}">${bannerSliderPagination[index]}</button>`;
    //         },
    //     },
    //     // 切換箭頭
    //     // navigation: {
    //     //     nextEl: '.bannerSlider .nextSlider', //自行設定樣式
    //     //     prevEl: '.bannerSlider .prevSlider', //自行設定樣式
    //     //     disabledClass: 'swiperArrow-disabled', //不可點選樣式
    //     // },
    // });

    // banner輪播
    let bannerSliderItem = document.querySelectorAll('.bannerSlider .swiper-slide');
    let bannerSliderPagination = [];

    // 收集圖片標題，用於輪播點的 aria-label
    bannerSliderItem.forEach((item) => {
        bannerSliderPagination.push(item.dataset.title);
    });

    // 將第一張幻燈片移動到第二順位
    const swiperWrapper = document.querySelector('.bannerSlider .swiper-wrapper');
    const firstSlide = swiperWrapper.firstElementChild; // 獲取第一張幻燈片
    swiperWrapper.insertBefore(firstSlide, swiperWrapper.children[1]); // 移動到第二順位

    // 初始化 Swiper
    const bannerSlider = new Swiper('.bannerSlider .swiper', {
        slidesPerView: 1.3,     // 每次顯示 1.3 張，確保左右各露出 1/3
        spaceBetween: 20,       // 幻燈片之間的距離
        centeredSlides: true,   // 啟用居中顯示
        loop: true,             // 啟用循環播放
        pagination: {
            el: '.bannerSlider .swiperDots',
            bulletElement: 'button',
            clickable: true,
            renderBullet: function (index, className) {
                return `<button class="${className} noFonts" aria-label="${bannerSliderPagination[index]}">${bannerSliderPagination[index]}</button>`;
            },
        },
    });

    //跑馬燈
    const marqueeSwiper = new Swiper('.marquee .swiper', {
        direction: 'vertical',
        // 切換點
        // 切換箭頭
        navigation: {
            nextEl: '.marquee .nextSlider', //自行設定樣式
            prevEl: '.marquee .prevSlider', //自行設定樣式
            disabledClass: '.marquee marquee-arrow-disabled', //不可點選樣式
        },
    });

    //cp_photo
    const navSlider = new Swiper('.navSlider .swiper', {
        lazy: true, // lazy load
        spaceBetween: 20,
        preloadImages: false, // 多筆設定lazy時須設定
        centeredSlides: false, // 多筆設定lazy時須設定
        slidesPerView: 4,
        // watchSlidesProgress: true,
        navigation: {
        nextEl: '.navSlider .nextSlider', //下一張class，無障礙設定關係需要增加.nextSlider
        prevEl: '.navSlider .prevSlider', //前一張class，無障礙設定關係需要增加.prevSlider
        disabledClass: 'swiperArrow-disabled', //不可點選樣式
        },
        breakpoints: {
        100: {
            slidesPerView: 2,
        },
        767: {
            slidesPerView: 3,
        },
        1000: {
            slidesPerView: 4,
        },
        },
    });

    const sliderFor = new Swiper('.sliderFor .swiper', {
        slidesPerView: 1, //顯示張數
        effect: 'fade', //淡入
        fadeEffect: {
        crossFade: true, //上一張淡出，false上一張不淡出，下一張疊在上方
        },
        pagination: {
        el: '.sliderFor .pagination',
        type: 'fraction', //顯示分頁
        },
        lazy: true,
        thumbs: {
        swiper: navSlider, //設定指向到哪個swiper，使用另一個設定的參數
        },
    });
})();

