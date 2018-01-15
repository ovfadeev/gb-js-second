var moduleApp = {
  'tabs':function(){
    var classActive = 'active';
    var divTabs = $('.tabs-list');
    var titleTabs = divTabs.find('.tabs-list-title');
    var descTabs = divTabs.find('.tabs-list-desc');

    descTabs.hide();

    $(titleTabs[0]).addClass(classActive);
    $(descTabs[0]).show();

    divTabs.find('ul li a').on('click', function(e){
      e.preventDefault();
      var my = $(this);
      var idTabDesc = my.attr('href');

      $.each(titleTabs, function(key, items) {
        $(items).removeClass(classActive);
      });

      $.each(descTabs, function(key, items) {
        $(items).hide();
      });

      my.addClass(classActive);
      divTabs.find('div' + idTabDesc).show();

    });
  },
  'validationForm':function($submitBtn,submitFunction){
    $submitBtn = $submitBtn || $('.js-form-submit');
    submitFunction = submitFunction || false;
    $submitBtn.closest('form').addClass('is-form-validation');
    $submitBtn.click(function(e){
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
        if (mask == 'textarea') {
          if ((value.length < 1) || (value == placeHolder)) {
            noError = false;
            $this.closest('.form-textarea').addClass('show-error');
            if (onFocus) { $this.focus(); onFocus = false; }
          } else { $this.closest('.form-textarea').removeClass('show-error'); }
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
      });
      return noError;
    }
  },
  'loadCity':function(){
    var inputCity = $('input[name="city"]');
    var divLoad = inputCity.closest('.form-input').find('div.load');

    inputCity.on('keyup', function(e){
      var my = $(this);
      var valueInput = my.val();

      divLoad.find('ul').remove();

      if (valueInput.length >= 3){
        $.ajax({
          url: 'ajax/city.json',
          type: 'GET',
          dataType: 'json',
          success: function(data){
            if (data.result == true){
              var loadHtml = '';
              var newHtml = '';
              for (var i = 0; i < data.cities.length; i++) {
                var city = data.cities[i];
                var regExp = new RegExp(valueInput, 'ig');
                if (city.match(regExp) !== null){
                  var newCity = city.replace(regExp, '<b>' + valueInput + '</b>');
                  loadHtml += '<li><a href="#" data-name="'+ city +'">' + newCity + '</a></li>';
                }
              }
              if (loadHtml.length > 0){
                newHtml += '<ul>';
                newHtml += loadHtml;
                newHtml += '</ul>';
                divLoad.append(newHtml);
                divLoad.show();
              }
            }else{}
          },
          error: function(){}
        });
      }
    });

    divLoad.on('click', 'a', function(e){
      e.preventDefault();
      var linkValue = $(this).attr('data-name');

      inputCity.val(linkValue);
      divLoad.find('ul').remove();
    });
  }
}

$(document).ready(function(){
  moduleApp.tabs();
  moduleApp.validationForm();
  moduleApp.loadCity();
});