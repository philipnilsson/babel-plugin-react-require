export default function ({ types: t }) {
  return {
    visitor: {
      JSXOpeningElement(path, { file }) {
        file.set('hasJSX', true);
      },

      Program: {
        enter(path, { file }) {
          file.set('hasJSX', false);
        },

        exit({ node, scope }, { file, opts = {} }) {

          if (!file.get('hasJSX') || scope.hasBinding(name)) {
            return;
          }

          const {
            importName: name = 'React',
            lib = name.toLowerCase(),
            defaultImport = true
          } = opts;

          const identifierNode = t.identifier(name);
          const importNode = defaultImport
                ? t.importDefaultSpecifier(identifierNode)
                : t.importSpecifier(identifierNode, identifierNode);
          const reactImportDeclaration =
                t.importDeclaration([ importNode, ], t.stringLiteral(lib));

          node.body.unshift(reactImportDeclaration);
        },
      },
    },
  };
}
