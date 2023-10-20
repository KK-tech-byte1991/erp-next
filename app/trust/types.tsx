interface Trust {
  is_active: boolean;
  id: number;
  trustRegNo: string;
  trustAbbreviation: string;
  trustName: string;
  address: string;
  pincode: string;
  country: string;
  state: string;
  city: string;
  primaryContactNo: string;
  alternateContactNo: string;
  website: string;
  faxNumber: string;
  trustConfiguration?: TrustConfiguration
}

interface TrustConfiguration {
  trustConfId: number;
  missionVision: string;
  qualityPolicy: string;
  longTermGoal: string;
  shortTermGoal: string;
  governorsComposition: string;

}

// export { Trust:any, TrustConfiguration }