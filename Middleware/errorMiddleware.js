// const whatStatusThisMessageDeserves = (message) => ({
//   "\"password\" length must be 6 characters long": 'Meu perfil',
//   '/products': 'TryBeer',
//   '/checkout': 'Finalizar Pedido',
//   '/orders': 'Meus Pedidos',
//   [`/orders/${pathname.split('/').slice(magicNumber)}`]: 'Detalhes de pedido',
// }[pathname]);

module.exports = (err, _req, res, _next) => {
  console.error(err);
  const { message } = err.error.details[0];
  const { status } = err;

  res.status(status).json({ message });
};
