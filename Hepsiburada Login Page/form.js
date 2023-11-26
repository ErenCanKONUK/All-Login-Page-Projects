const DOM = {
    loginFormId: '#loginForm',
    registerFormId: '#registerForm',

    errRowClassStr: 'errRow',
    activeClassStr: 'active',

    errorContentClass: '.error-content',
    tabItemClass: '.tab-item',
    formContentClass: '.form-content',
    passwordVisibleClass: '.password-visible'
};

$(document).ready(() => {
    //#region custom validations
    $.validator.addMethod("my-email", function (value, element) {
        var regex = new RegExp(/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z](?:[a-z]*[a-z])?$/gmi);
        return regex.test(value);
    });
    $.validator.addMethod("my-password", function (value, element) {
        var regex = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/gim);
        return regex.test(value);
    });
    //#endregion

    //#region validation
    $(DOM.loginFormId).validate({
        highlight: function (element, errorClass, validClass) {
            $(element).addClass(errorClass);
            $(element).parent().addClass(DOM.errRowClassStr);
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass(errorClass);
            $(element).parent().removeClass(DOM.errRowClassStr);

            $(element).parent().find(DOM.errorContentClass).html('');
        },
        errorPlacement: function (error, element) {
            $(element).parent().find(DOM.errorContentClass).html(error.html());
        },
        invalidHandler: function (form, validator) {
            if (!validator.numberOfInvalids())
                return;

            $('html, body').animate({
                scrollTop: $(validator.errorList[0].element).offset().top - 150
            }, 100);
        }
    });
    $(DOM.registerFormId).validate({
        highlight: function (element, errorClass, validClass) {
            $(element).addClass(errorClass);
            $(element).parent().addClass(DOM.errRowClassStr);
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass(errorClass);
            $(element).parent().removeClass(DOM.errRowClassStr);

            $(element).parent().find(DOM.errorContentClass).html('');
        },
        errorPlacement: function (error, element) {
            $(element).parent().find(DOM.errorContentClass).html(error.html());
        },
        invalidHandler: function (form, validator) {
            if (!validator.numberOfInvalids())
                return;

            $('html, body').animate({
                scrollTop: $(validator.errorList[0].element).offset().top - 150
            }, 100);
        }
    });
    //#endregion

    //#region tab
    $('body').on('click', DOM.tabItemClass, function(e) {
        const thisEl = $(this);
        const target_id = thisEl.attr('data-id');

        $(DOM.tabItemClass).removeClass(DOM.activeClassStr);
        thisEl.addClass(DOM.activeClassStr);

        $(DOM.formContentClass).removeClass(DOM.activeClassStr);
        $(`${DOM.formContentClass}#${target_id}`).addClass(DOM.activeClassStr);
    });
    //#endregion

    //#region login form
    $(DOM.loginFormId).on('submit', function(e) {
        if($(DOM.loginFormId).valid()) {
            alert('ajax');
        }
    });
    //#endregion
    
    //#region register form
    $(`${DOM.registerFormId} [name]`).on('input', function(e) {
        const buttonEl = $(`${DOM.registerFormId} [type="submit"]`);
        if($(DOM.registerFormId).valid()) {
            buttonEl.removeAttr('disabled');
        } else {
            buttonEl.attr('disabled', 'disabled');
        }
    });

    $(DOM.registerFormId).on('submit', function(e) {
        if($(DOM.registerFormId).valid()) {
            alert('ajax');
        }
    });
    //#endregion

    //#region visible password
    $('body').on('click', DOM.passwordVisibleClass, function() {
        const thisEl = $(this);
        const target = thisEl.attr('data-target');
        thisEl.toggleClass(DOM.activeClassStr);

        const targetEl = $(target);

        if(targetEl.attr('type') == 'password') {
            targetEl.attr('type', 'text')
        } else {
            targetEl.attr('type', 'password')
        }
    });
    //#endregion
});