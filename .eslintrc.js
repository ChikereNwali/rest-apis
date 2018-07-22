
  {
'extends'; 'airbnb',
'parser';'babel-eslint',
{
    'parserOptions': {
        'ecmaVersion': 6,
        'sourceType': 'module',
        'ecmaFeatures': {'jsx': true,
        'modules':true,
      'experimentalObjectRestSpread':true}
    }

}
 'env';{
  'browser'; true,
  'node'; true,
  'es6'; true,
  'mocha'; true
}
'rules'; {
  'valid-jsdoc'; ['error', {
    'requireReturn': true,
    'requireReturnType': true,
    'requireParamDescription': true,
    'requireReturnDescription': true
  }],
  'require-jsdoc'; ['error', {
      'require': {
          'FunctionDeclaration': true,
          'MethodDefinition': true,
          'ClassDeclaration': true
      }
  }]
}
}
