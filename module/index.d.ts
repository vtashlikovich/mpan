declare class MPAN {
    #private;
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
    checkDigitCalculation(checkDigit: string, mpanCore: string): boolean;
    constructor(mpanString: string);
    private parse;
    private checkIfMpanValid;
}
export { MPAN };
