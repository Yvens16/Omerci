export default interface WhyThisCard {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  values: {
    name: string,
    title: string,
    hasCagnotte: boolean,
    isPremium: boolean,
  },
  toggleCagnotteModal: (whenOpeningOnly: boolean) => void,
  togglePremiumModal: (whenOpeningOnly: boolean) => void,
};

// export default interface