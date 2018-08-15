export interface OpeningTimeData {
  specialTag: string;
  times: string[];
}

export function openingTimesBlockParser(data: any[]): OpeningTimeData | null {
  const enabledBlocks: OpeningTimeData[] = [];

  data.forEach(block => {
    if (block.type === 'opening_times' && block.value.enabled) {
      enabledBlocks.push(block.value);
    }
  });


  return enabledBlocks.length > 0 ? enabledBlocks[0] : null;
}
