export default function numberToCurrency(number = 0) {
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
