// 自行加入的JS請寫在這裡
$(function () {

    // 跳窗關閉
    // 1. 置中
    $('#mask').find('.btnClose').on('click', function(){
        $('#mask').hide();
    });
    // 2.對齊下方
    $('#mask_below').find('.btnClose').on('click', function(){
        $('#mask_below').addClass('_hide');
    });

    // 展開下方跳窗
    $('._openMask').on('click', function(){
        $('#mask_below').removeClass('_hide');
    });

    // password_toggle
    $('.content._psssToggle').each(function() {
        $(this).on('click', '.btn', function() {
            let $btn = $(this);
            let $input = $btn.siblings('input[name="password"]');
            
            if ($btn.hasClass('_iconShow')) {
                $btn.removeClass('_iconShow'); // 移除 ._iconShow 類
                $input.attr('type', 'password'); // 將 input type 改為 password
                $btn.attr('aria-label', '顯示密碼'); // 更新 aria-label
            } else {
                $btn.addClass('_iconShow'); // 加入 ._iconShow 類
                $input.attr('type', 'text'); // 將 input type 改為 text
                $btn.attr('aria-label', '隱藏密碼'); // 更新 aria-label
            }
        });
    });
});
