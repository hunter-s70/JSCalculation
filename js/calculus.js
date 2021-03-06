/**
 * Created by hunter_s70 on 26.08.2016.
 * Calculus js -v 1.0.1
 */

var Calculus = function (calculusId) {
    if (!calculusId) return;

    this.param = {
        element             : document.getElementById(calculusId),
        result              : '',
        repSimbolsBan       : /[\\\?\|\s\}\]\[\{=_;:"',!)(<>@№#$&~`ёЁa-zA-Zа-яА-Я]|[-+%^*./](?=[-+%^*./])/,
        dbPointProtect      : /([-+%^*/]{1})?\d+(\.\d+)?[-+%^*/]{1}\d+(\.\d+)?[-+%^*/]{1}|([-+%^*/]{1})?\d+\.\d+\.|([-+%^*/]{1})?(\d+\.)?\d+[-+%^*/]{1}\d+\.\d+\.|[-+%^*/]{1}\d+[-+%^*/]{1}|\.\d+\./g,
        btns                : ['0','1','2','3','4','5','6','7','8','9','^','%','+','-','*','/','.','=']
    };

    this.renderTerminal();
    this.initEvents();
};


Calculus.prototype.renderTerminal = function () {
    this.param.element.innerHTML =
    '<div class="b-calc">'+
        '<input id="b-calc__input" class="b-calc__input" type="text" maxlength="24" autofocus>'+
        '<div class="b-calc__btn-wrap j-btn-wrap">' +
            this.renderCaclBtns()+
        '</div>'+
    '</div>';

    this.param.input = document.getElementById('b-calc__input');
    this.param.btnWrapp = document.querySelector('.j-btn-wrap');
};


Calculus.prototype.renderCaclBtns = function () {
    this.param.btns = this.param.btns.map(function(item, i) {
        return '<span class="b-calc__btn m-calc__btn_'+i+'">'+item+'</span>'
    });
    return this.param.btns.join('');
};


Calculus.prototype.initEvents = function () {

    var self = this;

    //output
    window.onkeypress = function (e) {
        self.param.input.focus();
        if (e.keyCode === 13) {
            self.getValue();
            self.setResult();
        }
    };

    //Turn range in the end
    this.param.input.onclick = function () {
        var valueLength = self.param.input.value.length;

        self.param.input.setSelectionRange(valueLength, valueLength);
    };

    //input width buttons
    this.param.btnWrapp.onclick = function (e) {
        self.clearField();
        if (e.target.className.search(/j-btn-wrap/) === -1) {
            var value = self.param.input.value;
            self.param.input.value = value + e.target.innerHTML;
            self.validate(self.param.input.value);
        } else {
            return;
        }

        if (e.target.innerHTML === '=') {
            self.getValue();
            self.setResult();
        }
    };

    //input
    this.param.element.oninput = function () {
        self.validate(self.param.input.value);
    };

    //clear type field
    window.onkeydown = function (e) {
        if (e.keyCode < 40  && e.keyCode > 36) return false;
        self.clearField();
    }
};


Calculus.prototype.validate = function (inputValue) {
    if (this.param.repSimbolsBan.test(this.param.input.value)) {
        inputValue = inputValue.replace(this.param.repSimbolsBan, '');
        this.param.input.value = inputValue;
    }

    if (this.param.dbPointProtect.test(this.param.input.value)) {
        inputValue = inputValue.replace(this.param.dbPointProtect, function (e) {
            return inputValue.substring(0, inputValue.length - 1);
        });
        this.param.input.value = inputValue;
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


Calculus.prototype.clearField = function () {
    if (this.param.result !== '') {
        this.param.result = '';
        this.param.input.value = '';
    }
};
