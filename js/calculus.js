/**
 * Created by hunter_s70 on 26.08.2016.
 * Calculus js -v 1.0.1
 */

var Calculus = function (calculusId) {
    if (!calculusId) return;

    this.param = {
        element     : document.getElementById(calculusId)
    };

    this.renderTerminal();
    this.initEvents();
};

Calculus.prototype.renderTerminal = function () {
    this.param.element.innerHTML = '<input id="b-calc__input" type="text" maxlength="24" autofocus>';
    this.param.input = document.getElementById('b-calc__input');
};

Calculus.prototype.setValue = function () {
    this.param.inputValue = this.param.input.value;
    this.divideString();
};

Calculus.prototype.divideString = function () {
    var numsArr = this.param.inputValue.split(/[%^+-/*]/);
    var simbolsArr = this.param.inputValue.match(/[%^+-/*]/g);

    console.log(this.param.inputValue);
    console.log(typeof this.param.inputValue);
    console.log(numsArr);
    console.log(simbolsArr);
};

Calculus.prototype.initEvents = function () {

    var self = this;

    this.param.element.onkeypress = function (e) {

        if (e.keyCode === 13) {
            self.setValue();
        }
    };

    this.param.element.oninput = function (e) {
        var value = self.param.input.value;
        var repSimbolsBan = /[\\\?\|\s\}\]\[\{=_;:"',!)(<>@№#$&~`ёЁa-zA-Zа-яА-Я]|[-+%^*./](?=[-+%^*./])/;
        var dbPointProtect = /([-+%^*/]{1})?\d+(\.\d+)?[-+%^*/]{1}\d+(\.\d+)?[-+%^*/]{1}|([-+%^*/]{1})?\d+\.\d+\.|([-+%^*/]{1})?\d+(\.)?\d+[-+%^*/]{1}\d+\.\d+\./g;

        if (repSimbolsBan.test(self.param.input.value)) {
            value = value.replace(repSimbolsBan, '');
            self.param.input.value = value;
        }

        if (dbPointProtect.test(self.param.input.value)) {
            value = value.replace(dbPointProtect, function (e) {
                return value.substring(0, value.length - 1);
            });
            self.param.input.value = value;
        }
    };
};

Calculus.prototype.summ = function () {

};
