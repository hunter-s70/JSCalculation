/**
 * Created by hunter_s70 on 26.08.2016.
 * Calculus js -v 1.0.1
 */

var Calculus = function (calculusId) {
    if (!calculusId) return;

    this.param = {
        element     : document.getElementById(calculusId),
        result      : ''
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

    //output
    this.param.element.onkeypress = function (e) {
        if (e.keyCode === 13) {
            self.getValue();
            self.setResult();
            console.log(self.param);
        }
    };

    //input
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

    this.param.element.onkeydown = function (e) {
        if (self.param.result !== '') {
            self.param.result = '';
            self.param.input.value = '';
        }
    }
};

Calculus.prototype.getValue = function () {
    var repDivider = /[/%^*+-]/g,
        numsArr = this.param.input.value.split(repDivider);

    this.param.simbolsArr = this.param.input.value.match(repDivider);
    this.param.numsArr = numsArr.map( function (item){return +item} );
};

Calculus.prototype.setResult = function () {
    this.param.result = this.calculateFunction();
    this.param.input.value = this.param.result;
};

Calculus.prototype.calculateFunction = function () {
    var numsArr = this.param.numsArr,
        lengtSimbolshArr = this.param.simbolsArr.length;

    console.log(this.param.simbolsArr);
    console.log(this.param.numsArr);

    switch (this.param.simbolsArr[lengtSimbolshArr-1]) {
        case "+":
            return this.summ(numsArr);
            break;
        case "-":
            return this.mins(numsArr);
            break;
        case "/":
            return this.divs(numsArr);
            break;
        case "*":
            return this.mult(numsArr);
            break;
        case "^":
            return this.sqrt(numsArr);
            break;
        case "%":
            return this.mods(numsArr);
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
    return Math.pow(numsArr[0], numsArr[1]);
};

Calculus.prototype.mods = function (numsArr) {
    return numsArr[0] % numsArr[1];
};
