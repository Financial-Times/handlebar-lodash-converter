module.exports = {
  '{{if variable}}': '<% if (__DATA.variable) { %>',
  '{{if variable and #othervariable > 1}}': '<% if (__DATA.variable & __DATA.othervariable.length > 1) { %>',
  '{{if othervariable and #othervariable > 1}}': '<% if (__DATA.othervariable && __DATA.othervariable.length > 1) { %>',
  '{{if (variable)}}': '<% if (( __DATA.variable )) { %>',
  '{{ if variable }}': '<% if (__DATA.variable) { %>',
  '{{elseif variable}}': '<% } else if (__DATA.variable) { %>',
  '{{elseif (variable)}}': '<% } else if (( __DATA.variable )) { %>',
  '{{ elseif variable }}': '<% } else if (__DATA.variable) { %>',
  '{{else}}': '<% } else { %>',
  '{{ else }}': '<% } else { %>',
  '{{each variable}}': '<% for (var _variable__IDX_ in __DATA.variable) { %>',
  '{{each variable}} {{loop_vars.variable.name}} {{end}}':
    '<% for (var _variable__IDX_ in __DATA.variable) { %>' +
    '<%- __DATA.variable[_variable__IDX_].name %> <% } %>',
  '{{each variable}} {{loop_index}} {{end}}':
    '<% for (var _variable__IDX_ in __DATA.variable) { %>' +
    '<%- _variable__IDX_ %> <% } %>',
  '{{each variable}} {{if loop_index == 1}} SOMETHING {{end}} {{end}}':
    '<% for (var _variable__IDX_ in __DATA.variable) { %>' +
    '<% if (_variable__IDX_ === 1) { %>SOMETHING <% } %>' +
    '<% } %>',
  '{{{ x }}}': '<%= __DATA.x %>',
  '{{{ variable }}}': '<%= __DATA.variable %>',
  '{{{variable}}}': '<%= __DATA.variable %>',
  '{{each variable}}{{some[loop_index]}}{{end}}':
    '<% for (var _variable__IDX_ in __DATA.variable) { %>' +
    '<%- __DATA.some[_variable__IDX_] %>' +
    '<% } %>',
  '{{if false == true}}': '<% if (false === true) { %>',
  '{{if "false" == "true"}}': '<% if ("false" === "true") { %>',
  '{{if 1 > 2}}': '<% if (1 > 2) { %>',
  '{{if 1 < 2}}': '<% if (1 < 2) { %>',
  '{{if 1 <= 2}}': '<% if (1 <= 2) { %>',
  '{{if 1 >= 2}}': '<% if (1 >= 2) { %>',
  '{{each variable}} <a href={{loop_vars.variable.url}}>{{loop_vars.variable.name}}</a>{{end}}':
    '<% for (var _variable__IDX_ in __DATA.variable) { %>' +
    '<a href=<%- __DATA.variable[_variable__IDX_].url %>>' +
    '<%- __DATA.variable[_variable__IDX_].name %></a><% } %>',
  '{{each variable}} {{loop_index}} {{loop_index}} {{end}}':
    '<% for (var _variable__IDX_ in __DATA.variable) { %>' +
  '<%- _variable__IDX_ %> <%- _variable__IDX_ %> <% } %>',
  '{{each variable}}  {{if (loop_vars.variable.images) and (#loop_vars.variable.images)}} {{loop_vars.variable.images[0].url}} {{end}} {{end}}':
  '<% for (var _variable__IDX_ in __DATA.variable) { %>' +
  '<% if (( __DATA.variable[_variable__IDX_].images ) & ( __DATA.variable[_variable__IDX_].images.length )) { %>' +
  '<%- __DATA.variable[_variable__IDX_].images[0].url %> ' +
  '<% } %>' +
  '<% } %>',
  '{{each variable}}  {{if (loop_vars.variable.images) and not (#loop_vars.variable.images)}} {{loop_vars.variable.images[0].url}} {{end}} {{end}}':
  '<% for (var _variable__IDX_ in __DATA.variable) { %>' +
  '<% if (( __DATA.variable[_variable__IDX_].images ) & ! ( __DATA.variable[_variable__IDX_].images.length )) { %>' +
  '<%- __DATA.variable[_variable__IDX_].images[0].url %> ' +
  '<% } %>' +
  '<% } %>',
};
