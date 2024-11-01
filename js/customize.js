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
    let mpSliderItem = document.querySelectorAll('.mpSlider .swiper-slide');
    let mpSliderPagination = [];
    mpSliderItem.forEach((item, index) => {
        mpSliderPagination.push(item.dataset.title);
    });
    const mpSlider = new Swiper('.mpSlider .swiper', {
        slidesPerView: 1,
        loop: false,
        // 切換點
        pagination: {
            el: '.mpSlider .swiperDots',
            bulletElement: 'button',
            clickable: true,
            renderBullet: function (index, className) {
                return `<button class="${className} noFonts" aria-label="${mpSliderPagination[index]}">${mpSliderPagination[index]}</button>`;
            },
        },
        // 切換箭頭
        navigation: {
            nextEl: '.mpSlider .nextSlider', //自行設定樣式
            prevEl: '.mpSlider .prevSlider', //自行設定樣式
            disabledClass: 'swiperArrow-disabled', //不可點選樣式
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

    // m1 郵你生活圈，就差你一員！
    // 初始化 Swiper
    const swiper = new Swiper(".swiper", {
        navigation: {
            nextEl: ".nextSlider",
            prevEl: ".prevSlider"
        },
        on: {
            init: function () {
            // 初始化時對應的第一個 li 加入 .act
            document.querySelectorAll("ul.step li")[0].classList.add("act");
            },
            slideChange: function () {
            // 取得所有的 li
            const steps = document.querySelectorAll("ul.step li");

            // 清除所有 li 上的 .act
            steps.forEach((li) => li.classList.remove("act"));

            // 根據 Swiper 的 activeIndex 加入 .act
            const activeIndex = this.activeIndex;
            if (steps[activeIndex]) {
                steps[activeIndex].classList.add("act");
            }
            }
        }
    });

    // m4 常見問題
    document.querySelectorAll('._QA .item').forEach((item, index) => {
        const btnSwitch = item.querySelector('.btn-switch');
        const answerSection = item.querySelector('.A');

        btnSwitch.addEventListener('click', function() {
            // 判斷 btn-switch 是否有 .act 類
            if (btnSwitch.classList.contains('act')) {
                btnSwitch.classList.remove('act');  // 移除 .act
                answerSection.classList.remove('show');  // 隱藏 .A
            } else {
                btnSwitch.classList.add('act');  // 添加 .act
                answerSection.classList.add('show');  // 顯示 .A
            }
        });
    });
})();

