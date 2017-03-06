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

          const importNode = defaultImport
                ? t.importDefaultSpecifier
                : t.importSpecifier;

          const reactImportDeclaration = t.importDeclaration([
            importNode(t.identifier(name)),
          ], t.stringLiteral(lib));

          node.body.unshift(reactImportDeclaration);
        },
      },
    },
  };
}
