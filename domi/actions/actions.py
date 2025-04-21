from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import random

class ActionFashionResponse(Action):

    def name(self) -> str:
        return "action_fashion_response"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: dict) -> list:
        # Données JSON intégrées directement dans le code
        fashion_data = {
  "fashion": [
    {
      "question": "What colors go well with navy blue?",
      "answer": "Navy blue pairs well with white, beige, camel, blush pink, and mustard yellow."
    },
    {
      "question": "What colors match with olive green?",
      "answer": "Olive green goes well with white, black, beige, rust, and denim blue."
    },
    {
      "question": "Which colors should I wear with beige?",
      "answer": "Beige looks great with white, black, olive, burgundy, and soft blues."
    },
    {
      "question": "What can I wear with a red top?",
      "answer": "Pair a red top with black pants, white skirt, or dark jeans. Accessories in gold or nude work well too."
    },
    {
      "question": "What are good color combos for a summer look?",
      "answer": "Light colors like white, sky blue, coral, mint green, and soft yellow are great for summer."
    },
    {
      "question": "How to match black in a stylish way?",
      "answer": "Black is versatile—match it with white for contrast, with gray for a sleek look, or with bold colors like red or emerald for impact."
    },
    {
      "question": "How to wear pastel colors without looking too soft?",
      "answer": "Balance pastels with neutral tones like gray, beige, or white. You can also add structure with a jacket or jeans."
    },
    {
      "question": "Can I wear brown and black together?",
      "answer": "Yes, brown and black can be paired, especially if the tones are well-chosen (e.g., dark brown with black leather boots or accessories)."
    },
    {
      "question": "What colors go well with light gray?",
      "answer": "Light gray goes well with pastel tones (like baby blue or blush), white, black, and navy blue."
    },
    {
      "question": "How to combine white without making it too plain?",
      "answer": "Mix textures and add accessories. White pairs well with denim, beige, olive, and prints."
    },
    {
      "question": "What to wear with mustard yellow?",
      "answer": "Mustard pairs nicely with navy, olive, burgundy, white, and denim blue."
    },
    {
      "question": "Best color pairings for a romantic date?",
      "answer": "Soft and elegant colors like blush pink, lavender, beige, or wine red combined with neutrals like white or gray are great for dates."
    },
    {
      "question": "Which colors should I avoid mixing?",
      "answer": "Avoid clashing bright colors like red and green (unless it's intentional), or neon mixes unless styled subtly."
    },
    {
      "question": "What colors go with a camel coat?",
      "answer": "Camel goes with white, black, burgundy, navy, and even soft pink or gray."
    },
    {
      "question": "Which colors suit every skin tone?",
      "answer": "Colors like navy blue, blush pink, emerald green, and soft gray are flattering on most skin tones."
    },
      {
          "question": "How to dress for a concert in summer (man) ?",
          "answer": "Shorts (denim), graphic t-shirt, sneakers (white), sunglasses."
      },
      {
          "question": "How to dress for a concert in summer (woman) ?",
          "answer": "Short skirt, crop top, sneakers, light makeup, crossbody bag."
      },
      {
          "question": "How to dress for a museum visit in autumn (man) ?",
          "answer": "Chinos (olive), knit sweater (beige), loafers (brown), scarf (patterned)."
      },
      {
          "question": "How to dress for a museum visit in autumn (woman) ?",
          "answer": "Midi skirt (brown), blouse (cream), ankle boots (tan), trench coat."
      },
      {
          "question": "How to dress for a picnic in spring (man) ?",
          "answer": "Linen shirt (white), beige pants, sneakers, sunglasses."
      },
      {
          "question": "How to dress for a picnic in spring (woman) ?",
          "answer": "Floral sundress, flat sandals, straw hat, minimal jewelry."
      },
      {
          "question": "How to dress for a night out in winter (man) ?",
          "answer": "Dark jeans, button-up shirt, black coat, leather boots."
      },
      {
          "question": "How to dress for a night out in winter (woman) ?",
          "answer": "Black dress, tights, heeled boots, faux fur coat, clutch."
      },
      {
          "question": "How to dress for hiking in spring (man) ?",
          "answer": "Cargo shorts, moisture-wicking t-shirt, hiking boots, cap."
      },
      {
          "question": "How to dress for hiking in spring (woman) ?",
          "answer": "Leggings, tank top, hoodie, hiking shoes, ponytail."
      },
      {
          "question": "How to dress for a casual date in autumn (man) ?",
          "answer": "Dark jeans, flannel shirt, brown boots, light jacket."
      },
      {
          "question": "How to dress for a casual date in autumn (woman) ?",
          "answer": "High-waisted jeans, turtleneck, ankle boots, crossbody bag."
      },
      {
          "question": "How to dress for a family dinner in winter (man) ?",
          "answer": "Wool pants, sweater, collared shirt underneath, warm coat."
      },
      {
          "question": "How to dress for a family dinner in winter (woman) ?",
          "answer": "Midi dress, thick tights, heeled boots, knit cardigan."
      },
      {
          "question": "How to dress for a beach party in summer (man) ?",
          "answer": "Swim shorts, tank top, flip flops, sunglasses."
      },
      {
          "question": "How to dress for a beach party in summer (woman) ?",
          "answer": "Bikini with a cover-up dress, sandals, straw hat."
      },
      {
          "question": "How to dress for a movie night in spring (man) ?",
          "answer": "Slim jeans, casual shirt, sneakers, denim jacket."
      },
      {
          "question": "How to dress for a movie night in spring (woman) ?",
          "answer": "Jeans, cozy sweater, sneakers, tote bag."
      },
      {
          "question": "How to dress for an interview in spring (man) ?",
          "answer": "Beige chinos, light blue shirt, brown shoes, blazer."
      },
      {
          "question": "How to dress for an interview in spring (woman) ?",
          "answer": "Pencil skirt, white blouse, low heels, structured bag."
      },
      {
          "question": "How to dress for a wedding in spring (man)?",
          "answer": "Light gray suit, pastel shirt, brown dress shoes, and a slim tie."
      },
      {
          "question": "How to dress for a wedding in spring (woman)?",
          "answer": "Floral midi dress, nude heels, pearl earrings, and a pastel clutch."
      },
      {
          "question": "How to dress for a beach party in summer (man)?",
          "answer": "Swim shorts, sleeveless tank top, flip-flops, and sunglasses."
      },
      {
          "question": "How to dress for a beach party in summer (woman)?",
          "answer": "Bright bikini with a mesh cover-up, flat sandals, and a straw hat."
      },
      {
          "question": "How to dress for a formal dinner in winter (man)?",
          "answer": "Dark tailored suit, white shirt, black shoes, and a wool coat."
      },
      {
          "question": "How to dress for a formal dinner in winter (woman)?",
          "answer": "Velvet dress, black tights, heeled boots, and a faux fur shawl."
      },
      {
          "question": "How to dress for a movie night in autumn (man)?",
          "answer": "Dark jeans, crewneck sweater, denim jacket, and sneakers."
      },
      {
          "question": "How to dress for a movie night in autumn (woman)?",
          "answer": "High-waisted jeans, oversized cardigan, turtleneck, and ankle boots."
      },
      {
          "question": "How to dress for a picnic in summer (man)?",
          "answer": "Linen shirt, chino shorts, loafers, and a straw hat."
      },
      {
          "question": "How to dress for a picnic in summer (woman)?",
          "answer": "Off-shoulder dress, espadrilles, sun hat, and a crossbody bag."
      },
      {
          "question": "How to dress for a casual walk in spring (man)?",
          "answer": "Joggers, hoodie, trainers, and a light windbreaker."
      },
      {
          "question": "How to dress for a casual walk in spring (woman)?",
          "answer": "Leggings, crop sweatshirt, sneakers, and a cap."
      },
      {
          "question": "How to dress for an outdoor concert in summer (man)?",
          "answer": "Denim shorts, band t-shirt, canvas sneakers, and a bucket hat."
      },
      {
          "question": "How to dress for an outdoor concert in summer (woman)?",
          "answer": "Mini skirt, crop top, chunky sneakers, and layered necklaces."
      },
      {
          "question": "How to dress for a work presentation in winter (man)?",
          "answer": "Charcoal trousers, turtleneck, blazer, and leather shoes."
      },
      {
          "question": "How to dress for a work presentation in winter (woman)?",
          "answer": "Wool pencil skirt, blouse, longline blazer, and heeled loafers."
      },
      {
          "question": "How to dress for a first date in autumn (man)?",
          "answer": "Dark jeans, turtleneck, suede boots, and a leather jacket."
      },
      {
          "question": "How to dress for a first date in autumn (woman)?",
          "answer": "Long-sleeved midi dress, ankle boots, cozy scarf, and a light trench."
      },
      {
          "question": "How to dress for a shopping day in spring (man)?",
          "answer": "Relaxed jeans, breathable t-shirt, sneakers, and a denim jacket."
      },
      {
          "question": "How to dress for a shopping day in spring (woman)?",
          "answer": "High-waisted pants, tank top, slip-on shoes, and a light cardigan."
      },
      {
          "question": "How to dress for traveling in summer (man)?",
          "answer": "Comfortable shorts, loose t-shirt, slip-on sneakers, and a cap."
      },
      {
          "question": "How to dress for traveling in summer (woman)?",
          "answer": "Jogger pants, tank top, comfy sneakers, crossbody bag, and sunglasses."
      },
      {
          "question": "How to dress for a night out in autumn (man)?",
          "answer": "Slim-fit black jeans, button-up shirt, bomber jacket, and boots."
      },
      {
          "question": "How to dress for a night out in autumn (woman)?",
          "answer": "Black mini skirt, long-sleeve top, heeled boots, and a leather jacket."
      },
      {
          "question": "How to dress for a family visit in winter (man)?",
          "answer": "Wool sweater, plaid shirt underneath, corduroy pants, and warm coat."
      },
      {
          "question": "How to dress for a family visit in winter (woman)?",
          "answer": "Long knit dress, thick tights, boots, and a belted coat."
      },
      {
          "question": "How to dress for a morning walk in autumn (man)?",
          "answer": "Track pants, hoodie, running shoes, and a beanie."
      },
      {
          "question": "How to dress for a morning walk in autumn (woman)?",
          "answer": "Leggings, fleece sweatshirt, walking shoes, and a headband."
      },
      {
          "question": "How to dress for a casual dinner in spring (man)?",
          "answer": "Beige chinos, linen shirt, loafers, and a light blazer."
      },
      {
          "question": "How to dress for a casual dinner in spring (woman)?",
          "answer": "Wrap dress, sandals, minimal jewelry, and a denim jacket."
      },
      {
          "question": "How to dress for attending a fashion event in summer (man)?",
          "answer": "Tailored light suit, white t-shirt, leather loafers, and sunglasses."
      },
      {
          "question": "How to dress for attending a fashion event in summer (woman)?",
          "answer": "Chic co-ord set, bold accessories, statement heels, and clutch bag."
      },
      {
          "question": "What are the trending colors in fashion for 2025?",
          "answer": "Trending colors for 2025 include terracotta, digital lavender, ocean blue, olive green, and soft butter yellow."
      },
      {
          "question": "What clothing pieces are a must-have in 2025?",
          "answer": "Must-haves for 2025 include wide-leg trousers, cropped blazers, utility vests, sheer tops, and relaxed-fit denim."
      },
      {
          "question": "Are oversized clothes still in style in 2025?",
          "answer": "Yes, oversized silhouettes remain trendy in 2025, especially in outerwear like trench coats and blazers."
      },
      {
          "question": "What fashion trends are popular for women in 2025?",
          "answer": "Popular trends include soft tailoring, layered neutrals, metallic accents, and flowy skirts with structured tops."
      },
      {
          "question": "What fashion trends are popular for men in 2025?",
          "answer": "Men's fashion in 2025 embraces techwear, cargo trousers, knit polo shirts, earth tones, and minimalist sneakers."
      },
      {
          "question": "What kind of accessories are in style for 2025?",
          "answer": "Bold earrings, micro bags, tinted sunglasses, and layered chains are key accessory trends for 2025."
      },
      {
          "question": "Is denim still fashionable in 2025?",
          "answer": "Absolutely. Denim is evolving in 2025 with wide-leg jeans, long denim skirts, and patchwork jackets leading the trend."
      },
      {
          "question": "Are metallic clothes trending in 2025?",
          "answer": "Yes, metallics like silver and soft gold are trending in statement pieces such as skirts, shoes, and outerwear."
      },
      {
          "question": "Are sustainable fashion brands gaining popularity in 2025?",
          "answer": "Yes, sustainability is more important than ever, with brands focusing on ethical production and eco-friendly materials."
      },
      {
          "question": "What shoes are trending in 2025?",
          "answer": "Chunky loafers, minimalist sneakers, platform sandals, and sleek ankle boots are among the top shoe trends for 2025."
      },
      {
          "question": "What color goes well with black clothes?",
          "answer": "Black pairs well with almost any color. For contrast, try white, beige, or red. For a bold look, go with emerald, gold, or royal blue."
      },
      {
          "question": "What matches well with white clothing?",
          "answer": "White goes well with almost everything—beige, navy, denim, pastels, and even bold colors like red or green."
      },
      {
          "question": "Which colors can I wear with gray?",
          "answer": "Gray pairs well with black, white, soft pink, navy blue, burgundy, and mustard yellow."
      },
      {
          "question": "How do I style blue clothing?",
          "answer": "Blue works great with white, beige, gray, mustard, and brown. Navy blue can also be matched with blush or camel tones."
      },
      {
          "question": "What can I wear with green clothes?",
          "answer": "Green, especially olive or sage, pairs nicely with beige, black, denim blue, and rust. Emerald green looks great with gold or white."
      },
      {
          "question": "What color goes with brown clothing?",
          "answer": "Brown matches well with cream, white, navy blue, burnt orange, and khaki. Lighter browns can be paired with pastels."
      },
      {
          "question": "How to match red clothing?",
          "answer": "Red goes well with black, white, gray, navy, and gold. Avoid mixing it with neon or green unless it's for a bold or seasonal statement."
      },
      {
          "question": "What looks good with beige?",
          "answer": "Beige combines beautifully with white, brown, blush pink, olive green, and soft blue."
      },
      {
          "question": "Which colors work with mustard yellow?",
          "answer": "Mustard yellow pairs well with navy blue, olive green, cream, burgundy, and denim."
      },
      {
          "question": "Can I wear pink with red?",
          "answer": "Yes! Pink and red can create a trendy, bold combination—especially if the shades are complementary, like soft pink with wine red."
      },
      {
          "question": "What colors should I avoid mixing in fashion?",
          "answer": "Avoid clashing brights like neon green and neon pink, or red and green unless it’s intentional (like holiday styling)."
      },
      {
          "question": "How do I wear multiple colors in one outfit?",
          "answer": "Stick to a base neutral (like white, black, or beige), then add one or two accent colors. You can also use a color wheel for harmonious combinations."
      },
      {
          "question": "What are classic color combinations for outfits?",
          "answer": "Classic combos include black and white, navy and beige, gray and burgundy, or camel and cream."
      },
      {
          "question": "How to wear bright colors without overdoing it?",
          "answer": "Pair one bright piece with neutrals. For example, wear a bold top with white pants or a bright skirt with a beige blouse."
      },
      {
          "question": "What are the most popular fashion brands in 2025?",
          "answer": "Some of the most popular fashion brands in 2025 include Gucci, Balenciaga, Louis Vuitton, Prada, Off-White, and Dior. Sustainable brands like Stella McCartney and Patagonia are also trending."
      },
      {
          "question": "Which fashion brands are known for streetwear?",
          "answer": "Brands like Off-White, Supreme, Balenciaga, Nike, Adidas, and A Bathing Ape (BAPE) are famous for streetwear."
      },
      {
          "question": "What are the best luxury fashion brands for women that year?",
          "answer": "Top luxury fashion brands for women include Chanel, Dior, Prada, Gucci, Fendi, and Valentino."
      },
      {
          "question": "Which brands offer affordable but trendy clothes?",
          "answer": "Brands like Zara, H&M, Uniqlo, Mango, and ASOS are known for affordable yet trendy clothing."
      },
      {
          "question": "What are some sustainable fashion brands?",
          "answer": "Popular sustainable fashion brands include Stella McCartney, Patagonia, Reformation, Everlane, and Pangaia."
      },
      {
          "question": "Which brands are trending among Gen Z in 2025?",
          "answer": "Gen Z trends include brands like Urban Outfitters, Skims, Aritzia, Nike, Adidas, and thrifted vintage brands."
      },
      {
          "question": "What are the best fashion brands for men?",
          "answer": "Top men's fashion brands include Ralph Lauren, Hugo Boss, Nike, Zara, Louis Vuitton, and Acne Studios."
      },
      {
          "question": "Which luxury brands are known for their bags?",
          "answer": "Louis Vuitton, Chanel, Hermès, Gucci, and Dior are known for iconic and luxurious handbags."
      },
      {
          "question": "Which fashion brands collaborate with artists or celebrities?",
          "answer": "Adidas x Beyoncé (Ivy Park), Nike x Travis Scott, Dior x Kim Jones, and H&M x Mugler are some examples of brand collaborations."
      },
      {
          "question": "What are some iconic French fashion brands?",
          "answer": "Famous French fashion houses include Chanel, Dior, Givenchy, Yves Saint Laurent, and Louis Vuitton."
      },
      {
          "question": "What type of bag should I carry for a formal event?",
          "answer": "A small clutch or an elegant shoulder bag in neutral or metallic tones works well for formal events."
      },
      {
          "question": "What are the trending handbag styles in 2025?",
          "answer": "Mini bags, bucket bags, quilted shoulder bags, and tote bags with bold logos are trending in 2025."
      },
      {
          "question": "Which bag is best for a casual day out?",
          "answer": "Crossbody bags, canvas totes, or mini backpacks are great for casual outings."
      },
      {
          "question": "What color bag goes with everything?",
          "answer": "Neutral colors like black, beige, gray, or tan are versatile and match most outfits."
      },
      {
          "question": "What type of bag should I wear with a summer dress?",
          "answer": "A straw bag, a woven tote, or a colorful crossbody adds a breezy summer vibe to your outfit."
      },
      {
          "question": "What shoes should I wear with a formal dress?",
          "answer": "Heels like stilettos, strappy sandals, or elegant pumps are ideal with formal dresses."
      },
      {
          "question": "What shoes go well with jeans?",
          "answer": "Sneakers, ankle boots, loafers, or even heels can pair well with jeans depending on the occasion."
      },
      {
          "question": "Which shoes are best for summer outfits?",
          "answer": "Sandals, espadrilles, and lightweight sneakers are great summer choices."
      },
      {
          "question": "Are white sneakers still in fashion in 2025?",
          "answer": "Yes, white sneakers remain a timeless and trendy choice in 2025 for both casual and semi-formal outfits."
      },
      {
          "question": "What kind of boots should I wear in autumn?",
          "answer": "Ankle boots, Chelsea boots, or knee-high leather boots are perfect for autumn looks."
      },
      {
          "question": "What accessories complete a summer look?",
          "answer": "Sunglasses, straw hats, shell jewelry, and colorful bracelets complete a breezy summer look."
      },
      {
          "question": "What jewelry should I wear with a black dress?",
          "answer": "Gold, silver, or statement jewelry can elevate a black dress—choose based on the occasion and your style."
      },
      {
          "question": "Are big earrings in trend this year?",
          "answer": "Yes, bold and oversized earrings are trending in 2025, especially in metallic and colorful designs."
      },
      {
          "question": "What scarf should I wear in autumn?",
          "answer": "Opt for wool or knit scarves in warm colors like burgundy, mustard, or forest green for autumn."
      },
      {
          "question": "What accessories should I wear with a minimalist outfit?",
          "answer": "Minimalist outfits go well with sleek watches, simple necklaces, and structured bags in solid colors."
      }


  ]
}
# Obtenir la question de l'utilisateur
        user_question = tracker.latest_message.get('text')

        # Rechercher la réponse correspondante
        for item in fashion_data['fashion']:
            if item['question'].lower() == user_question.lower():
                # Choisir aléatoirement l'introduction
                introductions = [
                    "Hi, I'm Domi – your personal fashion assistant! 👗 Here's what I'd recommend for you:",
                    "Greetings, I'm Domi – your expert in all things fashion 👠 Here's a look you'll love:"
                ]
                introduction = random.choice(introductions)

                # Envoyer la réponse avec l'introduction
                dispatcher.utter_message(text=introduction)
                dispatcher.utter_message(text=item['answer'])
                return []

            # Si aucune réponse n'est trouvée, envoyer un message d'erreur
        dispatcher.utter_message(text="I'm sorry, I don't have an answer for that question.")
        return []