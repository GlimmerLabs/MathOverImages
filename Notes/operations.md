Operations for Math Over Images
===============================

This document serves as a holding place for our notes on the various
operations for doing math over images.  The names for the operations
are primarily conceptual.

All values are in the range -1 to 1.  All functions take values in
that range and produce values in that range.

Basic Values
------------

`x` - The x coordinate

`y` - The y coordinate

`-1.0` .. `1.0` - Color constants

Basic Unary Operators
---------------------

`-` - Negate

`abs` - Absolute value

`sin` - sin of pi*val

`cos` - cos of pi*val

`sign` - negative to -1, positive to 1

Basic Binary Operators
----------------------

`expt` 

N-Ary Operators
---------------

`ave` - Average two or more values

`*` - Multiply numbers

`+` - Add numbers, capping at the extreme values

`wrap` - Add two numbers, wrapping around at the edges (-1 and 1)

Mouse Values
------------

`mouseX`

`mouseY`

`clickX`

`clickY`

* Note: We probably need a way to check if the mouse is up or down.
  Events need more thought.

Time Values
-----------

`year` - the position in the year (-1 for just after midnight, January 1 to
1 for just before midnight, December 31)

`month` - the position in the month

`week` - the position in the week (-1 for midnight Sat/Sun to 1 for midnight Sat/Sun)

`day` - the position in the day (-1 for just after midnight to 1 for just before midnight)

`hour` - the position in the hour

`minute` - the position in the minute

Conditionals
------------

Should we include a conditional operation, such as `if(test, pos, neg)`
that gives the value of `pos` if `test` is >= 0 and the value of `neg`
otherwise?  This can be simulated by something like 
`(sign(test)-1)*neg + ((sign(test)+1)*pos)`, which could be a fun
challenge for people to make.  (Probably including it makes sense, but
also making it a challenge.)

