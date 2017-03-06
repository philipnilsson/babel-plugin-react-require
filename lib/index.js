'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      JSXOpeningElement: function (path, _ref2) {
        var file = _ref2.file;

        file.set('hasJSX', true);
      },


      Program: {
        enter: function (path, _ref3) {
          var file = _ref3.file;

          file.set('hasJSX', false);
        },
        exit: function (_ref4, _ref5) {
          var node = _ref4.node,
              scope = _ref4.scope;
          var file = _ref5.file,
              _ref5$opts = _ref5.opts,
              opts = _ref5$opts === undefined ? {} : _ref5$opts;


          if (!file.get('hasJSX') || scope.hasBinding(name)) {
            return;
          }

          var _opts$importName = opts.importName,
              name = _opts$importName === undefined ? 'React' : _opts$importName,
              _opts$lib = opts.lib,
              lib = _opts$lib === undefined ? name.toLowerCase() : _opts$lib,
              _opts$defaultImport = opts.defaultImport,
              defaultImport = _opts$defaultImport === undefined ? true : _opts$defaultImport;


          var identifierNode = t.identifier(name);
          var importNode = defaultImport ? t.importDefaultSpecifier(identifierNode) : t.importSpecifier(identifierNode, identifierNode);
          var reactImportDeclaration = t.importDeclaration([importNode], t.stringLiteral(lib));

          node.body.unshift(reactImportDeclaration);
        }
      }
    }
  };
};