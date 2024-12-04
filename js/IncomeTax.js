 class IncomeTax {
  static federalTaxBrackets = [
    { limit: 44701, rate: 0.15 },
    { limit: 89401, rate: 0.22 },
    { limit: 138586, rate: 0.26 },
    { limit: Infinity, rate: 0.29 },
  ];

  static ontarioTaxBrackets = [
    { limit: 49231, rate: 0.0505 },
    { limit: 98463, rate: 0.0915 },
    { limit: 150000, rate: 0.1116 },
    { limit: 220000, rate: 0.1216 },
    { limit: Infinity, rate: 0.1316 },
  ];

  static calculateTax(income, brackets) {
    if (income < 0 || isNaN(income)) {
      throw new Error("Invalid income: Income must be a non-negative number.");
    }
    let tax = 0;
    for (let i = 0; i < brackets.length; i++) {
      const { limit, rate } = brackets[i];
      const previousLimit = i === 0 ? 0 : brackets[i - 1].limit;

      if (income > previousLimit) {
        const taxableAmount = Math.min(income, limit) - previousLimit;
        tax += taxableAmount * rate;
      } else {
        break;
      }
    }
    return tax;
  }

  static calculateFederalTax(income) {
    return this.calculateTax(income, this.federalTaxBrackets);
  }

  static calculateOntarioTax(income) {
    return this.calculateTax(income, this.ontarioTaxBrackets);
  }
}


