import { 
    capitalize, 
    formatHeight, 
    formatWeight, 
    formatStatName, 
    getPokemonNumber 
  } from './utils.js';
  
  // Test capitalize
  console.log('capitalize("pikachu"):', capitalize("pikachu"));
  // Expected: "Pikachu"
  
  // Test formatHeight
  console.log('formatHeight(4):', formatHeight(4));
  // Expected: "0.4 m"
  
  // Test formatWeight
  console.log('formatWeight(60):', formatWeight(60));
  // Expected: "6.0 kg"
  
  // Test formatStatName
  console.log('formatStatName("special-attack"):', formatStatName("special-attack"));
  // Expected: "Sp. Atk"
  
  // Test getPokemonNumber
  console.log('getPokemonNumber(25):', getPokemonNumber(25));
  // Expected: "#025"