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

Calculus.prototype.initEvents = function () {

    var self = this;

    this.param.element.onkeypress = function (e) {

        if (e.keyCode === 13) {
            self.getValue();
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

Calculus.prototype.getValue = function () {
    this.param.inputValue = this.param.input.value;
    this.divideString();
};

Calculus.prototype.divideString = function () {
    var repDivider = /[/%^*+-]/g,
        numsArr = this.param.inputValue.split(repDivider);

    this.param.simbolsArr = this.param.inputValue.match(repDivider);
    this.param.numsArr = numsArr.map(function (item) {
        return +item;
    });

    this.defineFunction();
};

Calculus.prototype.defineFunction = function () {
    var numsArr = this.param.numsArr,
        lengtSimbolshArr = this.param.simbolsArr.length;

    console.log(this.param.simbolsArr);
    console.log(this.param.numsArr);

    switch (this.param.simbolsArr[lengtSimbolshArr-1]) {
        case "+":
            this.summ(numsArr);
            console.log(this.summ(numsArr));
            break;
        case "-":
            this.mins(numsArr);
            console.log(this.mins(numsArr));
            break;
        case "/":
            this.divs(numsArr);
            console.log(this.divs(numsArr));
            break;
        case "*":
            this.mult(numsArr);
            console.log(this.mult(numsArr));
            break;
        case "^":
            this.sqrt(numsArr);
            break;
        case "%":
            this.mods(numsArr);
            break;
    }
};

Calculus.prototype.summ = function (numsArr) {
    return numsArr[0] + numsArr[1];
};

Calculus.prototype.mins = function (numsArr) {
    return numsArr[0] - numsArr[1];
};

Calculus.prototype.mult = function (numsArr) {
    return numsArr[0] * numsArr[1];
};

Calculus.prototype.divs = function (numsArr) {
    return numsArr[0] / numsArr[1];
};

Calculus.prototype.sqrt = function (numsArr) {
    alert('sqrt');
};

Calculus.prototype.mods = function (numsArr) {
    alert('mods');
};
