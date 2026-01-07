import zod from 'zod';

const pokeValSchema = zod.object({
  name: zod.string().min(1, 'Name is required'),
  height: zod.number().min(0, 'Height is required'),
  weight: zod.number().min(0, 'Weight is required'),
  types: zod.array(zod.string()).min(1, 'At least one type is required'),
});

const pokeTypes = [
    'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting',
    'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',
    'dark', 'dragon', 'steel', 'fairy'
];

export { pokeValSchema, pokeTypes };