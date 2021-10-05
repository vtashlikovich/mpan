"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _mpanString;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MPAN = void 0;
const PRIME_NUMBERS = [3, 5, 7, 13, 17, 19, 23, 29, 31, 37, 41, 43];
const DISTRIBUTION_ZONES = [
    {
        "id": 10,
        "name": "Eastern England",
        "operator": "UK Power Networks"
    },
    {
        "id": 11,
        "name": "East Midlands",
        "operator": "Western Power Distribution"
    },
    {
        "id": 12,
        "name": "London",
        "operator": "UK Power Networks"
    },
    {
        "id": 13,
        "name": "Merseyside and Northern Wales",
        "operator": "ScottishPower"
    },
    {
        "id": 14,
        "name": "West Midlands",
        "operator": "Western Power Distribution"
    },
    {
        "id": 15,
        "name": "North Eastern England",
        "operator": "Northern Power Grid"
    },
    {
        "id": 16,
        "name": "North Western England",
        "operator": "Electricity North West"
    },
    {
        "id": 17,
        "name": "Northern Scotland",
        "operator": "SSE Power Distribution"
    },
    {
        "id": 18,
        "name": "Southern Scotland",
        "operator": "ScottishPower"
    },
    {
        "id": 19,
        "name": "South Eastern England",
        "operator": "UK Power Networks"
    },
    {
        "id": 20,
        "name": "Southern England",
        "operator": "SSE Power Distribution"
    },
    {
        "id": 21,
        "name": "Southern Wales",
        "operator": "Western Power Distribution"
    },
    {
        "id": 22,
        "name": "South Western England",
        "operator": "Western Power Distribution"
    },
    {
        "id": 23,
        "name": "Yorkshire",
        "operator": "Northern Power Grid"
    },
    {
        "id": 27,
        "name": "Unmetered Supply",
        "operator": "Unmetered Supply"
    }
];
// Meter Point Administration Number
class MPAN {
    constructor(mpanString) {
        _mpanString.set(this, void 0);
        this.longString = '';
        this.shortString = '';
        this.isValid = false;
        this.isShort = false;
        this.profile = '';
        this.timeCode = '';
        this.llf = '';
        this.distributorCode = '';
        this.distributionZone = '';
        this.distributionOperator = '';
        this.identifier = '';
        this.checkCode = '';
        __classPrivateFieldSet(this, _mpanString, mpanString);
        this.parse();
    }
    parse() {
        //  99 999 AZ9 99 99999999 999
        //  profile
        //     time switch code
        //         LLF
        //             Distributor id
        //                unique identifier
        //                         check numbers
        if (__classPrivateFieldGet(this, _mpanString) && __classPrivateFieldGet(this, _mpanString).trim().length > 0) {
            __classPrivateFieldSet(this, _mpanString, __classPrivateFieldGet(this, _mpanString).trim());
            this.isValid = this.checkIfMpanValid();
            if (!this.isValid)
                return;
            this.longString = __classPrivateFieldGet(this, _mpanString).length == 21 ? __classPrivateFieldGet(this, _mpanString) : '';
            this.shortString = __classPrivateFieldGet(this, _mpanString).length == 21 ? __classPrivateFieldGet(this, _mpanString).slice(-13) : __classPrivateFieldGet(this, _mpanString);
            // if all digits are in the correct format, lets perform Mpan validation using a check numbers
            this.isValid = this.validateMpanIdentifier();
            // let's parse mpan independent on the last check result
            if (__classPrivateFieldGet(this, _mpanString).length == 21)
                this.parseLongVersion();
            else
                this.parseShortVersion();
            if (this.distributorCode)
                this.fillDNOValues();
        }
    }
    parseLongVersion() {
        this.profile = __classPrivateFieldGet(this, _mpanString).slice(0, 2);
        this.timeCode = __classPrivateFieldGet(this, _mpanString).slice(2, 5);
        this.llf = __classPrivateFieldGet(this, _mpanString).slice(5, 8);
        this.distributorCode = __classPrivateFieldGet(this, _mpanString).slice(8, 10);
        this.identifier = __classPrivateFieldGet(this, _mpanString).slice(10, 18);
        this.checkCode = __classPrivateFieldGet(this, _mpanString).slice(18);
    }
    parseShortVersion() {
        this.isShort = true;
        this.distributorCode = __classPrivateFieldGet(this, _mpanString).slice(0, 2);
        this.identifier = __classPrivateFieldGet(this, _mpanString).slice(2, 10);
        this.checkCode = __classPrivateFieldGet(this, _mpanString).slice(10);
    }
    checkIfMpanValid() {
        let mpanLength = __classPrivateFieldGet(this, _mpanString).length;
        let longRule = /[0-9]{2}[0-9]{3}[a-zA-Z0-9]{3}[0-9]{2}[0-9]{8}[0-9]{3}/g;
        let shortRule = /[0-9]{2}[0-9]{8}[0-9]{3}/g;
        return !(mpanLength != 21 && mpanLength != 13 || mpanLength == 21 && !longRule.test(__classPrivateFieldGet(this, _mpanString)) ||
            mpanLength == 13 && !shortRule.test(__classPrivateFieldGet(this, _mpanString)));
    }
    fillDNOValues() {
        let distributorCodeInt = Number(this.distributorCode);
        for (var i in DISTRIBUTION_ZONES) {
            let item = DISTRIBUTION_ZONES[i];
            if (item.id == distributorCodeInt) {
                this.distributionZone = item.name;
                this.distributionOperator = item.operator;
                break;
            }
        }
        ;
    }
    // special algorithm for validating short mpan format
    validateMpanIdentifier() {
        if (!this.shortString || this.shortString.length != 13)
            return false;
        let checkDigit = Number(this.shortString.slice(-1));
        let processedMpanPart = this.shortString.slice(0, -1);
        let calculatedAmount = 0;
        for (var i = 0; i < processedMpanPart.length; i++)
            calculatedAmount += Number(processedMpanPart[i]) * PRIME_NUMBERS[i];
        return calculatedAmount % 11 % 10 == checkDigit;
    }
}
exports.MPAN = MPAN;
_mpanString = new WeakMap();
