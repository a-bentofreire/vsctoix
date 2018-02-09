# VS Code Utility Belt

Strap on the belt and become a Ninja Developer with these 19 utilities.  

https://github.com/a-bentofreire/vsctoix/raw/master/./assets/demo/demo.gif

## Utilities

* Transform Text Utilities
   * Capitalize <code>e.g. classNameFunc  ->  ClassNameFunc</code>
   * Camel Case <code>e.g. ClassNameFunc  ->  classNameFunc</code>
   * Add Space before Uppercase - **Useful to transform functions names into documentation**  
 <code>e.g. doActionBefore  ->  do Action Before</code>
   * Reverse Assignment - **Reverses the terms of assignments or equal/different comparisons**  
 <code>e.g. x == y[x] + 5  ->  y[x] + 5 == x</code>
   * Unix To Win Slash - **Converts slashes to backslashes**  
 <code>e.g. chocolate/candy  ->  chocolate\candy</code>
   * Win To Unix Slash - **Converts backslashes to slashes**  
 <code>e.g. chocolate\candy  ->  chocolate/candy</code>
   * Single To Double Slash <code>e.g. find\nagain  ->  find\\\nagain</code>
   * Double To Single Slash <code>e.g. find\\\nagain -> find\nagain</code>
   * Url Encode <code>e.g. https://github.com  ->  https%3A%2F%2Fgithub.com</code>
   * Url Decode <code>e.g. https%3A%2F%2Fgithub.com  ->  https://github.com</code>

* Line Utilities
   * Remove Duplicated Lines - **Removes consecutive duplicated lines**  

       <code>e.g.  
    first  
    second  
    second  
    ->  
    first  
    second  
</code>
   * Remove Empty Lines
       <code>e.g.  
    first  
      
    second  
    ->  
    first  
    second  
</code>
   * Join Lines - **Joins lines adding the computed expression at the end of every line**  

       <code>e.g.  
    red  
    green  
    -> expr:(x\c{X0A}),  
    red(x0A),green(x0B)  
</code>
   * Split Lines - **Split lines by an expression. Dynamic values aren't supported**  

       <code>e.g.  
    red,green  
    -> expr: = \c{1}  
    red = 1  
    green = 2  
</code>
   * Sort Numerically Ascending - **For each line uses the first number as sort key**  

       <code>e.g.  
    10. red  
    2. green  
    ->  
    2. green  
    10. red  
</code>

* Insert Text Utilities
   * Insert ISODate <code>e.g. 2018-02-08</code>
   * Insert UUID <code>e.g. 7fff60f8-91e8-40ba-9053-56b0f3a487f0</code>
   * Insert Text At End
       <code>e.g.  
    red  
    green  
    -> expr: = \c{1}  
    red = 1  
    green = 2  
</code>
   * Insert Text At Start
       <code>e.g.  
    red  
    green  
    ->expr: const \e{upper} =  
    const RED = red  
    const GREEN = green  
</code>


## Selection Policies

Every utility supports multiple cursors and multiple line selections.  
However, It differs in the way each utility category handles the selections.  
For every cursor, each line is process individually and the counter is increased per line.  
- Line Utilities:  
    * If no text is selected then all the document text is used.  
    * If part of the line is selected then all the line is used  
- Transform Text Utilities:  
    * If no text is selected then all the document text is used.  
- Insert Text Utilities:
    * If no text is selected then the cursor is the insertion point.  
    * If multiple lines are selected then is inserted at start/end of every line.  

## Expressions

Some of the utilities support expressions  
An expression is a text supporting the following metachars:  
- \n - newline
- \t - tab
- \c{start-value} - counter with optional start value  
    - \c  0,1,2,...  
    - \c{10} 10,11,12,...  
    - \c{x00a} x00a,x00b,x00c,...  
    - \c{XF} xF,x10,x11,...  

- \e{func} - transforms the selected text (line by line)  
    function list:  
    - upper - UpperCase  
    - lower - LowerCase  
    - capitalize  
    - isodate  
    - uuid  

## Contribute

Suggestions for more utilities and bug reports are welcome 
but don't forget the golden rule: Be Polite!  
