# json2sequelize-clause


## Description

This module or package is used to convert json format into a clause where sequelize. This makes it easier for you to create dynamic filter formats

## Getting Started

### Installing

```
npm i json2sequelize-clause
```

### Executing program

You can import library and use it for convert json to sequelize where clause
```
const User = require('./config')
const convert = require('json2sequelize-clause')

const clause = [
  {
      "column": "name",
      "function_name": "contains",
      "value": "Farcha",
      "operator": "where"
  },
  {
      "column": "age",
      "function_name": ">",
      "value": 21,
      "operator": "or"
  }
]

User.findAll({
    where: convert(clauses.does_not_contains)
}).then(results => {
    console.log(results)
})
```

For more example clause you can access [here](https://github.com/WisnuDS/json2sequelize-clause/blob/master/test/clauses.json) 

## Authors

* [WisnuDS](https://www.instagram.com/wisnuds__/)

## Version History
* 1.0.3
  * Update structure and recursive strategy
* 1.0.2
    * Update documentation in README.md
* 1.0.1
    * Update some attributes
    * Create some test cases
    * See [commit change](https://github.com/WisnuDS/json2sequelize-clause/commit/d81055e82d583d49047695c9d49b25e588563d8d)
* 1.0.0
    * Initial Release

## License

This project is licensed under the ISC License

