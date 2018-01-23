var moduleApp = {
  'formDate':function(){
    $('input[name="date"]').datepicker({
      dateFormat: "dd.mm.yy",
      monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      dayNames: ["Воскресенье", "Понедельник", "Вторник", "Средя", "Четверг", "Пятница", "Суббота"],
      dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      firstDay: 1,
      maxDate: "-1y -1m", // максимальная дата рождения -1 год -1 месяц
    });
  },
  'dialogErrors':function(arNameErrors){
    var $htmlErrorsDialog = $('<ul />');
    $('.form-errors').dialog({
      title: 'Ошибки формы',
      dialogClass: "no-close",
      buttons: [
        {
          text: "OK",
          click: function() {
            $( this ).dialog( "close" );
          }
        }
      ]
    });
    for(var index in arNameErrors){
      var $htmlError = $('<li />', {
        text: arNameErrors[index]
      });
      $htmlErrorsDialog.append($htmlError);
    }
    var $htmlDialog = $('.form-errors.ui-dialog-content');
    $htmlDialog.empty();
    $htmlDialog.append($htmlErrorsDialog);
  },
  'viewFormErrors':function($input, noError = false){
    if (noError){
      var color = "#2dec15";
    } else {
      var color = "#ec4015";
    }
    $input.closest('.form-input').animate({
      borderTopColor: color,
      borderLeftColor: color,
      borderRightColor: color,
      borderBottomColor: color
    });
  },
  'validationForm':function($submitBtn,submitFunction){
    var arErrors = [];
    $submitBtn = $submitBtn || $('.js-form-submit');
    submitFunction = submitFunction || false;
    $submitBtn.closest('form').addClass('is-form-validation');
    $submitBtn.click(function(e){
      arErrors = [];
      var $this = $(this);
      if ($this.hasClass('disabled')) { return false; }
      var $form  = $this.closest('form');
      var $forms = $form.find('[data-validate]');
      var result = formChecking($forms,true);
      if (result) {
        if (submitFunction) {
          $this.addClass('disabled');
          submitFunction();
        } else {
          return true;
        }
      } else {
        if (arErrors.length > 0){
          moduleApp.dialogErrors(arErrors);
          //moduleApp.viewFormErrors();
        }
        $forms.on('keyup keypress change', function() {
          var $current = $(this);
          setTimeout(function(){ formChecking($current); }, 50);
        });
      }
      e.preventDefault();
    });

    $(document).on('keydown',function(e){
      if(e.keyCode == 13) {
        var $thisFocus = $(document.activeElement);
        if ($thisFocus.is('textarea')) { return true; alert('123'); }
        if ($thisFocus.closest('.form-select').length) { return true; }
        if ($thisFocus.closest('.is-form-validation').length) { $submitBtn.trigger('click'); }
      }
    });

    function formChecking($inp,onFocus) {
      onFocus = onFocus || false;
      var noError = true;
      $inp.each(function(ind,elm){
        var $this = $(elm);
        var mask = $this.data('validate');
        var value = $this.val();
        var placeHolder = $this.attr('placeholder');
        if (mask == 'text') {
          if ((value.length < 1) || (value == placeHolder)) {
            noError = false;
            $this.closest('.form-input').addClass('show-error');
            if (onFocus) { $this.focus(); onFocus = false; }
          } else { $this.closest('.form-input').removeClass('show-error'); }
        }
        if (mask == 'email') {
          var regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          if (!regex.test(value) || (value == placeHolder)) {
            noError = false;
            $this.closest('.form-input').addClass('show-error');
            if (onFocus) { $this.focus(); onFocus = false; }
          } else { $this.closest('.form-input').removeClass('show-error'); }
        }
        if (mask == 'phone') {
          var regex = /^\+7\(([0-9]{3})+\)([0-9]{3})+\-([0-9]{4})$/;
          if (!regex.test(value) || (value == placeHolder)) {
            noError = false;
            $this.closest('.form-input').addClass('show-error');
            if (onFocus) { $this.focus(); onFocus = false; }
          } else { $this.closest('.form-input').removeClass('show-error'); }
        }
        if (mask == 'date') {
          var regex = /^([0-9]{2})+\.([0-9]{2})+\.([0-9]{4})$/;
          if (!regex.test(value)) {
            noError = false;
            $this.closest('.form-input').addClass('show-error');
            if (onFocus) { $this.focus(); onFocus = false; }
          } else { $this.closest('.form-input').removeClass('show-error'); }
        }
        if (noError === false){
          arErrors.push(placeHolder);
        }
        moduleApp.viewFormErrors($this, noError);
      });
      return noError;
    }
  },
}

$(document).ready(function(){
  moduleApp.checkBasket();
  moduleApp.validationForm();
  moduleApp.formDate();
});