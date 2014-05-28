A Few Cool Functions
====================

`MOIshift(x*y*y*y - y*x*x*x, m.x)`

`MOI.shift(x*y*y*y - y*x*x*x, MOI.sin(t.m))`

`MOI.shift(MOI.product(2*MOI.square(x)+MOI.square(y), MOI.square(x-0.5)+3*MOI.square(y+0.5)), -t.s)`

* Also works well with a shift of -MOI.sin(4*t.m)
