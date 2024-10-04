export function formatCurrency(amount : number) {
  return Intl.NumberFormat('en-US', {
    currency: 'USD', style: 'currency'
  }).format(amount);
} 

export function toBoolean(str: string) {
  return str.toLowerCase() === 'true';
}