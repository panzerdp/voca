(function() {
  var ESCAPE_KEY_CODE = 27;

  var map = Array.prototype.map;

  var container = document.querySelector('.clearable-input');
  var input = container.querySelector('input');
  var clearInput = container.querySelector('[data-clear-input]');

  var structure = null;

  conditionallyHideClearIcon();

  input.addEventListener('input', function() {
    var value = input.value;
    if (value === '') {
      restoreStructure();
    } else {
      filterStructure(value);
    }
    conditionallyHideClearIcon();
  });
  input.addEventListener('keydown', function(event) {
    if (event.keyCode === ESCAPE_KEY_CODE) {
      input.value = '';
      conditionallyHideClearIcon();
      restoreStructure();
    }
  });

  clearInput.addEventListener('click', function(event) {
    input.value = '';
    conditionallyHideClearIcon();
    restoreStructure();
  });

  function conditionallyHideClearIcon(event) {
    var target = (event && event.target) || input;
    target.nextElementSibling.style.display = target.value ? 'block' : 'none';
  }

  function filterStructure(query) {
    if (structure === null) {
      structure = getStructure();
    }
    var containsQuery = contains.bind(undefined, query.toLowerCase());
    structure.forEach(function(categoryStructure) {
      var categoryNameMatch = containsQuery(categoryStructure.name);
      if (categoryNameMatch) {
        categoryStructure.functions.forEach(showStructure);
        showStructure(categoryStructure);
      } else {
        var categoryHasMatchedFunctions = false;
        categoryStructure.functions.forEach(function(functionStructure) {
          if (containsQuery(functionStructure.name)) {
            categoryHasMatchedFunctions = true;
            showStructure(functionStructure);
          } else {
            hideStructure(functionStructure);
          }
        });
        if (categoryHasMatchedFunctions) {
          showStructure(categoryStructure);
        } else {
          hideStructure(categoryStructure);
        }
      }
    });
  }

  function restoreStructure() {
    if (structure === null) {
      structure = getStructure();
    }
    structure.forEach(function(categoryStructure) {
      showStructure(categoryStructure);
      categoryStructure.functions.forEach(showStructure);
    });
  }

  function getStructure() {
    var categoryElements = document.querySelectorAll('nav>ul>li>h2');
    return map.call(categoryElements, function(categoryElement) {
      return {
        name: categoryElement.textContent.toLowerCase(),
        element: categoryElement.parentNode,
        functions: getCategoryFunctionsStructure(categoryElement.parentNode)
      }
    });
  }

  function getCategoryFunctionsStructure(categoryElement) {
    var methodElements = categoryElement.querySelectorAll('li>a');
    return map.call(methodElements, function(methodElement) {
      return {
        name: methodElement.textContent.toLowerCase(),
        element: methodElement.parentElement
      }
    });
  }

  function contains(query, subject) {
    return subject.indexOf(query) !== -1;
  }

  function hideStructure(structure) {
    structure.element.style.display = 'none';
  }

  function showStructure(structure) {
    var element = structure.element;
    if (element.style.display !== '') {
      element.style.display = '';
    }
  }
})();