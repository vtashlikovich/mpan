const MPAN = require('./module/index').MPAN;

var mpan = new MPAN('011239601700053058802');
console.log('isValid', mpan.isValid);
console.log('isShort', mpan.isShort);
console.log('LLF', mpan.llf);
console.log('distributorCode', mpan.distributorCode);
console.log('distributionZone', mpan.distributionZone);
console.log('distributionOperator', mpan.distributionOperator);
console.log('profile', mpan.profile);
console.log('long version', mpan.longString);
console.log('short version', mpan.shortString);