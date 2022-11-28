const showPassword = document.querySelector('#showpassword_js');
const inputPassword = document.querySelector('#owner-account_authority-form_input_password');
const userInputText = document.querySelector('#user_circle_js');
const btnPrimary = document.querySelector('#btn_primary');
const inputCheckbox = document.querySelector('#checkbox');
const inputModal = document.querySelector('#modal-owner-account_authority-form_input_text');
const userIconModal = document.querySelector('#modal-user_circle_js');
const removeTextModel = document.querySelector('#modal-removeText_js');
const btnPrimaryModal = document.querySelector('.modal-page-foot_passed_js');
const btnCancelModal = document.querySelector('.modal-page-foot_cancel_js');
const btnModal2 = document.querySelector('.btn-modal2_js');
const select = document.querySelector('#select');

let modal = document.getElementById("myModal");
let modal2 = document.getElementById("modal2");
let span = document.getElementsByClassName("close")[0];
let flagSelect = false;
let flagInputPassword = false;
let checked = false;

showPassword.addEventListener('click', () => {
    if (inputPassword.type == 'password') {
        inputPassword.setAttribute('type', 'text');
        showPassword.setAttribute('class', 'fa-sharp fa-solid fa-eye-slash');
    } else {
        inputPassword.setAttribute('type', 'password');
        showPassword.setAttribute('class', 'fa-solid fa-eye');
    }
})

function validateForm() {
    if (flagSelect && flagInputPassword && checked) {
        btnPrimary.removeAttribute('disabled');
        btnPrimary.setAttribute('style', "");
    } else {
        btnPrimary.setAttribute('disabled', true);
        btnPrimary.setAttribute('style', "opacity:0.5;");
    }
}
validateForm();

$('#select').on('select2:select', function (e) {
    if (e.target.value) {
        flagSelect = true;
    } else {
        flagSelect = false;
    }
    validateForm();
});

$('#select').on("select2:unselect", function (e) {
        flagSelect = false;
        validateForm();
})

inputPassword.addEventListener('keyup', (e) => {
    if (e.target.value.length > 0) {
        flagInputPassword = true;
    } else {
        flagInputPassword = false;
    }
    validateForm();
})

inputCheckbox.addEventListener('click', (e) => {
    checked = e.target.checked;
    validateForm();
})

// modal
if (inputModal.value) {
    userIconModal.setAttribute('class', 'fa-solid fa-circle-user');
    userIconModal.setAttribute('style', 'top: 60px;');
    inputModal.setAttribute('style', 'padding-left: 40px;padding-right:40px');
    removeTextModel.setAttribute('class', 'fa-solid fa-xmark');
}

inputModal.addEventListener('keyup', (e) => {
    if (e.target.value.length > 0) {
        removeTextModel.setAttribute('class', 'fa-solid fa-xmark');
        userIconModal.setAttribute('class', 'fa-solid fa-circle-user');
        inputModal.setAttribute('style', 'padding-left: 40px;padding-right:40px');
        btnPrimaryModal.removeAttribute('disabled');
        btnPrimaryModal.setAttribute('style', "");
    } else {
        removeTextModel.setAttribute('class', '');
        userIconModal.setAttribute('class', '');
        inputModal.setAttribute('style', '');
        btnPrimaryModal.setAttribute('disabled', true);
        btnPrimaryModal.setAttribute('style', "opacity:0.5;");
    }
})
removeTextModel.addEventListener('click', () => {
    inputModal.value = '';
    removeTextModel.setAttribute('class', '');
    userIconModal.setAttribute('class', '');
    inputModal.setAttribute('style', '');
    btnPrimaryModal.setAttribute('disabled', true);
    btnPrimaryModal.setAttribute('style', "opacity:0.5;");
})

btnPrimary.addEventListener('click', () => {
    modal.style.display = "flex";
})

btnCancelModal.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

btnPrimaryModal.addEventListener('click', () => {
    modal.style.display = "none";
    modal2.style.display = "flex";
})


//modal2
btnModal2.addEventListener('click', () => {
    modal2.style.display = "none";
})

function formatState(state) {
    if (!state.id) {
        return state.text;
    }

    var $state = $(
        '<span class="option2"><i class="i" ></i> <span></span></span>'
    );

    $state.find("span").text(state.text);
    $state.find(".i").attr('class', 'icon fa-solid fa-circle-user');
    return $state;
};

$(document).ready(function () {
    $('#select').select2({
        placeholder: "ユーザーを入力してください",
        allowClear: true,
        selectOnClose: true,
        templateSelection: formatState
    });
})