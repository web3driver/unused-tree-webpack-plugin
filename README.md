
`unused-tree-webpack-plugin` is a webpack plugin to find out your unused files and display it with 'tree-like' structuer.

### Installation

``` bash
$ npm install unused-tree-webpack-plugin --save
```

### Usage

In your webpack config file.
``` javascript
const { UnusedTreeWebpackPlugin } = require("unused-tree-webpack-plugin");
 
module.exports = {
  plugins: [
    new UnusedTreeWebpackPlugin(options),
  ],
};
```

Your unused webpack files will be published to your trminal.

``` bash
.
├── hahha
│   ├── hehe.js
│   └── yeye
│       └── io.js
├── index.js
├── package.json
└── test
    ├── 1
    │   ├── 1.js
    │   ├── 2.js
    │   ├── dsadsa
    │   │   ├── asds.js
    │   │   └── qwewqe.js
    │   ├── fsadas
    │   │   └── 3.js
    │   └── ijiji
    ├── a
    │   ├── aa
    │   │   └── 1.js
    │   └── ab
    │       └── 2.js
    ├── b
    │   ├── ba
    │   │   └── 3.js
    │   └── bb
    │       └── 4.js
    ├── empty
    ├── hahahaha.js
    └── heheh
        └── 4.js
```

### Options
|params|function|
|:-:|:-:|
|pathFilter|the filter base path|
|extFilter|the extention filter,such as ['.js','.json'],the filter will only display js and json files|
|exclude|exclute file or folder lists,such as ['funny','happy'], the file or folder contains 'funny' or 'happy' will be ignored|
|display|the display mode, 'tree' will display 'tree-like' structer, 'array' will display file path lists. 'tree' mode is default|


### License

[MIT](http://opensource.org/licenses/MIT)
