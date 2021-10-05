# Mpan parser
Parsing MPAN identificator on JavaScript for UK energy market.

## Usage

```javascript
const MPAN = require('mpan-uk').MPAN; // as installed npm package

var mpan = new MPAN('1000071051506'); // init with 13-digit short version or 21-digit version
mpan.longString // contains long version of Mpan
mpan.shortString // contains short version of Mpan
mpan.isValid; // indicates if Mpan has correct format, both short and long version
mpan.isShort; // indicates if Mpan initially is in short format
mpan.profile; // contains profile code (long version only)
mpan.timeCode; // contains time code (long version only)
mpan.llf; // contains LLF, line loss factor (long version only)
mpan.distributorCode; // contains Dsitrubution zone code
mpan.distributionZone; // contains DNO zone name
mpan.distributionOperator; // constains DNO name
```

Plese refer to _usage.js_ for an example. [_index.ts_] contains TypeScript ready version. [_module/index.js_] contains JavaScript ready version.

## Compilation

```bash
# build JS version out of TS
$ npm run build

# run tests for JS version
$ npm run test
```

## License

You can modify and distribute the code under MIT license.

## Author

Vadim Tashlikovich, http://tashlikovich.info/