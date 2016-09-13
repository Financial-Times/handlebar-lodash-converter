const dataPrefix = '__DATA';
const indexSuffix = '__IDX_';

const generateVar = function(name) {
  return `_${name}${indexSuffix}`.split('.').join('__');
}

const convertTokens = function(expr) {
  const tokens = expr.match(/".+?"|'.+?'|[()]+|#?[\w\[\]\.]+|[!=<>]+/g);
  const convertedTokens = tokens.map(token => {
    switch (token) {
      case 'and':
        return '&&';
      case 'or':
        return '||';
      case 'not':
        return '!';
      default: {
        const lengthMatches = token.match(/(.*?)#([\w\[\]\.]+)/);
        if (lengthMatches) { // if they are accessing .length on that variable
          const [, pre, matchedExpr] = lengthMatches;
          return `${pre}${dataPrefix}.${matchedExpr}.length`;
        }

        const variableNameMatch = token.match(/^[a-z_]{1}[a-z0-9_\[\]\.]+$/i);
        if (variableNameMatch) { // if we think token is variable name
          const variableIndexMatch = token.match(/^_.+__IDX_.*$/);
          if (variableIndexMatch) { // if token is a loop_index all alone
            return token;
          }

          return `${dataPrefix}.${token}`;
        }
        return token;
      }
    }
  });
  return convertedTokens.join(' ');
}

const convertEachLoops = function(text) {
  const nestedNames = {};
  const blockRegex = /{{\s*?each\s+?.+?\s*?}} *\n?|{{.*?loop_vars\..+?.*?}}|{{.*?loop_index.*?}}/g;
  let match;
  let eachIndex;

  // eslint-disable-next-line
  while ((match = blockRegex.exec(text)) !== null) {
    const matched = match[0];
    const eachMatch = matched.match(/{{\s*?each\s+?(.+?)\s*?}} *\n?/);
    const loopMatch = matched.match(/{{(.*?)(loop_vars\.\w+)(.*?)}}|({{.*)loop_index(.*?}})/);
    const loopRegex = /(loop_vars)\.(\w+)|(loop_index)/g;

    if (eachMatch) {
      const [, expr] = eachMatch;
      if (!expr.startsWith('loop_vars.')) {
        eachIndex = generateVar(expr);
        nestedNames[`loop_vars.${expr}`] = expr;
        // eslint-disable-next-line
        text = `${text.substring(0, match.index)}<% for (var ${eachIndex} in ${dataPrefix}.${expr}) { %>${text.substring(match.index + eachMatch[0].length)}`;
      } else {
        const nestedProps = expr.split('.').slice(1);
        const parentIndex = generateVar(nestedProps[0]);
        const childIndex = generateVar(nestedProps[nestedProps.length - 1]);
        const exprKey = expr.split('.').slice(0, 2).join('.');
        const exprTranslation = nestedNames[exprKey];

        nestedNames[`loop_vars.${nestedProps[nestedProps.length - 1]}`] =
          `${nestedProps[0]}[${generateVar(nestedProps[0])}].${nestedProps.slice(1).join('.')}`;

        // eslint-disable-next-line
        text = `${text.substring(0, match.index)}<% for (var ${childIndex} in ${exprTranslation}[${parentIndex}].${nestedProps.slice(1).join('.')}) { %>${text.substring(match.index + eachMatch[0].length)}`;
      }
    } else if (loopMatch) {
      const replacement = loopMatch[0].replace(loopRegex, (expr, isLoopVar, nestedProps, isLoopIndex = false) => {
        if (!!isLoopVar) {
          const exprKey = expr.split('.').slice(0, 2).join('.');
          const childIndex = generateVar(nestedProps);
          const exprTranslation = nestedNames[exprKey];
          const isPrint = !/\s*/.exec(loopMatch[1]);
          return `${isPrint ? '<%-' : ''}${exprTranslation}[${childIndex}]${isPrint ? '%>' : ''}`;
        } else if (!!isLoopIndex) {
          return eachIndex;
        }
      });
      text = `${text.substring(0, match.index)}${replacement}${text.substring(match.index + loopMatch[0].length)}`;
    }
  }
  return text;
}

const convertExpressions = function(text) {
  return text
    .replace(/{{\s*?if(\s+?.+?|\(.+?)}} *\n?/g, (matches, expr) => {
      return `<% if (${convertTokens(expr)}) { %>`;
    })
    .replace(/{{\s*?else\s*?}} *\n?/g, '<% } else { %>')
    .replace(/{{\s*?elseif(\s+?.+?|\(.+?)}} *\n?/g, (matches, expr) => {
      return `<% } else if (${convertTokens(expr)}) { %>`;
    })
    .replace(/{{\s*?end\s*?}} *\n?/g, '<% } %>')
    .replace(/{{{\s*?(?!\s*if|else|each|elseif[\s\(}]+?)(.*?)}}}/g, (matches, expr) => {
      return `<%= ${convertTokens(expr)} %>`;
    })
    .replace(/{{\s*?(?!\s*if|else|each|elseif[\s\(}]+?)(.*?)}}/g, (matches, expr) => {
      return `<%- ${convertTokens(expr)} %>`;
    });
}

exports.lodashConverter = function (text) {
  return convertExpressions(convertEachLoops(text));
};

exports.dataPrefix = dataPrefix;