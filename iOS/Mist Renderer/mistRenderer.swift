//
//  mistRenderer.swift
//  Mist Renderer
//
//  Created by Alex Mitchell on 7/17/14.
//  Copyright (c) 2014 Glimmer Labs. All rights reserved.
//

import UIKit
import CoreGraphics

class mistRenderer: UIView {
    override func drawRect(rect: CGRect) {
        let myContext = UIGraphicsGetCurrentContext()
        
        CGContextSetRGBFillColor(myContext, 1, 0, 0, 1)
        CGContextFillRect(myContext, CGRectMake(0, 0, 200, 100))
        CGContextSetRGBFillColor(myContext, 0, 0, 1, (1/2))
        CGContextFillRect(myContext, CGRectMake(0, 0, 100, 200))
    }
    
    func expType(exp: String, context: CGContextRef){}
    
    func r2c(r: Double) -> Double {
        return 127.5 + r * 127.5
    }
    
    func c2r(c: Double) -> Double {
        return (c/127.5) - 1.0
    }
    /*
    func cap(val: Double) -> Double {
    return MAX(-1, MIN(1, val))
    }*/
    
    func wrap(val:Double) -> Double {
        if (val < -1){
            return wrap(val + 2)
        }
        else if (val > 1){
            return wrap(val-2)
        }
        else {
            return val
        }
    }
    
    // MOI Functions
    
    func MOIsign (range: Double) -> Double {
        if (range < 0){
            return -1
        }
        else if (range > 0){
            return 1
        }
        else {
            return range
        }
    }
    
    func MOIshift (a: Double, b: Double) -> Double {
        return self.wrap(a+b)
    }
    
    func MOIsquare(a: Double) -> Double {
        return a * a
    }
    
    
    //  Renderer
    
    func renderFun(fun: String, context:CGContextRef, rLeft: Double, rTop: Double, rWidth: Double, rHeight: Double) {
        var deltaX = 2.0/rWidth
        var deltaY = 2.0/rHeight
        var d = NSDate()
        var x = -1
        var y = -1 - deltaY
    }
}
