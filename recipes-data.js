// MANNVASAM Recipe Studio — structured, expandable recipe collection.
// Amounts are stored per 2 servings so the serving calculator can scale them.
const R = (id, name, tamil, category, region, time, ingredients, steps, tip="") => ({
  id, name, tamil, category, region, time, serves: 2, ingredients, steps, tip
});
export const RECIPES = [
R("curd","Curd rice","தயிர் சாதம்","indian-veg","Tamil Nadu","15 min",[
["Cooked rice","cup",1],["Fresh curd","cup",1],["Milk","cup",0.25],["Oil or ghee","tbsp",1],["Mustard seeds","tsp",0.5],["Urad dal","tsp",1],["Green chilli","piece",1],["Grated ginger","tsp",0.5],["Curry leaves","leaf",6],["Salt","to taste",0]
],["Mash the cooled rice lightly. Mix with curd, milk and salt.","Heat oil or ghee. Add mustard seeds and urad dal.","Add chilli, ginger and curry leaves; pour the tempering over the rice.","Rest briefly and serve."],"Use cooled rice and add milk to keep the texture creamy."),
R("lemon","Lemon rice","எலுமிச்சை சாதம்","indian-veg","Tamil Nadu","15 min",[
["Cooked rice","cup",1],["Lemon juice","tbsp",1],["Oil","tbsp",1],["Mustard seeds","tsp",0.5],["Peanuts","tbsp",1],["Chana dal","tsp",1],["Turmeric","tsp",0.25],["Green chilli","piece",1],["Curry leaves","leaf",6],["Salt","to taste",0]
],["Cool the cooked rice so the grains stay separate.","Heat oil; splutter mustard seeds, then add peanuts and chana dal.","Add chilli, curry leaves and turmeric. Turn off the heat.","Fold in rice, salt and lemon juice gently."],"Add lemon juice after switching off the heat."),
R("ven-pongal","Ven pongal","வெண்பொங்கல்","indian-veg","Tamil Nadu","30 min",[
["Raw rice","cup",0.5],["Split moong dal","cup",0.25],["Water","cup",4],["Ghee","tbsp",1],["Black pepper","tsp",1],["Cumin seeds","tsp",1],["Ginger","tsp",1],["Cashews","tbsp",1],["Curry leaves","leaf",6],["Salt","to taste",0]
],["Dry-roast moong dal until fragrant; rinse with rice.","Pressure-cook rice, dal, water and salt until very soft.","Crush pepper and cumin. Heat ghee; fry cashews, ginger and curry leaves.","Stir the tempering into the cooked rice-dal mixture."],"A soft, loose texture is traditional; add hot water if needed."),
R("sakkarai-pongal","Sakkarai pongal","சக்கரைப் பொங்கல்","indian-veg","Tamil Nadu","35 min",[
["Raw rice","cup",0.5],["Split moong dal","tbsp",2],["Jaggery","g",150],["Water","cup",3],["Milk","cup",0.5],["Ghee","tbsp",2],["Cashews","tbsp",1],["Raisins","tbsp",1],["Cardamom","tsp",0.25]
],["Roast moong dal lightly and cook with rice and water until soft.","Melt jaggery with a little water; strain if needed.","Add jaggery syrup and milk to the cooked rice. Simmer until combined.","Fry cashews and raisins in ghee; add with cardamom."],"Adjust jaggery to taste; keep the mixture moist."),
R("tamarind-rice","Puliyodarai","புளியோதரை","indian-veg","Tamil Nadu","35 min",[
["Cooked rice","cup",1],["Tamarind","tbsp",1],["Sesame oil","tbsp",2],["Mustard seeds","tsp",0.5],["Peanuts","tbsp",1],["Chana dal","tsp",1],["Dried red chilli","piece",2],["Turmeric","tsp",0.25],["Curry leaves","leaf",8],["Puliyodarai powder","tbsp",1],["Salt","to taste",0]
],["Soak tamarind in warm water and extract a thick pulp.","Heat sesame oil; temper mustard, dals, peanuts, chillies and curry leaves.","Add turmeric, tamarind extract, powder and salt; simmer until thick.","Cool slightly and mix with rice."],"The tamarind paste should be reduced until glossy before mixing."),
R("tomato-rice","Thakkali sadam","தக்காளி சாதம்","indian-veg","Tamil Nadu","25 min",[
["Cooked rice","cup",1],["Tomatoes","piece",2],["Onion","piece",1],["Oil","tbsp",1],["Mustard seeds","tsp",0.5],["Ginger-garlic paste","tsp",1],["Chilli powder","tsp",0.5],["Turmeric","tsp",0.25],["Curry leaves","leaf",6],["Salt","to taste",0]
],["Heat oil and splutter mustard seeds; add curry leaves and onion.","Add ginger-garlic paste and chopped tomatoes.","Cook until tomatoes soften; add chilli powder, turmeric and salt.","Fold in cooked rice and warm through."],"Use firm, tangy tomatoes for a bright flavor."),
R("kollu-rasam","Kollu rasam","கொள்ளு ரசம்","indian-veg","Tamil Nadu","35 min",[
["Horse gram","cup",0.25],["Water","cup",4],["Tomato","piece",1],["Tamarind","tsp",1],["Garlic","clove",3],["Black pepper","tsp",0.5],["Cumin","tsp",0.5],["Mustard seeds","tsp",0.5],["Curry leaves","leaf",6],["Salt","to taste",0]
],["Rinse horse gram and pressure-cook until tender; reserve the cooking water.","Crush pepper, cumin and garlic coarsely.","Simmer tomato, tamarind water, salt and horse-gram broth.","Temper mustard and curry leaves; add crushed spices and pour into rasam."],"Cook horse gram thoroughly; the broth gives the rasam its depth."),
R("milagu-rasam","Milagu rasam","மிளகு ரசம்","indian-veg","Tamil Nadu","20 min",[
["Tamarind","tbsp",1],["Water","cup",3],["Tomato","piece",1],["Black pepper","tsp",1],["Cumin","tsp",1],["Garlic","clove",2],["Mustard seeds","tsp",0.5],["Ghee","tsp",1],["Curry leaves","leaf",6],["Salt","to taste",0]
],["Soak tamarind and extract the water; add tomato and salt.","Crush pepper, cumin and garlic.","Simmer tamarind water until the raw smell fades; add crushed spices.","Temper mustard and curry leaves in ghee and finish the rasam."],"Do not boil vigorously after adding the spice mix."),
R("ragi-kali","Ragi kali","கேழ்வரகு களி","indian-veg","Tamil Nadu","25 min",[
["Ragi flour","cup",0.5],["Water","cup",2],["Salt","tsp",0.25],["Cooked rice","tbsp",2]
],["Bring salted water to a boil; whisk in a little ragi flour slurry.","Add remaining flour gradually, stirring continuously.","Cook on low heat until thick and glossy.","Shape into balls with wet hands and serve with kuzhambu."],"Keep stirring to avoid lumps; serve hot."),
R("kambu-koozh","Kambu koozh","கம்பங்கூழ்","indian-veg","Tamil Nadu","overnight + 25 min",[
["Pearl millet flour","cup",0.5],["Water","cup",3],["Cooked rice","tbsp",2],["Curd","cup",0.5],["Salt","to taste",0],["Small onion","piece",4]
],["Mix millet flour with water into a smooth slurry.","Cook on low heat, stirring, until thick and fully cooked.","Cool completely; mix in cooked rice and ferment covered overnight.","Whisk with curd, salt and water to a drinkable consistency; serve with onions."],"Fermentation time varies with room temperature."),
R("adai","Adai","அடை","indian-veg","Tamil Nadu","40 min",[
["Raw rice","cup",0.5],["Toor dal","tbsp",2],["Chana dal","tbsp",2],["Urad dal","tbsp",1],["Dried red chilli","piece",2],["Fennel seeds","tsp",0.5],["Onion","piece",0.5],["Curry leaves","leaf",6],["Oil","tbsp",2],["Salt","to taste",0]
],["Soak rice and dals for 3 hours; drain.","Grind coarsely with chillies, fennel and salt.","Mix in chopped onion and curry leaves.","Spread a thick dosa on a hot pan; drizzle oil and cook both sides."],"Adai batter is intentionally coarse and need not ferment."),
R("keerai-masiyal","Keerai masiyal","கீரை மசியல்","indian-veg","Tamil Nadu","25 min",[
["Amaranth or spinach","g",250],["Moong dal","tbsp",2],["Garlic","clove",3],["Green chilli","piece",1],["Cumin","tsp",0.5],["Mustard seeds","tsp",0.5],["Oil","tsp",2],["Salt","to taste",0]
],["Wash and chop greens. Cook moong dal until soft.","Cook greens with garlic, chilli and a splash of water until tender.","Mash greens and dal together; season with salt.","Temper mustard and cumin in oil and pour over the mash."],"Use any tender local keerai variety."),
R("avial","Avial","அவியல்","indian-veg","Tamil Nadu / Kerala","35 min",[
["Mixed vegetables","g",300],["Grated coconut","cup",0.5],["Green chilli","piece",2],["Cumin","tsp",0.5],["Curd","cup",0.25],["Coconut oil","tbsp",1],["Curry leaves","leaf",8],["Turmeric","tsp",0.25],["Salt","to taste",0]
],["Cut vegetables into long pieces and cook with turmeric, salt and little water.","Grind coconut, green chilli and cumin coarsely.","Add the coconut paste and simmer until vegetables are tender.","Turn off heat; fold in curd, coconut oil and curry leaves."],"Avoid overcooking; vegetables should hold their shape."),
R("idli","Idli","இட்லி","indian-veg","Tamil Nadu","overnight + 15 min",[
["Idli rice","cup",1],["Whole urad dal","cup",0.25],["Fenugreek seeds","tsp",0.25],["Salt","to taste",0],["Water","as needed",0]
],["Soak rice separately from urad dal and fenugreek for 4–6 hours.","Grind dal fluffy and rice slightly coarse; combine with salt.","Ferment covered until risen, usually 8–12 hours depending on temperature.","Pour into greased idli moulds and steam for 10–12 minutes."],"Fermentation time depends on climate; batter should smell pleasantly fermented."),
R("dosai","Plain dosa","தோசை","indian-veg","Tamil Nadu","overnight + 20 min",[
["Idli rice","cup",1],["Whole urad dal","cup",0.25],["Fenugreek seeds","tsp",0.25],["Salt","to taste",0],["Oil","tbsp",1]
],["Soak rice, dal and fenugreek separately for 4–6 hours.","Grind smooth, combine and ferment until airy.","Add salt and adjust batter to pouring consistency.","Spread thinly on a hot greased tawa; cook until crisp."],"A well-seasoned, hot tawa helps create an even dosa."),
R("egg-kuzhambu","Muttai kuzhambu","முட்டைக் குழம்பு","indian-nonveg","Tamil Nadu","35 min",[
["Eggs","piece",2],["Onion","piece",1],["Tomato","piece",1],["Tamarind","tbsp",1],["Coconut","tbsp",2],["Chilli powder","tsp",1],["Coriander powder","tsp",1],["Fennel seeds","tsp",0.5],["Oil","tbsp",2],["Salt","to taste",0]
],["Boil eggs, cool, peel and make small slits.","Saute onion and tomato in oil; add spice powders.","Add tamarind water and simmer until the raw smell fades.","Grind coconut with fennel, add and simmer; add eggs and cook gently."],"Keep the eggs intact and simmer gently."),
R("chettinad-chicken","Chettinad chicken curry","செட்டிநாடு சிக்கன் குழம்பு","indian-nonveg","Chettinad, Tamil Nadu","50 min",[
["Chicken","g",400],["Onion","piece",1],["Tomato","piece",1],["Ginger-garlic paste","tbsp",1],["Coconut","tbsp",3],["Fennel seeds","tsp",1],["Black pepper","tsp",1],["Coriander seeds","tbsp",1],["Dried red chilli","piece",3],["Oil","tbsp",2],["Salt","to taste",0]
],["Dry-roast coriander, pepper, fennel and chillies; grind with coconut.","Saute onion, then ginger-garlic paste and tomato.","Add chicken and salt; sear until coated.","Add ground masala and water; cover and cook until chicken reaches a safe, fully cooked state."],"Cook poultry thoroughly; avoid cross-contamination with raw chicken."),
R("fish-kuzhambu","Meen kuzhambu","மீன் குழம்பு","indian-nonveg","Tamil Nadu","40 min",[
["Firm fish pieces","g",350],["Tamarind","tbsp",2],["Shallots","g",100],["Tomato","piece",1],["Garlic","clove",5],["Chilli powder","tsp",1],["Coriander powder","tsp",2],["Fenugreek seeds","tsp",0.25],["Sesame oil","tbsp",2],["Salt","to taste",0]
],["Extract thick tamarind water; prepare shallots, tomato and garlic.","Heat sesame oil; temper fenugreek and saute shallots and garlic.","Add tomato, spice powders, tamarind water and salt; simmer until glossy.","Slide in fish pieces and cook gently until opaque and flaky."],"Do not stir vigorously after adding fish; shake the pan gently."),
R("meen-varuval","Fish fry","மீன் வறுவல்","indian-nonveg","Tamil Nadu","25 min",[
["Fish steaks","g",350],["Chilli powder","tsp",1],["Turmeric","tsp",0.25],["Ginger-garlic paste","tsp",1],["Lemon juice","tsp",2],["Rice flour","tbsp",1],["Oil","tbsp",3],["Salt","to taste",0]
],["Mix chilli, turmeric, ginger-garlic, lemon, rice flour and salt.","Coat fish and rest in the refrigerator for 15–20 minutes.","Shallow-fry over medium heat until cooked through and crisp on both sides.","Drain briefly and serve with lemon."],"Keep raw fish separate from ready-to-eat foods."),
R("mutton-chukka","Mutton chukka","மட்டன் சுக்கா","indian-nonveg","Tamil Nadu","70 min",[
["Mutton","g",400],["Shallots","g",100],["Ginger-garlic paste","tbsp",1],["Black pepper","tsp",1],["Fennel seeds","tsp",1],["Curry leaves","leaf",10],["Chilli powder","tsp",0.5],["Oil","tbsp",2],["Salt","to taste",0]
],["Pressure-cook mutton with salt and a little water until tender.","Saute shallots, curry leaves, fennel and ginger-garlic in oil.","Add chilli powder, pepper and cooked mutton with a little stock.","Roast on medium heat until the masala clings and the edges are dry."],"Pressure-cook until tender; cooking time depends on the cut."),
R("prawn-thokku","Eral thokku","இறால் தொக்கு","indian-nonveg","Tamil Nadu","30 min",[
["Cleaned prawns","g",300],["Onion","piece",1],["Tomato","piece",1],["Ginger-garlic paste","tsp",2],["Chilli powder","tsp",1],["Coriander powder","tsp",1],["Fennel seeds","tsp",0.5],["Oil","tbsp",2],["Curry leaves","leaf",6],["Salt","to taste",0]
],["Saute fennel, curry leaves and onion in oil.","Add ginger-garlic paste and tomato; cook until soft.","Add spice powders and salt; add prawns and toss to coat.","Cook just until prawns are opaque and firm; reduce the masala."],"Prawns cook quickly; avoid overcooking."),
R("world-pasta","Tomato basil pasta","தக்காளி பாஸ்தா","world","Italy","30 min",[
["Pasta","g",180],["Tomatoes","g",250],["Garlic","clove",3],["Olive oil","tbsp",1],["Basil leaves","leaf",8],["Parmesan (optional)","tbsp",2],["Salt","to taste",0],["Black pepper","to taste",0]
],["Boil pasta in salted water until just al dente; reserve a little pasta water.","Saute garlic in olive oil; add chopped tomatoes and simmer into a sauce.","Toss pasta with sauce and a splash of pasta water.","Finish with basil, pepper and optional cheese."],"Check the pasta packet for its exact cooking time."),
R("world-fried-rice","Vegetable fried rice","வெஜிடபிள் ஃப்ரைடு ரைஸ்","world","China-inspired","25 min",[
["Cooked cold rice","cup",2],["Mixed vegetables","cup",1],["Spring onion","stalk",2],["Garlic","clove",2],["Soy sauce","tbsp",1],["Sesame oil","tsp",1],["Neutral oil","tbsp",1],["Pepper","tsp",0.25]
],["Use chilled rice with separated grains.","Heat a wok very hot; add oil, garlic and vegetables.","Add rice and toss quickly over high heat.","Season with soy sauce, pepper and sesame oil; finish with spring onion."],"Cold, dry rice gives the best texture."),
R("world-tacos","Bean and corn tacos","பீன் டாக்கோஸ்","world","Mexico","25 min",[
["Tortillas","piece",4],["Cooked beans","cup",1],["Sweet corn","cup",0.5],["Tomato","piece",1],["Lime","piece",1],["Cumin powder","tsp",0.5],["Avocado","piece",0.5],["Coriander leaves","tbsp",1]
],["Warm beans and corn with cumin and a splash of water.","Chop tomato and avocado; season with lime and coriander.","Warm tortillas in a dry pan.","Fill tortillas with beans, corn and fresh toppings."],"Keep fillings separate until serving so tortillas stay warm."),
R("world-thai-curry","Thai-style vegetable coconut curry","தாய் தேங்காய் கறி","world","Thailand-inspired","35 min",[
["Mixed vegetables","g",300],["Coconut milk","ml",250],["Thai curry paste","tbsp",1],["Oil","tbsp",1],["Soy sauce","tsp",1],["Lime juice","tsp",2],["Basil leaves","leaf",6],["Cooked rice","cup",1]
],["Saute curry paste in oil until fragrant.","Add firm vegetables and stir to coat.","Pour in coconut milk and simmer until vegetables are tender.","Season with soy sauce and lime; finish with basil and serve with rice."],"Check curry paste ingredients for allergens and heat level."),
R("world-hummus","Classic hummus","ஹம்மஸ்","world","Middle East","15 min",[
["Cooked chickpeas","cup",1],["Tahini","tbsp",2],["Lemon juice","tbsp",1],["Garlic","clove",1],["Olive oil","tbsp",1],["Cumin","tsp",0.25],["Water","tbsp",2],["Salt","to taste",0]
],["Blend chickpeas, tahini, lemon, garlic, cumin and salt.","Add cold water gradually until smooth.","Spoon into a bowl and swirl the surface.","Finish with olive oil and serve with vegetables or flatbread."],"Blend longer for a smoother texture."),
R("world-pancakes","Fluffy pancakes","பான்கேக்","world","United States","20 min",[
["All-purpose flour","cup",1],["Milk","cup",0.75],["Egg","piece",1],["Baking powder","tsp",1],["Sugar","tbsp",1],["Melted butter","tbsp",1],["Salt","pinch",1]
],["Whisk flour, baking powder, sugar and salt.","Whisk milk, egg and melted butter separately; combine gently.","Pour small rounds onto a lightly greased medium-hot pan.","Flip when bubbles appear; cook until golden on both sides."],"Do not overmix; a few small lumps are fine."),
R("world-vegetable-soup","Roasted vegetable soup","காய்கறி சூப்","world","European-inspired","40 min",[
["Mixed vegetables","g",350],["Onion","piece",1],["Garlic","clove",2],["Vegetable stock","ml",500],["Olive oil","tbsp",1],["Black pepper","tsp",0.25],["Salt","to taste",0]
],["Chop vegetables and toss with olive oil.","Roast until tender and lightly browned.","Simmer roasted vegetables with stock, onion and garlic.","Blend until smooth; season with pepper and salt."],"Cool slightly before blending hot liquids; follow blender safety guidance."),
R("coconut-rice","Thengai sadam","தேங்காய் சாதம்","indian-veg","Tamil Nadu","20 min",[
["Cooked rice","cup",1],["Grated coconut","cup",0.5],["Coconut oil","tbsp",1],["Mustard seeds","tsp",0.5],["Urad dal","tsp",1],["Dried red chilli","piece",1],["Cashews","tbsp",1],["Curry leaves","leaf",6],["Salt","to taste",0]
],["Cool cooked rice and separate the grains.","Heat coconut oil; temper mustard, urad dal, chilli and cashews.","Add curry leaves and grated coconut; saute briefly without browning.","Fold in rice and salt; warm gently."],"Fresh coconut gives the best aroma."),
R("sesame-rice","Ellu sadam","எள்ளு சாதம்","indian-veg","Tamil Nadu","25 min",[
["Cooked rice","cup",1],["White or black sesame","tbsp",2],["Dried red chilli","piece",2],["Urad dal","tbsp",1],["Chana dal","tbsp",1],["Sesame oil","tbsp",1],["Mustard seeds","tsp",0.5],["Salt","to taste",0]
],["Dry-roast sesame seeds until fragrant; cool.","Roast dals and chillies; grind with sesame to a coarse powder.","Temper mustard in sesame oil.","Mix the powder and tempering through cooled rice; season with salt."],"Do not over-roast sesame; it can turn bitter."),
R("mint-rice","Pudina rice","புதினா சாதம்","indian-veg","Tamil Nadu","25 min",[
["Cooked rice","cup",1],["Mint leaves","cup",1],["Coriander leaves","cup",0.25],["Green chilli","piece",1],["Onion","piece",0.5],["Ginger","tsp",1],["Oil","tbsp",1],["Mustard seeds","tsp",0.5],["Salt","to taste",0]
],["Blend mint, coriander, chilli and ginger with a little water.","Temper mustard and saute onion until soft.","Add the herb paste and cook until fragrant and moisture reduces.","Fold in rice and salt; mix gently."],"Use fresh mint and avoid cooking the paste for too long."),
R("vegetable-biryani","Vegetable biryani","காய்கறி பிரியாணி","indian-veg","South India","45 min",[
["Basmati rice","cup",1],["Mixed vegetables","g",200],["Onion","piece",1],["Tomato","piece",1],["Yogurt","tbsp",2],["Ginger-garlic paste","tbsp",1],["Biryani masala","tsp",1],["Mint leaves","tbsp",2],["Oil or ghee","tbsp",2],["Water","cup",1.5],["Salt","to taste",0]
],["Rinse and soak rice for 20 minutes; drain.","Saute onion, ginger-garlic, tomato and vegetables with spices.","Add yogurt, mint, rice, water and salt.","Cover and cook on low until rice is tender; rest before fluffing."],"Water quantity varies by rice; follow the rice variety's cooking needs."),
R("world-chicken-stirfry","Ginger chicken stir-fry","இஞ்சி சிக்கன் ஸ்டிர் ஃப்ரை","world","East Asian-inspired","25 min",[
["Boneless chicken","g",300],["Bell pepper","piece",1],["Onion","piece",0.5],["Fresh ginger","tbsp",1],["Garlic","clove",2],["Soy sauce","tbsp",1],["Neutral oil","tbsp",1],["Cornflour","tsp",1],["Water","tbsp",2]
],["Slice chicken and vegetables evenly; mix cornflour with water.","Stir-fry chicken in a hot pan until fully cooked through; set aside.","Cook ginger, garlic, onion and pepper briefly.","Return chicken, add soy sauce and cornflour slurry; toss until glossy."],"Cook chicken thoroughly and use separate utensils for raw poultry.")
];
