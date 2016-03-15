import {Xml} from "avatars/utils/xml";


console.info(Xml.parse(`
<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<HomeAccountRequest>
    <mortgageProfileTimeHorizon>1</mortgageProfileTimeHorizon>
    <partnerID>2</partnerID>
    <cashOutAmount>0</cashOutAmount>
    <secondaryLoanAmount>0</secondaryLoanAmount>
    <propertyPurpose>1</propertyPurpose>
    <mortgageProfileLoanType>1</mortgageProfileLoanType>
    <annualHouseholdIncome>200000</annualHouseholdIncome>
    <secondaryLoanMonthlyPayment>0</secondaryLoanMonthlyPayment>
    <lenderStatusSubCodeLevel>20</lenderStatusSubCodeLevel>
    <annualHomeOwnersInsurance>100</annualHomeOwnersInsurance>
    <primaryLoanAmount>320000</primaryLoanAmount>
    <annualPropertyTax>5000</annualPropertyTax>
    <zipCode>66213</zipCode>
    <transactionType>2</transactionType>
    <monthlyHOAFees>0</monthlyHOAFees>
    <incomeType>1</incomeType>
    <propertyType>1</propertyType>
    <creditScore>740</creditScore>
    <downPayment>0</downPayment>
    <propertyValue>400000</propertyValue>
    <mortgageProfileIdealMortgage>1</mortgageProfileIdealMortgage>
    <primaryLoanMonthlyPayment>1600</primaryLoanMonthlyPayment>
    <veteranType>2</veteranType>
    <mortgageProfilePaymentOption>1</mortgageProfilePaymentOption>
    <lenderId>999</lenderId>
    <investmentAndSavings>100000</investmentAndSavings>
    <sortOrder><sortOrder>0</sortOrder><sortOrder>0</sortOrder><sortOrder>0</sortOrder></sortOrder>
</HomeAccountRequest>
`));

//console.log(Xml.node('HomeAccountRequest',{},[
//    Xml.node('MortgageProfileTimeHorizon',{"key":"value"},[1])
//]).toString());

