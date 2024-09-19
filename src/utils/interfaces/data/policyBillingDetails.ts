export interface IPolicyBillingDetail {
  sequence: number;
  policyOrigin?: string;
  policyType?: string;
  accountNumber?: string;
  policyNumber?: string;
  policyStatus?: string;
  insuredName?: string;
  insuredZip?: string;
  payerState?: string;
  agencyNumber?: string;
  owningAgentNumber?: string;
  agentName?: string;
  audit1Policy?: string;
  audit2Policy?: string;
  showOtherAmount?: boolean;
  allowCreditCard?: boolean;
  allowPreviousYear?: boolean;
  personalOrCommercial?: "personal" | "commercial" | null;
  eligibleForIVR?: boolean;
  showOtherLoan?: boolean;
  payCenterEligible?: boolean;
  policyDueDate?: string;
  policyCancelDate?: string;
  isGWNewIssue?: boolean;
  lastDateToPay?: string;
  lapseCode?: string;
  cancelReason1?: string;
  cancelReason2?: string;
  cancelReason3?: string;
  billingMode?: string;
  billingControlNumber?: string;
  coverageType?: string;
  GWBillType?: string;
  policyCancelDate2?: string;
  audit1DueDate?: string;
  audit2DueDate?: string;
  clientSituationId?: string;
  paidAmount?: number;
  paymentAmounts?: IPaymentAmount[];
}
export interface IPaymentAmount {
  sequence: number;
  amountLabel?:
    | "Written Premium"
    | "Previous Due"
    | "Cash With App Payment"
    | "Flex Payment"
    | "Account Level Fees"
    | "Current Bill"
    | "Interest Payment"
    | "Premium Payment"
    | "Loan Payment"
    | "Total Amount Due"
    | "Minimum Amount Due"
    | "Audit 2 Amount"
    | "Audit 1 Amount"
    | "Reinstatement Amount";
  billedAmount?: number;
  paidAmount?: number;
}

export const BACKUP_POLICY_BILL_1: IPolicyBillingDetail[] = [
  {
    sequence: 1,
    accountNumber: "00261123",
    policyNumber: "00261123",
    policyStatus: "Active",
    insuredName: "Kim Lim",
    personalOrCommercial: "personal",
    policyDueDate: "2024-10-16T06:00:00.000Z",
    lastDateToPay: "2024-04-09",
    isGWNewIssue: false,
    paidAmount: 2040.0,
    paymentAmounts: [
      {
        sequence: 1,
        amountLabel: "Minimum Amount Due",
        billedAmount: 1354.23,
        paidAmount: 40.0,
      },
      { sequence: 2, amountLabel: "Total Amount Due", billedAmount: 2704.46, paidAmount: 2000.0 },
    ],
  },
  {
    sequence: 2,
    policyOrigin: "G",
    policyType: "Homeowners",
    accountNumber: "00261123",
    policyNumber: "90718512",
    policyStatus: "Active",
    insuredName: "John Jones",
    agencyNumber: "00988",
    agentName: "John Doe",
    policyDueDate: "2024-10-16T06:00:00.000Z",
    lastDateToPay: "2024-04-09",
    isGWNewIssue: false,
    paidAmount: 0.0,
    paymentAmounts: [
      {
        sequence: 1,
        amountLabel: "Minimum Amount Due",
        billedAmount: 54,
        paidAmount: 0.0,
      },
      { sequence: 2, amountLabel: "Total Amount Due", billedAmount: 100, paidAmount: 0.0 },
    ],
  },
  {
    sequence: 3,
    policyOrigin: "G",
    policyType: "Personal Auto",
    accountNumber: "00261123",
    policyNumber: "87181102",
    policyStatus: "Active",
    insuredName: "Jane Jim",
    agencyNumber: "00987",
    agentName: "John Doe",
    policyDueDate: "2024-10-16T06:00:00.000Z",
    lastDateToPay: "2024-04-09",
    isGWNewIssue: false,
    paidAmount: 1050.0,
    paymentAmounts: [
      {
        sequence: 1,
        amountLabel: "Minimum Amount Due",
        billedAmount: 250,
        paidAmount: 50.0,
      },
      { sequence: 2, amountLabel: "Total Amount Due", billedAmount: 2604.46, paidAmount: 1000.0 },
    ],
  },
];

export const BACKUP_POLICY_BILL_2: IPolicyBillingDetail[] = [
  {
    sequence: 1,
    accountNumber: "00876234",
    policyNumber: "00876234",
    policyStatus: "Active",
    insuredName: "John J. Jingleheimer",
    personalOrCommercial: "commercial",
    policyDueDate: "2024-10-16T06:00:00.000Z",
    lastDateToPay: "2024-04-09",
    isGWNewIssue: false,
    paidAmount: 350.0,
    paymentAmounts: [
      {
        sequence: 1,
        amountLabel: "Minimum Amount Due",
        billedAmount: 354.23,
        paidAmount: 50.0,
      },
      { sequence: 2, amountLabel: "Total Amount Due", billedAmount: 4354.23, paidAmount: 300.0 },
      { sequence: 3, amountLabel: "Reinstatement Amount", billedAmount: 99000, paidAmount: 0.0 },
    ],
  },
  {
    sequence: 2,
    policyOrigin: "G",
    policyType: "Business Owners",
    accountNumber: "00876234",
    policyNumber: "90718512",
    policyStatus: "Active",
    insuredName: "Mike Jones",
    agencyNumber: "00999",
    agentName: "John Doe",
    policyDueDate: "2024-11-11T06:00:00.000Z",
    lastDateToPay: "2024-04-09",
    isGWNewIssue: false,
    paidAmount: 8.0,
    paymentAmounts: [
      {
        sequence: 1,
        amountLabel: "Minimum Amount Due",
        billedAmount: 99.9,
        paidAmount: 0.0,
      },
      { sequence: 2, amountLabel: "Total Amount Due", billedAmount: 808.44, paidAmount: 8.0 },
    ],
  },
];

export const BACKUP_POLICY_BILL_3: IPolicyBillingDetail[] = [
  {
    sequence: 1,
    accountNumber: "27181102",
    policyNumber: "27181102",
    policyStatus: "Active",
    insuredName: "Smitty Werben",
    personalOrCommercial: null,
    policyDueDate: "2024-09-21T06:00:00.000Z",
    lastDateToPay: "2024-04-09",
    isGWNewIssue: false,
    paidAmount: 50.0,
    paymentAmounts: [
      {
        sequence: 1,
        amountLabel: "Minimum Amount Due",
        billedAmount: 1350.46,
        paidAmount: 50.0,
      },
      { sequence: 2, amountLabel: "Total Amount Due", billedAmount: 9999.99, paidAmount: 0.0 },
    ],
  },
  {
    sequence: 2,
    policyType: "Term Life",
    accountNumber: "27181102",
    policyNumber: "00667833",
    policyStatus: "Active",
    insuredName: "Egg Man",
    agencyNumber: "01000",
    agentName: "John Doe",
    policyDueDate: "2024-11-11T06:00:00.000Z",
    lastDateToPay: "2024-04-09",
    isGWNewIssue: false,
    paidAmount: 90.0,
    paymentAmounts: [
      {
        sequence: 1,
        amountLabel: "Premium Payment",
        billedAmount: 99.9,
        paidAmount: 90.0,
      },
      { sequence: 2, amountLabel: "Total Amount Due", billedAmount: 1087, paidAmount: 0.0 },
    ],
  },
  {
    sequence: 3,
    policyType: "Medicare Supplement",
    accountNumber: "27181102",
    policyNumber: "90718811",
    policyStatus: "Active",
    insuredName: "Daniel Daniels",
    agencyNumber: "01001",
    agentName: "John Doe",
    policyDueDate: "2024-12-31T06:00:00.000Z",
    lastDateToPay: "2024-04-09",
    isGWNewIssue: false,
    paidAmount: 0.0,
    paymentAmounts: [
      {
        sequence: 1,
        amountLabel: "Premium Payment",
        billedAmount: 11.3,
        paidAmount: 0.0,
      },
      { sequence: 2, amountLabel: "Total Amount Due", billedAmount: 87, paidAmount: 0.0 },
    ],
  },
  {
    sequence: 4,
    policyType: "Whole Life",
    accountNumber: "27181102",
    policyNumber: "90718999",
    policyStatus: "Active",
    insuredName: "Sean Connery",
    agencyNumber: "01002",
    agentName: "John Doe",
    policyDueDate: "2024-12-31T06:00:00.000Z",
    lastDateToPay: "2024-04-09",
    isGWNewIssue: false,
    paidAmount: 0.0,
    paymentAmounts: [
      {
        sequence: 1,
        amountLabel: "Premium Payment",
        billedAmount: 20.24,
        paidAmount: 0.0,
      },
      { sequence: 2, amountLabel: "Total Amount Due", billedAmount: 301.2, paidAmount: 0.0 },
    ],
  },
];
