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
    // addEventIfExists('.sidebarCtrl', 'click', function() {
    //     var headerNav = document.querySelector('header nav');
    //     if (headerNav) {
    //         headerNav.classList.toggle('show');
    //     }
    // });

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
})();

