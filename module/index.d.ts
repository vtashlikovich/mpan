declare class MPAN {
    #private;
    longString: string;
    shortString: string;
    isValid: boolean;
    isShort: boolean;
    profile: string;
    timeCode: string;
    llf: string;
    distributorCode: string;
    distributionZone: string;
    distributionOperator: string;
    identifier: string;
    checkCode: string;
    constructor(mpanString: string);
    private parse;
    private parseLongVersion;
    private parseShortVersion;
    private checkIfMpanValid;
    private fillDNOValues;
    private validateMpanIdentifier;
}
export { MPAN };
