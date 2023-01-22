// probabilities 

const RarityP = {
  3: 0.9,
  4: 0.09,
  5: 0.01
}

const Units = {
  3: [{
      id: 1,
      name: "Genshin1",
      imgFile: "stable_diffusion_jpg4.jpg",
  }],
  4: [{
      id: 2,
      name: "Genshin2",
      imgFile: "stable_diffusion_jpg3.jpg",
  }],
  5: [
    {
      id: 3,
      name: "Genshin3",
      imgFile: "stable_diffusion_jpg1.jpg",
    },
    {
      id: 4,
      name: "Genshin4",
      imgFile: "stable_diffusion_jpg2.jpg",
    }
  ]
}

// schema {
//   users: {
//     uid: {
//       povertyPoints: x,
//       premiumPoints: x,
//       units: {
//         unitId: netWorth
//       }
//     }
//   }
// }

export { RarityP, Units }
