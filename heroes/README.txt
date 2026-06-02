Hero artwork goes here.

Each file in this folder maps to the `image` field of a hero defined in
src/data/heroes.js. For example, to give the hero with id "vagabond" custom
art, add an image file here (e.g. vagabond.png) and set its `image` field:

  { id: 'vagabond', name: 'Le Vagabond', rarity: 'commun', image: 'vagabond.png' }

The component src/components/HeroPortrait.jsx loads it from:

  `${import.meta.env.BASE_URL}heroes/<image>`

When `image` is null, a placeholder hooded silhouette (tinted by rarity) is
shown instead. Recommended: transparent PNG, portrait orientation.
