(function() {
  var ESCAPE_KEY_CODE = 27;

  var container = document.querySelector('.clearable-input');
  var input = container.querySelector('input');
  var clearInput = container.querySelector('[data-clear-input]');

  conditionallyHideClearIcon();

  input.addEventListener('input', conditionallyHideClearIcon);
  input.addEventListener('keydown', function(event) {
    if (event.keyCode === ESCAPE_KEY_CODE) {
      input.value = '';
      conditionallyHideClearIcon();
    }
  });

  clearInput.addEventListener('click', function(event) {
    input.value = '';
    conditionallyHideClearIcon();
  });

  function conditionallyHideClearIcon(event) {
    var target = (event && event.target) || input;
    target.nextElementSibling.style.display = target.value ? 'block' : 'none';
  }
})();