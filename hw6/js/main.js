var moduleApp = {
  'checkBasket':function(){
    var basket = new Basket();
    basket.render('.basket-list');

    $('.buyme').on('click', function () {
        var idPruduct = parseInt($(this).attr('data-id-product'));
        var name = $(this).parent().find('.name').html();
        var quantity = parseInt($(this).parent().find('.quantity').val());
        var price = parseInt($(this).attr('data-price'));

        basket.add(idPruduct, quantity, price, name);
    });

    $('.basket-list').on('click', '.remove-item', function (e) {
        e.preventDefault();
        var idPruduct = parseInt($(this).attr('data-id-product'));

        basket.delete(idPruduct);
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

    function checkError($inp, value, placeholder, onFocus, regex = ""){
      var error = true;
      if (((value.length < 1) || (regex != "" && !regex.test(value))) || (value == placeHolder)) {
        error = false;
        $inp.closest('.form-input').addClass('show-error');
      } else { $inp.closest('.form-input').removeClass('show-error'); }
      return error;
    }

    function formChecking($inp,onFocus) {
      var error;
      $inp.each(function(ind,elm){
        var $this = $(elm);
        var mask = $this.data('validate');
        var value = $this.val();
        var placeHolder = $this.attr('placeholder');
        if (mask == 'text') {
          error = checkError($this, value, placeHolder, onFocus);
        }
        if (mask == 'email') {
          var regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          error = checkError($this, value, placeHolder, onFocus, regex);
        }
        if (mask == 'phone') {
          var regex = /^\+7\(([0-9]{3})+\)([0-9]{3})+\-([0-9]{4})$/;
          error = checkError($this, value, placeHolder, onFocus, regex);
        }
      });
      return error;
    }
  },
}

$(document).ready(function(){
  moduleApp.checkBasket();
  moduleApp.validationForm();
});