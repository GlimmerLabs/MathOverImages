/**
 * Convert a MIST expression into a WebGL fragment shader
 */
MIST.expToGL = (function() {
  const literals = {
    x: "x",
    y: "y",
    "t.s": "t.x",
    "t.m": "t.y",
    "t.h": "t.z",
    "t.d": "t.w",
    "m.x": "m.x",
    "m.y": "m.y"
  };

  function func(name, limit) {
    if (limit) {
      return function() {
        return `${name}(${[...arguments].slice(0, limit).join(",")})`;
      }
    } else {
      return function() {
        return `${name}(${[...arguments].join(",")})`;
      }
    }
  }

  function joiner(name) {
    return function() {
      return `(${[...arguments].map(arg => "(" + arg + ")").join(name)})`;
    }
  }

  const functions = {
    cos: func("COS", 1),
    sign: func("SIGN", 1),
    sin: func("SIN", 1),
    square: func("SQUARE", 1),
    wrap: func("WRAP", 1),
    mistif: func("MISTIF", 3),

    abs: func("abs"),
    signz: func("sign"),

    mult: joiner("*"),
    sum: joiner("+"),
    
    // rgb is the only function that returns an object because it uses a different fragment shader
    rgb(r, g, b) {
      return {r: r, g: g, b: b};
    },

    neg(x) {
      return `(-(${x}))`;
    },

    avg() {
      return `(${this.sum.apply(this, arguments)}/${arguments.length}.0)`;
    },

    wsum() {
      return this.wrap(this.sum.apply(this, arguments));
    },
  }

  function to_gl(node) {
    if (node.class == "MIST.Val") {
      if (node.name in literals) {
        return literals[node.name]
      } else {
        let val = parseFloat(node.name);
        if (isNaN(val)) {
          // return -1.0 on unknown literals
          return "-1.0";
        } else {
          val = val.toString();
          // add a .0 to integers to turn them into floats
          return (val.search(/[.e]/) == -1) ? val + ".0" : val;
        }
      }
    } else if (node.class == "MIST.App") {
      if (node.operation in functions) {
        return functions[node.operation].apply(functions, node.operands.map(to_gl));
      } else {
        return "-1.0";
      }
    } else {
      return "-1.0";
    }
  }

  const fs = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH 
      precision highp float;
    #else
      precision mediump float;
    #endif

    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform vec4 u_time;

    #define PI 3.1415926535897932384626433832795
    #define CTM(x) ((x) * 2.0 - 1.0)
    #define MTC(x) (((x) + 1.0) / 2.0)
    #define SIN(x) sin((x) * PI)
    #define COS(x) cos((x) * PI)
    #define SQUARE(x) ((x) * (x))
    #define SIGN(x) ((x) >= 0.0 ? 1.0 : -1.0)
    #define MISTIF(test, pos, neg) ((test) >= 0.0 ? (pos) : (neg))

    float WRAP(float val) {
      if (val > 1.0) {
        float res = mod((val + 1.0), 2.0) - 1.0;
        // This case ensures a nonbreaking change with the recursive version
        if (res == -1.0)
          return 1.0;
        return res;
      }
      if (val < -1.0) {
        float res = -(mod((-val + 1.0), 2.0) - 1.0);
        // This case ensures a nonbreaking change with the recursive version
        if (res == 1.0)
          return -1.0;
        return res;
      }
      return val;
    }

    void main() {
      float x = CTM(gl_FragCoord.x / u_resolution.x);
      float y = -CTM(gl_FragCoord.y / u_resolution.y); // WebGL has the opposite y-axis orientation
      vec2 m = u_mouse;
      vec4 t = u_time;
      {calc_color}
    }
  `;

  const fs_bw = `
    float col = 1.0 - MTC({calc});
    gl_FragColor = vec4(col, col, col, 1);
  `

  const fs_rgb = `
    float r = MTC({r});
    float g = MTC({g});
    float b = MTC({b});
    gl_FragColor = vec4(r, g, b, 1);
  `;

  return function(exp) {
    const fragment = to_gl(exp);
    if (MIST.expType(exp) == MIST.TYPE.RGB) {
      return fs.replace(
        "{calc_color}",
        fs_rgb.replace(
          "{r}", fragment.r
        ).replace(
          "{g}", fragment.g
        ).replace(
          "{b}", fragment.b
        )
      );
    } else {
      return fs.replace("{calc_color}", fs_bw.replace("{calc}", fragment));
    }
  };
})();
