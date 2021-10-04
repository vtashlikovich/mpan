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
    #mpanString: string;
    isValid: boolean = false;
    isShort: boolean = false;
    profile: string = '';
    timeCode: string = '';
    llf: string = '';
    distributorCode: string = '';
    distributionZone: string = '';
    distributionOperator: string = '';
    identifier: string = '';
    checkCode: string = '';

    constructor(mpanString: string) {
        this.#mpanString = mpanString;

        this.parse();
    }

    private parse(): void {

        //  99 999 AZ9 99 99999999 999
        //  profile
        //     time switch code
        //         LLF
        //             Distributor id
        //                unique identifier
        //                         check numbers

        if (this.#mpanString && this.#mpanString.trim().length > 0) {

            this.#mpanString = this.#mpanString.trim();
            if (!this.checkIfMpanValid()) return;

            if (this.#mpanString.length == 21) {
                this.profile = this.#mpanString.slice(0, 2);
                this.timeCode = this.#mpanString.slice(2, 5);
                this.llf = this.#mpanString.slice(5, 8);
                this.distributorCode = this.#mpanString.slice(8, 10);
                this.identifier = this.#mpanString.slice(10, 18);
                this.checkCode = this.#mpanString.slice(18);
            }
            else {
                this.isShort = true;
                this.distributorCode = this.#mpanString.slice(0, 2);
                this.identifier = this.#mpanString.slice(2, 10);
                this.checkCode = this.#mpanString.slice(10);
            }

            if (this.distributorCode) {
                let distributorCodeInt: number = Number(this.distributorCode);
                for (var i in DISTRIBUTION_ZONES) {
                    let item = DISTRIBUTION_ZONES[i];
                    if (item.id == distributorCodeInt) {
                        this.distributionZone = item.name;
                        this.distributionOperator = item.operator;
                        break;
                    }
                };
            }
        }
    }

    private checkIfMpanValid(): boolean {
        let mpanLength = this.#mpanString.length;
        let longRule = /[0-9]{2}[0-9]{3}[a-zA-Z0-9]{3}[0-9]{2}[0-9]{8}[0-9]{3}/g
        let shortRule = /[0-9]{2}[0-9]{8}[0-9]{3}/g
        this.isValid = !(mpanLength != 21 && mpanLength != 13 || mpanLength == 21 && !longRule.test(this.#mpanString) ||
            mpanLength == 13 && !shortRule.test(this.#mpanString));
        return this.isValid;
    }
}

export { MPAN };