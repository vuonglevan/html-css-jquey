let isDown = false;
let startX;
let scrollLeft;

function showSliderDeriodic() {
    const currentTab = $(this);
    const content = currentTab.closest('.tab-container');
    content.find('.btn.btn_active').removeClass('btn_active');
    currentTab.addClass('btn_active');
    const target = currentTab.attr('data-target');
    content.find('.slider-container').removeClass('active');
    $(target).addClass('active')
}

function showManageDetail() {
    const currentTab = $(this);
    $('.js-btn-manage-tab').removeClass('btn_active');
    currentTab.addClass('btn_active');
    $('.manage-container-tab').removeClass('active');
    const target = currentTab.attr('data-target');
    $(target).addClass('active');
}

function handleMousedownSlide(e) {
    const slider = $(this);
    isDown = true;
    startX = e.pageX - slider[0].offsetLeft;
    scrollLeft = slider[0].scrollLeft;
}

function handleMouseleaveSlide() {
    isDown = false;
}

function handleMouseupSlide() {
    isDown = false;
}

function handleMousemoveSlide(e) {
    if (!isDown) return;
    e.preventDefault();
    const slider = $(this);
    const x = e.pageX - slider[0].offsetLeft;
    const walk = x - startX;
    slider[0].scrollLeft = scrollLeft - walk;
}

function showmore() {
    const manage = $(this).attr('data-showmore');
    console.log(manage);
    $(manage).addClass('active');
    $('.js-page-container').addClass('hidden');
}

function backtohome() {
    const variableBack = $(this).attr('data-back');
    $('.js-page-container').removeClass('hidden');
    $(variableBack).removeClass('active');
    $(variableBack).addClass('hidden');
}

function showMessage() {
    // const height = $(document).height();
    // const alert = $('#alert-aminal');
    // alert.height(height / 3);
    if ($('.js-popup-alert.show').length) return;
    const status = $(this).attr('data-status');
    if (status) {
        const classAlert = $(this).attr('data-status');
        $('#alert-aminal').removeClass();
        $('#alert-aminal').addClass(classAlert);
        $('#alert-aminal').addClass('js-popup-alert');
        setTimeout(() => {
            $('#alert-aminal').addClass('show');
        }, 1001)
    }
}

function handleClickOutside(e) {
    const currentElement = $(e.target);
    if ($('.js-popup-alert.show').length && !currentElement.hasClass('js-popup-alert') && !currentElement.parents('.js-popup-alert').length) {
        $('#alert-aminal').addClass('downAlert');
        $('#alert-aminal').removeClass('show');
    }
}

$(document).ready(function () {
    $(document).on('click', '.js-btn-tab', showSliderDeriodic);
    $(document).on('click', '.js-btn-manage-tab', showManageDetail);
    $(document).on('click', '.js-showmore', showmore);
    $(document).on('click', '.js-back-to-home', backtohome);
    $(document).on('click', '.slider-content-item', showMessage);
    $(document).on('click', handleClickOutside);
    $(document).on('mousedown', '.js-slider', handleMousedownSlide);
    $(document).on('mouseleave', '.js-slider', handleMouseleaveSlide);
    $(document).on('mouseup', '.js-slider', handleMouseupSlide);
    $(document).on('mousemove', '.js-slider', handleMousemoveSlide);
});