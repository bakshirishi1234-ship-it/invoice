// Helper function to generate tool-specific keywords
export const generateToolKeywords = (toolName: string, toolCategory: string): string => {
  const baseKeywords = [
    toolName.toLowerCase(),
    `free ${toolName.toLowerCase()}`,
    `${toolName.toLowerCase()} online`,
    `${toolName.toLowerCase()} generator`,
    `${toolName.toLowerCase()} maker`,
    `${toolName.toLowerCase()} template`,
    `${toolName.toLowerCase()} free online`,
    `create ${toolName.toLowerCase()}`,
    `make ${toolName.toLowerCase()}`,
    `${toolName.toLowerCase()} pdf`,
    `${toolName.toLowerCase()} download`,
    `professional ${toolName.toLowerCase()}`,
    `${toolName.toLowerCase()} for freelancers`,
    `${toolName.toLowerCase()} for small business`,
    toolCategory.toLowerCase(),
    `${toolCategory.toLowerCase()} tools`,
    'free business tools',
    'freelancer tools',
    'small business software',
    'no signup',
    'instant download',
    'pdf generator'
  ];

  return baseKeywords.join(', ');
};
