# calculator
Calculator project for the Odin Project's Foundations path.
The project description can be found [HERE](https://www.theodinproject.com/courses/foundations/lessons/calculator).
This project was meant to provide further practice with basic JavaScript including working with event listeners and manipulating the DOM.

**Project Notes:**
- The calculator is implemented so that only one operation is performed at a time as described in point 6-1 of the project description.
- The calcultor will not accept inappropriate inputs including more than one decimal point in a number and an operation at an inappropriate time. For instance if the user clicked "4" then "+" then "x" then "6" the calculator would ignore the "x" click and return "10".
- I added a (+/-) button that multiplies the current number being entered by -1 allowing the user to enter negative numbers. Note that one has to start entering the number before this button will take effect. I'm not totally happy with this implementation since it feel slike it could be a bit unintuitive.
- Some notes of number limitations:
  - The calculator only works with values within Number.MAX_SAFE_INTEGER as my understanding is that JS can only safely represent integers within this value. 
  - I've limited the number of characters a user can enter to 16. When this number is reached for an input the calculator will stop accepting numbers.
  - The calculator will also display a maximum ogf 16 characters of an output. However it stores the entire computed number for use in future calculations.
  - The calculator will let the user enter any number up to 16 characters even if it's absolute value is greater than Number.MAX_SAFE_INTEGER. However when the calculator tries to run an operation it will return NaN if the absolute value of either input is too large.
  - The calculator will also return NaN if the result is outside the given range. 
  - My understanding is that a BigInt should be used to represent numbers greater than Number.MAX_SAFE_INTEGER but that it will truncate numbers so will not work in this case. It does look like there are libraries that could be used to safely work with larger numbers.
- Keyboard support is included for all buttons except the Clear and (+/-) buttons. The Enter button is used to perform an Equals operation.
- The Undo button is not implemented. I would likely implement using a stack of past operations.
