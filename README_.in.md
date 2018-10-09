# VS Code Utility Belt

Strap on the belt and become a Ninja Developer with these __UTILITYCOUNT__ utilities.  
This extension is also available for 
Brackets([bracketsix](https://github.com/a-bentofreire/bracketstoix)) 
and Atom([atomtoix](https://atom.io/packages/atomtoix)).  


![Demo](https://github.com/a-bentofreire/vsctoix/raw/master/./assets/demo/demo.gif)
  
![Mixer](https://github.com/a-bentofreire/vsctoix/raw/master/./assets/demo/mixer.gif)

## Utilities
| Utility  | Example |
| ------------- | ------------- |
__UTILITY_LIST_TABLE__


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
    - length - Selected text length  
    - capitalize  
    - isodate  
    - isotimedate  
    - uuid  

## Contribute

Suggestions for more utilities and bug reports are welcome but don't forget the golden rule: Be Polite!  

## License

[MIT License+uuid License](https://github.com/a-bentofreire/uuid-licenses/blob/master/MIT-uuid-license.md)
