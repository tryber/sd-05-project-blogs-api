// const createUser = rescue((req, res) => {
//   const { displayName, email, password, image } = req.body;

//   User.create({ displayName, email, password, image })
//     .then((newUser) => {
//       // const { id, displayName, email, image } = newUser;

//       res.status(200).json(newUser);
//     })
//     .catch((e) => {
//       console.log(e.message);
//       res.status(500).json({ message: 'Something went wrong' });
//     });
// });
