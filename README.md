calculate.js
============

<b>A small library i created for a project that solves expressions step-by-step following the BODMAS principle.</b>

It uses the <a href='https://github.com/silentmatt/js-expression-eval/blob/master/parser.js'>js-expression-eval</a> so be sure to grab it and include it in your html page else calculate.js won't work.

<i>Not everything is implemented yet. </i>
<i>Currently, the script can divide,multiply, add and substract while keeping in mind about brackets. </i>


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

<code>calc.results

<i> Contains every answer of each calculation

<code>calc.answers

<i> Contains the current's step position of operator that the library will solve

<code>calc.currentAnswer


<h1>License 

calculate.js is released under the <a href='http://opensource.org/licenses/MIT'>MIT License.</a>
