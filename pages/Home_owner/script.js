let isDown = false;
let startX;
let scrollLeft;

function showSliderDeriodic() {
    const currentTab = $(this);
    $('.js-btn-tab').removeClass('btn_active');
    $('.btn-inital').not($(this).parents('.buttons').find('.btn-inital')).addClass('btn_active');
    currentTab.addClass('btn_active');

    const content = currentTab.closest('.tab-container');
    content.find('.btn.btn_active').removeClass('btn_active');
    currentTab.addClass('btn_active');
    const target = currentTab.attr('data-target');
    content.find('.slider-container').removeClass('active');

    $('.slider-container').removeClass('active');
    $('.slider-inital').not($(this).parents('.tab-container').find('.slider-inital')).addClass('active');
    $(target).addClass('active');
}

function showManageDetail() {
    const currentTab =$(this);
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

function showmore (){
    $('.manage-detail').removeClass('hidden');
    $('.page').addClass('hidden');
}

function backtohome(){
    $('.manage-detail').addClass('hidden');
    $('.page').removeClass('hidden');
}

$(document).ready(function () {
    $(document).on('click', '.js-btn-tab', showSliderDeriodic)
    $(document).on('click', '.js-btn-manage-tab', showManageDetail)
    $(document).on('click', '.js-showmore',showmore );
    $(document).on('click', '.js-back-to-home',backtohome );
    $(document).on('mousedown', '.js-slider', handleMousedownSlide)
    $(document).on('mouseleave', '.js-slider', handleMouseleaveSlide);
    $(document).on('mouseup', '.js-slider', handleMouseupSlide);
    $(document).on('mousemove', '.js-slider', handleMousemoveSlide);
});