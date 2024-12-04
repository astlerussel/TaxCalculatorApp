export default class Hst{
    calculate(amount, province){
        let nTax;
        switch(province){
            case 'ON':
                nTax = amount * .13;
                break;
            case 'MB':
                nTax = amount * .12;
                break;
            case 'AB':
                nTax = amount * .05;
                break;
            case 'QC':
                nTax = amount * .14975;
                break;
            default:
                throw "unimplemented";

        }
        return nTax.toFixed(2);
    }

}