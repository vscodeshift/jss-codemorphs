# @vscodeshift/jss-codemorphs

[![CircleCI](https://circleci.com/gh/vscodeshift/jss-codemorphs.svg?style=svg)](https://circleci.com/gh/vscodeshift/jss-codemorphs)
[![Coverage Status](https://codecov.io/gh/vscodeshift/jss-codemorphs/branch/master/graph/badge.svg)](https://codecov.io/gh/vscodeshift/jss-codemorphs)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/vscodeshift.jss-codemorphs)](https://marketplace.visualstudio.com/items?itemName=vscodeshift.jss-codemorphs)

# **Convert CSS to JSS** Command

## Example

### Before

```ts
@keyframes alarm {
  from {
    color: red;
  }
  50% {
    color: initial;
  }
  to {
    color: red;
  }
}
.foo {
  color: green;
  & .bar-qux, & .glorm:after {
    color: red;
  }
  & .baz:after {
    content: 'whoo';
  }
}
.glorm {
  color: green;
  display: box;
  display: flex-box;
  display: flex;
}
.bar-qux {
  color: white;
  animation: alarm 1s linear infinite;
}
@media screen {
  a {
    text-decoration: none;
    .foo {
      color: brown;
    }
  }
  .foo {
    & .bar-qux {
      color: orange;
    }
  }
}
```

### Command

```
jscodeshift -t path/to/jss-codemorphs/css-to-jss.js <file>
```

### After

```ts
'@keyframes alarm': {
  from: {
    color: 'red',
  },
  '50%': {
    color: 'initial',
  },
  to: {
    color: 'red',
  },
},
foo: {
  color: 'green',
  '& $barQux, & $glorm:after': {
    color: 'red',
  },
  '& .baz:after': {
    content: '"whoo"',
  },
},
glorm: {
  color: 'green',
  display: 'flex',
  fallbacks: [
    {
      display: 'box',
    },
    {
      display: 'flex-box',
    },
  ],
},
barQux: {
  color: 'white',
  animation: '$alarm 1s linear infinite',
},
'@media screen': {
  $foo: {
    '& $barQux': {
      color: 'orange',
    },
  },
  '@global': {
    a: {
      textDecoration: 'none',
      '& $foo': {
        color: 'brown',
      },
    },
  },
},
```
