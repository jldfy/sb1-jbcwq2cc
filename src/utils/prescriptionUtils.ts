// Mock backend call to generate a unique prescription identifier
export async function generatePrescriptionId(): Promise<string> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // In dev mode, generate a mock ID with format: YYYY-XXXXX
  // where YYYY is current year and XXXXX is a random 5-digit number
  const year = new Date().getFullYear();
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `${year}-${randomNum}`;
}