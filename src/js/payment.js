// payment.js
export function startPayment({ amount, currency='JPY', description='Book purchase' }) {
  console.log('Simulated payment', amount, currency, description);
  return Promise.resolve({ status:'ok', id:'sim-payment-1' });
}
