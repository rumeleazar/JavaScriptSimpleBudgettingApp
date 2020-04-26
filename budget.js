// --THINGS TO DO --

//Add incomes and expenses on the add description bar and make it show on the income and expenses tab at the bottom
//Make the value bar work
//Change the + and - choices to income and expenses
//Add all the income and expenses and make it show at the top
//Compute the total available budget regarding the results from the income and expenses
//Get the percentage of each input to its total value ( Total income and total expenses)
//Make the delete button work on each item



//Income Variables
var incList = [];
var incListValue = [];
var incListTotalVal = 0;

//Expenses Variables
var expList = [];
var expListValue = [];
var expListTotalVal = 0;

//Total set variables
var totalIncome = 0;
var totalExpenses = 0;
var totalBudget = 0;

//Date Variables
var date = new Date();
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
$(".budget__title--month").html(months[date.getMonth()] + " " + date.getDate() + " " + "," + date.getFullYear());




//GETTING VALUES FROM DOM FORMS

function getInfo() {
	//Declare the variables (Description, Income or Expense, and the value)
	var description = $(".add__description").val();
	var value = $(".add__value").val();
	var type = $(".add__type").val();

	return [description, value, type];

};



//TOTAL INCOME CALCULATOR
function totalIncomeCalculator(){

	incListValue.push(parseInt(incList[incList.length - 1].value));
	const incomeAdder = (accumulator, currentValue) => (accumulator + currentValue);
	incListTotalVal = incListValue.reduce(incomeAdder);
	return incListTotalVal;
};


//TOTAL EXPENSES CALCULATOR 
function totalExpensesCalculator(){

	expListValue.push(parseInt(expList[expList.length - 1].value));
	const expensesAdder = (accumulator, currentValue) => (accumulator + currentValue);
	expListTotalVal = ~expListValue.reduce(expensesAdder) + 1;	
	return expListTotalVal;
};


//GET EXPENSES PERCENTAGES
function expensesPercentage(){

	

}


//TOTAL BUDGET CALCULATOR
function totalBudgetCalculator(incListSpecVal, expListSpecVal) {

	totalBudget = incListSpecVal + expListSpecVal;
	$(".budget__value").text(totalBudget);
};





//FUNCTION TO CREATE ALL HTML ITEMS

function budgetInfo([description, value, type]) {
  this.type = type;
  this.description = description;
  this.value = value;
  this.htmlBuilder = function(description, value, type) {


  //Creating the HTML tags
  	const div1 = document.createElement('div');
	div1.classList.add("item");
	div1.classList.add("clearfix");
	div1.id = 'expense-0';
	
	if (this.type == 'inc'){
		div1.classList.add("incItem-" + (incList.length - 1));
	}

	else {
		div1.classList.add("expItem-" + (expList.length - 1));
	}

	const div2 = document.createElement('div');
	div2.classList.add("item__description");
	let procDesc = document.createTextNode(this.description);
	div2.appendChild(procDesc);

	const div3 = document.createElement('div');
	div3.classList.add("right");
	div3.classList.add("clearfix");


	const div4 = document.createElement('div');
	div4.classList.add("item__value");

	if (this.type == 'inc'){

		let procVal = document.createTextNode("+" + this.value);
		div4.appendChild(procVal);
	}
	else {
		let procVal = document.createTextNode("-" + this.value);
		div4.appendChild(procVal);
	}
	

	const div5 = document.createElement('div');
	div5.classList.add("item__percentage");
	var procT = document.createTextNode(this.type);
	div5.appendChild(procT);


	const div6 = document.createElement('div');
	div6.classList.add("item__delete");


	//Creating button tag and button function

	const button = document.createElement('button');
	button.classList.add("item__delete--btn");
	var incomeNumber = incList.length;
	var expenseNumber = expList.length;

	if (this.type == 'inc'){
		button.addEventListener('click', function(){
			if (incList.length >= 1){
				var income = $(".incItem-" + (incomeNumber -1));
				income.remove("div");
				incList.splice(incList[incList.length -1], 1 );
				incListValue.splice(incList[incList.length -1], 1);
				const incomeAdder = (accumulator, currentValue) => (accumulator + currentValue);
				incListTotalVal = incListValue.reduce(incomeAdder,0);
				document.querySelector(".budget__income--value").textContent = incListTotalVal;
				totalBudgetCalculator(incListTotalVal, expListTotalVal);

			}
			
		})
	}
	else  {
		button.addEventListener('click', function(){
			if (expList.length >= 1){
				var expenses = $(".expItem-" + (expenseNumber -1));
				expenses.remove("div");
				expList.splice(expList[expList.length - 1], 1);
				expListValue.splice(expList[expList.length -1], 1);
				const expensesAdder = (accumulator, currentValue) => (accumulator + currentValue);
				expListTotalVal = ~expListValue.reduce(expensesAdder,0) + 1;	
				document.querySelector(".budget__expenses--value").textContent = expListTotalVal;
				totalBudgetCalculator(incListTotalVal, expListTotalVal);
				
				


			}

		}) 
	}



	//Creating i tag inside button tag
	const i = document.createElement('i');
	i.classList.add("ion-ios-close-outline");


	//Output the created HTML tags from the variables
	button.appendChild(i);
	div6.appendChild(button);
	div3.appendChild(div4);
	div3.appendChild(div5);
	div3.appendChild(div6);
	div1.appendChild(div3);
	div1.appendChild(div2);


	if (this.type == 'inc'){
		const income__list = document.querySelector(".income__list");
		return income__list.appendChild(div1);	
	}

	else {

		const expenses__list = document.querySelector(".expenses__list");
		return expenses__list.appendChild(div1);
		}
	} 
}


//OUTPUT HTML CREATED BY THE BUDGETINFO FUNCTION
function typeHtmlBuilder(fn){

	if (fn()[2] == 'inc') {
		var x = new budgetInfo(getInfo());
		incList.push(x);
		listo = [];
		for (let i = 0; i < incList.length; i++) {
			listo.push(i);	
		}
		incList[listo.length - 1].htmlBuilder();
	
		$(".budget__income--value").text(totalIncomeCalculator());
		
	}

	else {
		 var x = new budgetInfo(getInfo());
		 expList.push(x);
		 listo = [];
		for (let i = 0; i < expList.length; i++) {
			listo.push(i);	
		}
		expList[listo.length - 1].htmlBuilder();
		$(".budget__expenses--value").text(totalExpensesCalculator());
		
	}
}


//ITEMS BUILDER
$(".add__btn").on('click',  function(event){
	
typeHtmlBuilder(getInfo);
totalBudgetCalculator(incListTotalVal, expListTotalVal);

});
