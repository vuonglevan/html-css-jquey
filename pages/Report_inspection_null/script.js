const calender = $('.js-calendar');
const inputDate = $('#date');
const tableImg = $('.table');
const listSelect = $('.list-select');

const MAXSTEP = 2;
let step = 0;

const changeStep = (e) => {
    e.preventDefault();
    const form = $('form:eq(' + step + ')');
    if (step > MAXSTEP || form.length <= 0 || !form[0].checkValidity()) {
        console.log('no pass');
        return;
    }

    $('.step').children().eq(step).removeClass();
    $('.step').children().eq(step).addClass('done');

    const content = $(`.step .step_div:eq(${step})`);
    content.children('div').eq(0).addClass('step-disabled');
    content.children('div').eq(2).addClass('step-disabled');
    content.children('div').eq(1).addClass('disabled');

    if (step == 0) {
        $('.form-information').removeClass('form-hide');
        $('.form-confirm').addClass('form-hide');
        initSelect2($('.select-item'));
    } else if (step == 1) {
        $('.form-information').addClass('form-hide');
        $('.identification').removeClass('form-hide');
        initSelect2($('.js-custom-select'));
    } else if (step == 2) {
        $('.change-content').addClass('form-hide');
        $('.inspection-report').removeClass('form-hide');
    }

    step += 1;
    const contentStep = $(`.step .step_div:eq(${step})`);
    contentStep.children('div').eq(0).addClass('step-active');
    contentStep.children('div').eq(2).addClass('step-active');
    contentStep.children('div').eq(1).addClass('active');
}

//datepicker
function datepicker() {
    inputDate.datepicker({
        dateFormat: 'yy.mm.dd'
    }).datepicker('option', 'dateFormat', 'yy.mm.dd');;
}

// select
function formatState(state) {
    if (!state.id) {
        return state.text;
    }
    var $state = $(
        '<span class="option2"><i class="fa-solid fa-circle-user icon-user"></i><span class="user-options">'+state.text+'</span></span>'
    );
    $state.find("span").text(state.text);
    return $state;
};

function initSelect2($ele) {
    $ele.select2({
        placeholder: "ユーザーを入力してください",
        templateSelection: formatState
    });
}

const checkImg = () => {
    const [file] = $('input[type="file"]').prop('files');
    if (file) {
        showImg(file);
    }
}

const showImg = (file) => {
    if (!file.type.match('image/jpeg|image/png|image/gif')) {
        return false;
    }
    const template = $('#template').clone();
    template.removeClass('form-hide');
    template.removeAttr('id');
    template.addClass('tr');
    template.find('img').attr('src', URL.createObjectURL(file));
    template.find('.name-img').text(file.name);
    template.find('.progress span').text(`${(file.size / (1024 * 1024)).toFixed(2)}MB`);
    tableImg.append(template);
}

const addColumSelectStep3 = () => {
    const count = $('.selected:not(#template-select)').length + 1;
    const select = $('#template-select').clone();
    const init = select.find('.js-select-user:not(.js-custom-select)');
    select.removeAttr('id');
    select.find('.selection').addClass('form-hide');
    select.find('.index').text(count);
    select.removeClass('form-hide');
    select.addClass('js-select2');
    listSelect.append(select);
    initSelect2(init);
}

function updateCount() {
    $('.selected:not(#template-select').each(function (index) {
        $(this).find('.index').text(index + 1);
    });
}

const dragover = (e) => {
    e.stopPropagation();
    e.preventDefault();
    $('.upload-img_container').addClass('upload-img_container-active');
}

const dragleave = (e) => {
    e.stopPropagation();
    e.preventDefault();
    $('.upload-img_container').removeClass('upload-img_container-active');
}

const dropImg = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const [file] = e.originalEvent.dataTransfer.files;
    if (file) {
        showImg(file);
    }
}

const calenderClick = () => {
    inputDate.datepicker();
    calender.on('click', function () {
        inputDate.datepicker('show');
    });
}

const showInspectionReport = (e) => {
    e.preventDefault();
    const form = $('.form-identification');
    if (!form[0].checkValidity()) {
        return false;
    }
    $('.identification').addClass('form-hide');
    $('.change-content').removeClass('mb');
    $('.inspection-report').removeClass('form-hide');
    $('.inspection-report').addClass('mb');
}

const resultPage = (e) => {
    e.preventDefault();
    $('.change-content').addClass('form-hide');
    $('.modal-storage').removeClass('modal-storage_show');
    $('.inspection-report-two').removeClass('form-hide');
    $('.inspection-report-two').addClass('mb');
}

function removeImg() {
    const btn = $(this);
    const imgItem = btn.closest('.tr');
    imgItem.fadeOut('slow', function () {
        $(this).remove();
    });
}

function removeSelect() {
    const count = $('.selected:not(#template-select)').length;
    if(count <= 1) return;
    const btn = $(this);
    const itemSelect = btn.closest('.selected');
    itemSelect.fadeOut('slow', function () {
        $(this).remove();
        updateCount();
    });
}

function activeInputImg() {
    $('#input-img').click();
}

function showModal(e) {
    resultPage(e);
    $('.js-modal').removeClass('modal');
    $('.js-modal').addClass('modal-show');
}

function showModalStorage(e) {
    e.preventDefault();
    $('.modal-storage').addClass('modal-storage_show');
}

function cancel(e) {
    e.preventDefault();
    $('.js-modal').addClass('.modal-show');
    $('.js-modal-storage').addClass('modal-storage');
    $('.js-modal-storage').removeClass('modal-storage_show');
}

function showReportTwo(e) {
    e.preventDefault();
    $('.js-modal').addClass('modal');
    $('.js-modal').removeClass('modal-show');
    $('.inspection-report-two').removeClass('form-hide');
    $('.inspection-report-two').addClass('mb');
    $('.inspection-report').addClass('form-hide');
}
$(document).ready(function () {
    datepicker();
    calenderClick();
    $(document).on('click', '.js-btn_cancel', showModalStorage)
    $(document).on('click', '.js_nextstep', changeStep)
    $(document).on('click', '.js-btn-identification', showInspectionReport)
    $(document).on("drop", '.upload-img_content', dropImg);
    $(document).on("dragover", '.upload-img_content', dragover);
    $(document).on("dragleave", '.upload-img_content', dragleave);
    $(document).on("click", '.add-person', addColumSelectStep3);
    $(document).on("click", '.js-inspection-report', showModal);
    $(document).on("click", '.js-cancel', cancel);
    $(document).on("click", '.js-show-inspection-report-two', showReportTwo);
    $(document).on('click', '.js-pass', resultPage)
    $(document).on('click', '.js-remove-select', removeSelect)
    $(document).on('click', '.js-remove-img', removeImg)
    $(document).on('change', '#input-img', checkImg)
    $(document).on('click', '.js-btn-upload', activeInputImg)
})
