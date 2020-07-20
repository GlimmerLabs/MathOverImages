/*
 * Create variables for common subsequences
 */
MIST.simplifyCode = function(code) {
  const MAX = 100;

  const root_node = MIST.parse(code);
  const nodes = {};

  /* Takes a number and returns a unique variable name */
  function get_variable(i) {
    const variable_names = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKMLNOPQRSTUVWXYZ";
    if (i < variable_names.length) {
      // Start all variable names with an underscore to avoid conflicts with builtins
      return "_" + variable_names[i];
    } else {
      return get_variable(Math.floor(i / variable_names.length) - 1)
        + variable_names[i % variable_names.length];
    }
  }

  function count_occurences(node, nodes, depth=1) {
    // Don't try to count_occurences values
    if (node.class === "MIST.Val") {
      return;
    }
    if (!(node.code in nodes)) {
      nodes[node.code] = {depth: depth, times: 1};
    } else {
      nodes[node.code].times++;
    }
    if (node.operands) {
      node.operands.forEach(operand => count_occurences(operand, nodes, depth + 1));
    }
  }

  count_occurences(root_node, nodes);
  const keys = Object.keys(nodes);
  // TODO: consider weighting by function type/depth also
  const sorted = keys.filter(e => nodes[e].times > 1).sort((a, b) => (
    nodes[b].times - nodes[a].times
  )).slice(0, MAX);

  const code_to_variable = {};
  const variable_to_code = {}
  let variable_index = 0;
  sorted.forEach(key => {
    const varname = get_variable(variable_index++);
    code_to_variable[key] = varname;
    variable_to_code[varname] = key;
  });

  // Substitute common subsequences in the code with the corresponding variable
  let code_short = root_node.code;
  const code_order = Object.keys(code_to_variable).sort((a, b) => nodes[a].depth - nodes[b].depth);
  code_order.forEach(val => {
    while (code_short.indexOf(val) !== -1) {
      code_short = code_short.replace(val, code_to_variable[val]);
    }
  });

  // Substitute common subsequences in the variables with the corresponding variable
  const variable_order = Object.keys(variable_to_code).sort((a, b) => (
    nodes[variable_to_code[a]].depth - nodes[variable_to_code[b]].depth
  ));
  variable_order.forEach(varname => {
    variable_order.forEach(varname2 => {
      const code = variable_to_code[varname2]
      if (varname2 !== varname) {
        while (variable_to_code[varname].indexOf(code) !== -1) {
          variable_to_code[varname] = variable_to_code[varname].replace(code, varname2);
        }
      }
    });
  })

  return {
    variables: variable_order.reverse().map(varname => ({
      name: varname,
      code: variable_to_code[varname]
    })),
    code: code_short
  };
}
