calculate.js
============

<b>A small library i created for a project that solves expressions step-by-step following the BODMAS principle.</b>

It uses the <a href='https://github.com/silentmatt/js-expression-eval/blob/master/parser.js'>js-expression-eval</a> so be sure to grab it and include it in your html page else calculate.js won't work.

<i>Not everything is implemented yet. </i>
<i>Currently, the script can divide,multiply, add and substract while keeping in mind about brackets. </i>

<i>Beware! There are many bad practises included in the script. It was created in a hurry and it needs some clean up.

<b>To use it :</b>

<i>Create a new calc object

<code>var calc=new Calc();</code>

<i>Initialize the object's fields by passing the expression that needs solving

<code>calc.init('2+5*3/1');</code>
        
<i>Do a step of calculation

<code>calc.calculateStep();<code>


<i>or completely solve  the expression

<code>calc.solve();</code>


<b>The following contain the information generated from the library: 

<i>Contains every state of the expression, as the steps go on:

<code>calc.expressionStates

<i> Contains every answer of each calculation

<code>calc.answers

<i> It holds the answer of the current solving step

<code>calc.currentAnswer

<h1> Documentation</h1>
Check <a href='https://dl.dropboxusercontent.com/u/10178928/calculate.js/index.html'>here</a> for more details
<h1>License 

calculate.js is released under the <a href='http://opensource.org/licenses/MIT'>MIT License.</a>
