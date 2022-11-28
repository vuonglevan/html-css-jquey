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

$(document).ready(function () {
    $(document).on('click', '.js-btn-tab', showSliderDeriodic)
    $(document).on('mousedown', '.js-slider', handleMousedownSlide)
    $(document).on('mouseleave', '.js-slider', handleMouseleaveSlide);
    $(document).on('mouseup', '.js-slider', handleMouseupSlide);
    $(document).on('mousemove', '.js-slider', handleMousemoveSlide);
});