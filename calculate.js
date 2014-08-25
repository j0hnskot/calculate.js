/**
 * @author      John Skotiniotis <j0hnskot@gmail.com>
 * @copyright    2014 - John Skotiniotis
 * @license      {@link http://choosealicense.com/licenses/mit/ | MIT License}
 */

var Calc = function () {
 
}



Calc.prototype = {



    init: function (expression) {

        this.expression = expression;
        this.currentCalc = [];
        this.answers = [];
        this.orderOfAnswers = [];
        this.numbers = [];
        this.complete = false;
        this.results = [];
        this.currentAnswer;
        this.results.push(this.expression);

    },


    calculateStep: function () {



        var selectedPart = '';
        var firstPar = 'NotSet';
        var lastPar = 'NotSet';
        var firstPoint = 'NotSet';
        var lastPoint = 'NotSet';
        var operator = 'NotSet';
        var gotNegative = false;



        firstPoint = 'NotSet';
        lastPoint = 'NotSet';
        operator = 'NotSet';

        selectedPart = this.expression;

        //check for parenthesis


        if ((firstPar = this.expression.indexOf('(')) != -1) {


            lastPar = this.expression.indexOf(')');
            selectedPart = this.expression.slice(firstPar, lastPar + 1);


            while (firstPar < selectedPart.indexOf('(', firstPar + 1)) {

                firstPar++;

            }
            selectedPart = this.expression.slice(firstPar, lastPar + 1);





        }

        //check if a multiplication or division exists in the expression (or the selected part if there are parenthesis)

        if (selectedPart.indexOf('*') != -1 || selectedPart.indexOf('/') != -1) {

            makeCalculation.apply(this, [true]);;


        } else if (selectedPart.indexOf('+') != -1 || selectedPart.indexOf('-') != -1) { //Check for add or substract


            makeCalculation.apply(this, [false]);



        } else { //remove parenthesis and move to the next part or finish the calculation

            if (firstPar == -1) {
                this.complete = true;
               
            }

        }



        if (firstPoint != 'NotSet') {
            if (gotNegative) {
                selectedPart = selectedPart.slice(firstPoint - 1, lastPoint + 1);
                gotNegative = false;
            } else {
                selectedPart = selectedPart.slice(firstPoint, lastPoint + 1);


            }

        } else {
            //it means that a negative number is only left, so pop to avoid dublicates
            this.results.pop();
            this.answers.pop();

        }

        answer = Parser.evaluate(selectedPart)


//        console.log('First Point: ' + firstPoint);
//        console.log('Operator: ' + operator);
//        console.log('Last Point: ' + lastPoint);
//        console.log('Answer: ' + answer);
//        console.log('this.expression before: ' + this.expression);


        //replace the solved part and the parenthesis (if any are left)

        this.expression = this.expression.replace(selectedPart, answer)
        if (this.expression.search('(' + answer + ')') != -1) {
            this.expression = this.expression.replace('(' + answer + ')', answer);

        }


        this.answers.push(answer);
        this.results.push(this.expression);

//        console.log('this.expression after: ' + this.expression);
//      
//
//
//        console.log("All results: " + this.results);
//        console.log("All answers: " + this.answers);
//


        function makeCalculation(gotMultOrDiv) {


            //Check all of the selected part
            for (var i = 0; i < selectedPart.length; i++) {

                if (selectedPart[i] == '(' || selectedPart[i] == ')') continue;

                //Set the first point of the current this.expression that needs solving and then start moving the last point
                //until we hit another operator or the end of the current part

                if (!isNaN(parseInt(selectedPart[i]))) {



                    if (firstPoint == 'NotSet') {
                        firstPoint = i;
                    } else {
                        lastPoint = i;

                    }



                } else {
                   
                    if (operator == 'NotSet') {



                        if (gotMultOrDiv && (selectedPart[i] == '+' || selectedPart[i] == '-')) {
                          
                            firstPoint = 'NotSet';
                            continue;

                        } else if (selectedPart[i] == '-' && (selectedPart[i - 1] == '(' || selectedPart[i - 1] == undefined)) {
                         
                            //If only one negative number is left in the expression, finish the calculation
                            if (this.expression == selectedPart) {


                                if (selectedPart.indexOf('-', i + 1) == -1 && selectedPart.indexOf('+', i + 1) == -1) {

                                    this.complete = true;
                                    break;
                                }


                            }
                            gotNegative = true;
                            continue;


                        }

                        operator = selectedPart[i];


                        this.currentAnswer = i;


                        if (firstPar > 0) this.currentAnswer += firstPar;


                    } else {
                        //We found another operator. This means that we reached another calculation so we stop the search.
                        break;

                    }
                }



            }



        };




    },



    solve: function () {

        while (!this.complete) {
            this.calculateStep();


        }

    },




}