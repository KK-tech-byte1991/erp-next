export const getTrustDetails = (trustList: any, trustId: any) => {
    const a = trustList?.find((trust: any) => trust.id === +trustId) ?? {
        trustRegNo: "",
        trustAbbreviation: "",
        trustName: "",
        address: "",
        pincode: "",
        country: "IN",
        state: "MH",
        city: "Pune",
        primaryContactNo: "",
        alternateContactNo: "",
        website: "",
        faxNumber: "",
        is_active: true,
        trustConfiguration: {
            trustConfId: 0,
            missionVision: "",
            qualityPolicy: "",
            longTermGoal: "",
            shortTermGoal: "",
            governorsComposition: ""
        }
    }

    return JSON.parse(JSON.stringify(a))
}