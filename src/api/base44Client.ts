export const base44 = {
  entities: {
    AgroShop: {
      list: async (order: string, limit: number) => {
        // Mock implementation returning empty array so it falls back to SAMPLE_SHOPS
        return [];
      }
    }
  }
};
