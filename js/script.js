// Calculus -v 1.0.0

var Calc = {};

Calc.id = 'calc';
Calc.element = document.getElementById(Calc.id);

Calc.renderTerminal = function() {
    Calc.element.innerHTML = '<input type="text">';
};


Calc.renderTerminal();

//in code
//$('.j-phone-filter').mask('+7 (999) 999-9999');
//<input class="j-phone-filter" type="text" name="phone" placeholder="Введите телефон">
//
//in site
//