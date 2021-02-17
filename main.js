class Calculator {
	constructor(){
		this.operator = null;
		this.currentOperand = "";
		this.previousOperand = "";
		this.appendNumber = this.appendNumber.bind(this);
		this.appendOperator = this.appendOperator.bind(this);
	}
	appendNumber(number){
		if(number == '.' && this.currentOperand.includes('.')){
			return;
		}
		this.currentOperand = ""+this.currentOperand+number;
		console.log(this.currentOperand);
		this.updateText(); 
	}
	updateText(){
		const currentText = document.querySelector('.result .current');
		const previousText = document.querySelector('.result .previous');
		currentText.innerHTML = this.currentOperand;
		previousText.innerHTML = this.previousOperand + (this.operator ? this.operator : "");
		if(currentText.innerHTML.length >= 8){
			currentText.style.fontSize = '45px';
		}else if (currentText.innerHTML.length >= 10){
			currentText.style.fontSize = '40px';
		}else {
			currentText.style.fontSize = '60px';
		}
	}
	appendOperator(e){
		if(this.currentOperand == ""){
			return;
		}
		if(e.target.dataset['operator'] == '='){
			console.log(e.target.dataset['operator']);
			this.calculate();
			this.operator = null;
			this.updateText();
			return;
		}
		if(this.operator && this.currentOperand && this.previousOperand){
			this.calculate();
		}
			this.previousOperand = this.currentOperand;
			this.currentOperand = "";

		this.operator = e.target.dataset['operator'];
		console.log(this.previousOperand)
		this.updateText();
	}
	calculate(){
		switch(this.operator){
			case '+':
				this.currentOperand = Math.round((parseFloat(this.previousOperand) + parseFloat(this.currentOperand))*100)/100+"";
				this.previousOperand = "";
				break;
			case '-':
				this.currentOperand = Math.round((parseFloat(this.previousOperand) - parseFloat(this.currentOperand))*100)/100+"";
				this.previousOperand = "";
				break;
			case '*':
				this.currentOperand = Math.round((parseFloat(this.previousOperand) * parseFloat(this.currentOperand))*100)/100+"";
				this.previousOperand = "";
				break;
			case '/':
				this.currentOperand = Math.round((parseFloat(this.previousOperand) / parseFloat(this.currentOperand))*100)/100+"";
				this.previousOperand = "";
				break;
		}

	}
}
const calculator = new Calculator();


Array.from(document.querySelectorAll('[data-number]'))
	.forEach(btn => btn.addEventListener('click',e => calculator.appendNumber(btn.dataset['number'])));

Array.from(document.querySelectorAll('[data-operator]'))
	.forEach(btn => btn.addEventListener('click',e => calculator.appendOperator(e)));

Array.from(document.querySelectorAll('[data-]'))