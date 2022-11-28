console.log('test');
let isDown = false;
let startX;
let scrollLeft;

function handleMousedownSlide(e) {
    const slider = $(this);
    isDown = true;
    // slider.addClass('active');
    startX = e.pageX - slider[0].offsetLeft;
    scrollLeft = slider[0].scrollLeft;
}

function handleMouseleaveSlide() {
    // const slider = $(this);
    isDown = false;
    // slider.removeClass('active');
}

function handleMouseupSlide() {
    // const slider = $(this);
    isDown = false;
    // slider.removeClass('active');
}

function handleMousemoveSlide(e) {
    if (!isDown) return;
    e.preventDefault();
    const slider = $(this);
    const x = e.pageX - slider[0].offsetLeft;
    const walk = x - startX;
    slider[0].scrollLeft = scrollLeft - walk;
}

function showTab() {
    const tabCurrent = $(this);
    $('.js-tab-item.btn_active').removeClass('btn_active');
    tabCurrent.addClass('btn_active');
    const target = tabCurrent.attr('data-target');
    $('.tab-content-item').removeClass('active');
    $(target).addClass('active');
}

function handleClickTest() {
    const btnCurent = $(this);
    const id = $(btnCurent.attr('data-id'));
    $('.tab-content-item').removeClass('active');
    id.addClass('active')
}

$(document).ready(function () {
    $(document).on('click', '.js-tab-item', showTab);
    $(document).on('mousedown', '.table-container', handleMousedownSlide);
    $(document).on('mouseleave', '.table-container', handleMouseleaveSlide);
    $(document).on('mouseup', '.table-container', handleMouseupSlide);
    $(document).on('mousemove', '.table-container', handleMousemoveSlide);
    $(document).on('click', '.js-test-tab', handleClickTest);
})