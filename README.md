# VS Code Utility Belt

Strap on the belt and become a Ninja Developer with these 30 utilities.  
This extension is also available for
Brackets([bracketsix](https://github.com/a-bentofreire/bracketstoix))
and Atom([atomtoix](https://atom.io/packages/atomtoix)).  

- Add a shortcut and cycle between different case mode in a breeze.  
  
![Cycle Case](https://github.com/a-bentofreire/vsctoix/raw/master/./assets/demo/cycle-case.gif)
  
- Copy to clipboard text patterns from a document.  
  
![Extract Text](https://github.com/a-bentofreire/vsctoix/raw/master/./assets/demo/extract-text.gif)
  
- Insert text with macros at the start of every line.  
  
![Insert Text at Start](https://github.com/a-bentofreire/vsctoix/raw/master/./assets/demo/insert-text-at-start.gif)
  
- Insert text with macros at the end of every line.  
  
![Insert Text at End](https://github.com/a-bentofreire/vsctoix/raw/master/./assets/demo/insert-text-at-end.gif)
  

## Utilities

| Utility  | Example |
| ------------- | ------------- |
|Capitalize|**before**: `classNameFunc`<br>**after**: `ClassNameFunc`|
|Camel Case|**before**: `ClassNameFunc`<br>**after**: `classNameFunc`|
|Dash Case|**before**: `ClassNameFunc`<br>**after**: `class-name-func`|
|Cycle Case|**before**: `_ClassNameFunc`<br>**after**: `_classNameFunc -> _CLASS_NAME_FUNC -> _class_name_func -> _class-name-func -> _class name func ->_ClassNameFunc`|
|Add Space before Uppercase<br>**Useful to transform functions names into documentation**|**before**: `doActionBefore`<br>**after**: `do Action Before`|
|Url Encode|**before**: `https://github.com`<br>**after**: `https%3A%2F%2Fgithub.com`|
|Url Decode|**before**: `https%3A%2F%2Fgithub.com`<br>**after**: `https://github.com`|
|Reverse Assignment<br>**Reverses the terms of assignments or equal/different comparisons**|**before**: `x == y[x] + 5`<br>**after**: `y[x] + 5 == x`|
|Unix To Win Slash<br>**Converts slashes to backslashes**|**before**: `chocolate/candy`<br>**after**: `chocolate\candy`|
|Win To Unix Slash<br>**Converts backslashes to slashes**|**before**: `chocolate\candy`<br>**after**: `chocolate/candy`|
|Single To Double Slash|**before**: `find\nagain`<br>**after**: `find\\\nagain`|
|Double To Single Slash|**before**: `find\\\nagain`<br>**after**: `find\nagain`|
|Dash To Underscore|**before**: `find-deep-first`<br>**after**: `find_deep_first`|
|Underscore To Dash|**before**: `find_deep_first`<br>**after**: `find-deep-first`|
|Regnize<br>**Adds slash to regular expression metachars**|**before**: `(\w+)[A-Z]a*b+text`<br>**after**: `\(\\w\+\)\[A-Z\]a\*b\+text`|
|Header To Bookmark<br>**Converts markdown header text to Html Bookmark**|**before**: `Is this the header 你好?`<br>**after**: `is-this-the-header-你好`|
|Mixer<br>**Mixes lines of different sections.**|**before**:<br>`// section`<br>`abc`<br>`cde`<br>`// end-section`<br>` // section`<br>`123`<br>`345`<br>` // section`<br>**after**:<br>`abc`<br>`123`<br>`cde`<br>`345`|
|Remove Duplicated Lines<br>**Removes consecutive duplicated lines**|**before**:<br>`first`<br>`second`<br>`second`<br><br>**after**:<br><br>`first`<br>`second`|
|Remove Empty Lines|**before**:<br>`first`<br><br>`second`<br><br>**after**:<br><br>`first`<br>`second`|
|Join Lines<br>**Joins lines adding the computed expression at the end of every line**|**before**:<br>`red`<br>`green`<br><br>**after**:<br>`expr:(x\c{X0A}),`<br>`red(x0A),green(x0B)`|
|Split Lines<br>**Split lines by an expression. Dynamic values aren't supported**|**before**:<br>`red,green`<br><br>**after**:<br>`expr: = \c{1}`<br>`red = 1`<br>`green = 2`|
|Sort Numerically Ascending<br>**For each line uses the first number as sort key**|**before**:<br>`10. red`<br>`2. green`<br><br>**after**:<br><br>`2. green`<br>`10. red`|
|Indent One Space<br>**Adds one space to the beginning of each line**||
|Outdent One Space<br>**Removes one space to the beginning of each line**||
|Insert ISO Date|`2018-02-08`|
|Insert ISO TimeDate|`2018-02-08 10:12:15`|
|Insert UUID|`7fff60f8-91e8-40ba-9053-56b0f3a487f0`|
|Insert Text At End|**before**:<br>`red`<br>`green`<br><br>**after**:<br>`expr: = \c{1}`<br>`red = 1`<br>`green = 2`|
|Insert Text At Start|**before**:<br>`red`<br>`green`<br><br>**after**:<br>`expr: const \e{upper} =`<br>`const RED = red`<br>`const GREEN = green`|
|Extract Text<br>**Copies to the clipboard the captured group of a regular expression. Each capture is separated by tabs**|`(\w+) = (\w+)`|

## Selection Policies

Every utility supports multiple cursors and multiple line selections.  
However, It differs in the way each utility category handles the selections.  
For every cursor, each line is process individually and the counter is increased per line.  

- Line Utilities:  
  - If no text is selected then all the document text is used.  
  - If part of the line is selected then all the line is used  
- Transform Text Utilities:  
  - If no text is selected then all the document text is used.  
- Insert Text Utilities:
  - If no text is selected then the cursor is the insertion point.  
  - If multiple lines are selected then is inserted at start/end of every line.  

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
  - length - Selected text length  
  - capitalize  
  - isodate  
  - isotimedate  
  - uuid  

## Contribute

Suggestions for more utilities and bug reports are welcome but don't forget the golden rule: Be Polite!  

## License

[MIT License+uuid License](https://github.com/a-bentofreire/uuid-licenses/blob/master/MIT-uuid-license.md)

## Copyrights  
  
© 2019 [Alexandre Bento Freire](https://www.a-bentofreire.com)  
