/* jshint esversion: 6 */
/* MODEL */
let model = {
  currentElement : null,
  elements : [
    {
      name : 'One',
      count : 0,
      image : 'images/one.png'
    },
    {
      name : 'Two',
      count : 0,
      image : 'images/two.png'
    },
    {
      name : 'Three',
      count : 0,
      image : 'images/three.png'
    },
    {
      name : 'Four',
      count : 0,
      image : 'images/four.png'
    },
    {
      name : 'Five',
      count : 0,
      image : 'images/five.png'
    }
  ] /* end of elements array */
}; /* end of model object */

/* OCTOPUS */
let controller = {

  init : function() {
    model.currentElement = model.elements[0];
    view.init();
    textView.init();
    adminTool.init();
  },

  getElements : function() {
    return model.elements;
  },

  getCurrentElement : function() {
    return model.currentElement;
  },

  setCurrentElement : function(element) {
    model.currentElement = element;
  },

  increment : function() {
    model.currentElement.count++;
    textView.updateText();
    adminTool.set();
  },

  setNewValues : function(newName, newCount, newImage) {
    model.currentElement.name = newName;
    model.currentElement.count = newCount;
    model.currentElement.image = newImage;
  }

};

/* VIEW */
let view = {

  init : function() {
    const image = document.body.querySelector('#image');
    image.addEventListener('click', function() {
      controller.increment();
    }, false);
    this.set();
  },

  set : function() {
    controller.getCurrentElement();
    image.src = controller.getCurrentElement().image;
    textView.updateText();
  }

};

let textView = {

  init : function() {
    const displayCount = document.body.querySelector('#displayCount');
    const elemList = document.body.querySelector('#elemList');
    this.updateText();
    this.set();
  },

  set : function() {
    let i, element, li;
    let elements = controller.getElements();
    elemList.innerHTML = '';

    for (i = 0; i < elements.length ; i++) {
      element = elements[i];
      li = document.createElement('li');
      li.textContent = element.name;
      li.addEventListener('click', (function(elCopy) {
        return function() {
          controller.setCurrentElement(elCopy);
          view.set();
          adminTool.set();
        };
      })(element));
      elemList.appendChild(li);
    }
  },

  updateText : function() {
    displayCount.innerText = `${controller.getCurrentElement().name}: ${controller.getCurrentElement().count} clicks`;
  }

};

let adminTool = {

  init : function() {
    const admButton = document.body.querySelector('#admButton');
    const admForm = document.body.querySelector('#admForm');
    const cancel = document.body.querySelector('#cancel');
    const save = document.body.querySelector('#save');
    const formName = document.body.querySelector('#formName');
    const formCount = document.body.querySelector('#formCount');
    const formImage = document.body.querySelector('#formImage');
    this.set();
  },

  set : function() {

    admButton.addEventListener('click', function() {
      admForm.style.display = "block";
    }, false);

    cancel.addEventListener('click', function(e) {
      e.preventDefault();
      admForm.style.display = "none";
      currentFormValues();
    }, false);

    currentFormValues();

    save.addEventListener('click', function(e) {
      e.preventDefault();
      controller.setNewValues(formName.value, formCount.value, formImage.value);
      textView.set();
      textView.updateText();
      view.set();
    }, false);

    function currentFormValues() {
      formName.value = controller.getCurrentElement().name;
      formCount.value = controller.getCurrentElement().count;
      formImage.value = controller.getCurrentElement().image;
    }

  }

};

controller.init();
