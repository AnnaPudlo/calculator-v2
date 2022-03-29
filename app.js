function calculator() {

    function askUser(message) {
        return prompt(message);
    }

    function getOperator() {
        let operator;
        do {
           operator = askUser("Enter operator: +, -, * or /");
        } while (!checkOperator(operator))
        return operator;
    }

    function checkOperator(operator) {
        const result = operator === "+" || operator === "-" || operator === "*" || operator === "/";
        if (!result) {
            showPopup('Please, enter valid data! It must be +, -, * or /');
        }
        return result;
    }

    function getDigitsCount(minCount, maxCount) {
        let digitsCount;
        do {
            digitsCount = askUser(`How many digits do you want to use? Enter number from ${minCount} to ${maxCount}, please.`);
        } while (!checkDigitsCount(+digitsCount, minCount, maxCount))
        return digitsCount;
    }

    function checkDigitsCount(value, minCount, maxCount) {
        const result = isNumber(value) && value >= minCount && value <= maxCount;
        if (!result) {
            showPopup(`Please, enter valid data. It must be a number from ${minCount} to ${maxCount}.`);
        }
        return result;
    }

    function isNumber(value) {
        const result = typeof value === 'number' && isFinite(value);
        if (!result) {
            showPopup('It must be a number!');
        }
        return result;
    }

    function getDigits(digitsCount) {
        const digits = [];
        for (let i=0; i< digitsCount; i++) {
            do {
                digits[i] = +askUser(`Enter digit ${i+1}.`);
            } while (!isNumber(digits[i]));
        }
        return digits;
    }
    const operator = getOperator();
    const digitsCount = getDigitsCount(2,4);
    const digits = getDigits(digitsCount);    

    let result;

    function checkDivisorForZero(digits, operator) {
        return digits.includes(0) && digits[0] && operator === '/'; 
    }

    function sum(digits) {
        let result = 0;
        for (let i = 0; i < digits.length; i++) {
            result += digits[i];
        }
        return result;
    }

    function deduct(digits) {
        let result = digits[0];
        for (let i = 1; i < digits.length; i++) {
            result -= digits[i];
        }
        return result;
    }

    function multiply(digits) {
        let result = digits[0];
        for (let i = 1; i < digits.length; i++) {
            result *= digits[i];
        }
        return result;
    }

    function divide(digits) {
        if (checkDivisorForZero(digits, operator)) {
            showPopup("Nice try at division by zero. Please, dont't do it again.")
            return 'error';
        }
        let result = digits[0];
        for (let i = 1; i < digits.length; i++) {
            result /= digits[i];
        }
        return result;
    }

    function calculate(digits, operator) {
        switch (operator) {
            case "+":
                result = sum(digits);
                break;
            case "-":
                result = deduct(digits);
                break;
            case "*":
                result = multiply(digits);
                break;
            case "/":
                result = divide(digits);
                break;
        }
        showResult(digits, operator, result);
    }

    calculate(digits, operator);

    function showResult(digits, operator, result) {
        let message = `${digits[0]} `;
        for (let i=1; i<digits.length; i++) {
            message += `${operator} ${digits [i]} `;
        }
        message += `= ${result}`;
        showPopup(message);
    }

    function showPopup(message) {
        alert(message);
    }
}

calculator();