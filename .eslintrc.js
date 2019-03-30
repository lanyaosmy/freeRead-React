module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb",
    "globals": {
        "$": true,
        "process": true,
        "__dirname": true
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module",
        "ecmaVersion": 7
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "prefer-template": 0,
        "one-var": 0,
        "prefer-arrow-callback": 0,
        "indent": ["error", 4],
        "comma-dangle": ["error", "never"],
        "arrow-body-style": [0, "never"],
        "no-console": ["error", { allow: ["warn", "error","log"] }],
        "no-lone-blocks": 0,
        "no-restricted-syntax": 0,
        "no-unused-expressions": [0, {
            "allowShortCircuit": true,
            "allowTernary": true
        }],
        "prefer-destructuring": ["error", {
            "array": true,
            "object": true
          }, {
            "enforceForRenamedProperties": false
        }],
        "func-names": 0,
        "prefer-const": 0,
        "import/no-unresolved": 0,
        "import/extensions": 0,
        "space-before-function-paren": [2, "always"],
        "import/no-extraneous-dependencies": 0,
        "import/prefer-default-export": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "jsx-a11y/href-no-hash": 0,
        "jsx-a11y/anchor-is-valid": 0,
        "jsx-a11y/label-has-for": 0,
        "react/no-array-index-key": 0,
        "react/jsx-indent": [2, 4],
        "react/jsx-indent-props": [2, 4],
        "react/require-default-props": 0,
        "react/forbid-prop-types": 0,
        "react/no-string-refs": 0,
        "react/no-find-dom-node": 0,
        "react/prefer-stateless-function": 0,
        "react/jsx-closing-tag-location": 0,
        "react/jsx-closing-bracket-location": [2, 'after-props'],
        "react/sort-comp": 0,
        "react/jsx-no-bind": 0,
        "react/no-danger": 0,
        "react/jsx-first-prop-new-line": 0,
        "react/jsx-filename-extension": 0,
        "space-before-function-paren": 0,
        "arrow-parens": 0,
        "class-methods-use-this": 0,
        "react/prop-types": 0,
        "object-curly-newline": 0,
        "function-paren-newline": 0,
        "no-nested-ternary": 0,
        "no-prototype-builtins": 0
    },
    "settings": {
        "import/ignore": [
            "node_modules"
        ]
    }
}
