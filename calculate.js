/**
 * @author      John Skoteiniotis <j0hnskot@gmail.com>
 * @copyright    2021 - John Skoteiniotis
 * @license      {@link http://choosealicense.com/licenses/mit/ | MIT License}
 */


/**
 *
 *
 * @class  Solves mathematical expressions based on the BODMAS principle
 * @constructor
 *
 */

var Calc = function () {

    /**
     * @readonly
     * @property {Boolean} consoleOutput  - Is console output needed? Is set in the init() Method.
     * @default
     */
    this.consoleOutput = false;

    /**
     * @readonly
     * @property {Array} answers - Stores every answer.
     *
     */
    this.answers = [];

    /**
     * @readonly
     * @property {Array} expressionStates - Stores expression's state after each calculation step.
     *
     */
    this.expressionStates = [];

    /**
     * @readonly
     * @property {Boolean} complete - Is the expression completely solved?
     * @default
     */
    this.complete = false;

    /**
     * @readonly
     * @property {Integer} currentOperatorPosition - Stores the position of the selected operator in the expression.
     * @default
     */
    this.currentOperatorPosition = null;

    /**
     * @readonly
     * @property {String} selectedPart - If brackets exist,it contains everything in the first bracket to be solved.
     *                                   Else, it contains the complete expression.
     * @default
     */
    this.selectedPart = '';

    /**
     * @readonly
     * @property {String} currentAnswer - It holds the answer of the current solving step.
     *
     * @default
     */
    this.currentAnswer = '';

    /**
     * @readonly
     * @property {Integer} firstBracket - It holds the position of the first bracket, if any.
     *
     * @default
     */
    this.firstBracket = null;

    /**
     * @readonly
     * @property {Integer} lastBracket - It holds the position of the last bracket.
     *
     * @default
     */
    this.lastBracket = null;


    /**
     * @readonly
     * @property {Integer} firstPoint - It holds the first position of the selected part. Used to populate the "selectedPart" property.
     *
     * @default
     */
    this.firstPoint = null;


    /**
     * @readonly
     * @property {Integer} lastPoint - It holds the last position of the selected part. Used to populate the "selectedPart" property.
     *
     * @default
     */
    this.lastPoint = null;



    /**
     * @readonly
     * @property {String} operator - It holds the operator of the current calculation.
     *
     * @default
     */
    this.operator = null;


    /**
     * @readonly
     * @property {Boolean} gotNegative - Is set to true if there is a negative number in the expression..
     *
     * @default
     */
    this.gotNegative = false;

};

Calc.prototype = {


    /**
     *Initialise the object.
     * @method
     * @param {String} expression - The expression that needs solving.
     * @param {Boolean} [consoleOutput=false] - Set to true to output calculation data in the browser's console
     */

    init: function (expression, consoleOutput) {

        this.consoleOutput = consoleOutput || false;
        this.expression = expression.replace(/ /g,'');
        this.answers = [];
        this.expressionStates = [];
        this.complete = false;
        this.currentOperatorPosition = null;
        this.expressionStates.push(this.expression); //Insert the starting state of the expression


    },


    /**
     *Solves a step of the current expression
     * @method
     *
     *
     */

    calculateStep: function () {

        this.firstBracket = null;
        this.lastBracket = null;
        this.firstPoint = null;
        this.lastPoint = null;
        this.operator = null;
        this.gotNegative = false;
        this.selectedPart = this.expression;

        let firstClosingBracket;
        //check for brackets
        if ((firstClosingBracket = this.expression.indexOf(')')) != -1) {
            // TODO: doesn't make sense, rewrite bracket property names (and everything else I guess)
            this.lastBracket = firstClosingBracket;
            this.firstBracket = this.expression.lastIndexOf("(", this.lastBracket);
            this.selectedPart = this.expression.slice(this.firstBracket, this.lastBracket + 1);
        }

        //check if a multiplication or division exists in the expression (or the selected part if there are brackets)

        if (this.selectedPart.indexOf('*') != -1 || this.selectedPart.indexOf('/') != -1) {

            this.findPart(true);

        } else if (this.selectedPart.indexOf('+') != -1 || this.selectedPart.indexOf('-') != -1) { //Check for add or substract

            this.findPart(false);

        } else { //remove brackets and move to the next part or finish the calculation
            if (this.firstBracket == null) {
                this.complete = true;
                return;
            }

        }

        if (this.firstPoint != null) {
            if (this.gotNegative) {
                this.selectedPart = this.selectedPart.slice(this.firstPoint - 1, this.lastPoint + 1);
                this.gotNegative = false;
            } else {
                this.selectedPart = this.selectedPart.slice(this.firstPoint, this.lastPoint + 1);
            }

        } else {
            //it means that a negative number is only left, so pop to avoid dublicates
            this.expressionStates.pop();
            this.answers.pop();

        }

        this.currentAnswer = eval(this.selectedPart);

        //replace the solved part and the brackets (if any are left)

        this.expression = this.expression.replace(this.selectedPart, this.currentAnswer);
        if (this.expression.search('(' + this.currentAnswer + ')') != -1) {
            this.expression = this.expression.replace('(' + this.currentAnswer + ')', this.currentAnswer);

        }


        this.answers.push(this.currentAnswer);
        this.expressionStates.push(this.expression);



        this.output();

        return this.currentAnswer;
    },


    /**
     *
     *Finds which part of the expression needs solving. This is only for internal use. Gets called from calculateStep method.
     *  @method
     *  @param {Boolean} gotMultOrDiv - Sets if the expression got a Multiplication or Division.
     *  If true, it ignores plus and minus operators
     *
     *
     *
     */

    findPart: function (gotMultOrDiv) {


        //Check all of the selected part
        for (var i = 0; i < this.selectedPart.length; i++) {

            if (this.selectedPart[i] == '(' || this.selectedPart[i] == ')') continue;

            //Set the first point of the current this.expression that needs solving and then start moving the last point
            //until we hit another operator or the end of the current part

            if (!isNaN(parseInt(this.selectedPart[i])) || this.selectedPart[i] == '.') {



                if (this.firstPoint == null) {
                    this.firstPoint = i;
                } else {
                    this.lastPoint = i;

                }

            } else {

                if (this.operator == null) {



                    if (gotMultOrDiv && (this.selectedPart[i] == '+' || this.selectedPart[i] == '-')) {

                        this.firstPoint = null;
                        continue;

                    } else if (this.selectedPart[i] == '-' && (this.selectedPart[i - 1] == '(' || this.selectedPart[i - 1] === undefined)) {

                        //If only one negative number is left in the expression, finish the calculation
                        if (this.expression == this.selectedPart) {


                            if (this.selectedPart.indexOf('-', i + 1) == -1 && this.selectedPart.indexOf('+', i + 1) == -1) {

                                this.complete = true;
                                break;
                            }


                        }
                        this.gotNegative = true;
                        continue;


                    }

                    this.operator = this.selectedPart[i];



                    this.currentOperatorPosition = i;


                    if (this.firstBracket > 0) this.currentOperatorPosition += this.firstBracket;


                } else {
                    //We found another operator. This means that we reached another calculation so we stop the search.
                    break;

                }
            }



        }



    },


    /**
     *Runs calculateStep method until the expression is completely solved.
     *
     *  @method
     *
     */

    solve: function () {

        while (!this.complete) {
            this.calculateStep();
        }

        return this.currentAnswer;

    },

    /**
     *Used internally if consoleOutput property is set to true.
     *
     *  @method
     *
     */

    output: function () {
        if (!this.consoleOutput) return;

        console.log('Answer: ' + this.currentAnswer);
        console.log('Expression after: ' + this.expression);
        console.log("All results: " + this.expressionStates);
        console.log("All answers: " + this.answers);
        console.log('********************');
    },
};

module.exports = Calc;