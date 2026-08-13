export const articlePracticeData = [
  // Nominative
  {
    id: 1,
    prefix: "Wo ist ",
    answer: "der",
    suffix: " Bahnhof?",
    noun: "Bahnhof",
    gender: "der",
    caseRequired: "Nominative",
    explanation: "The verb 'sein' (ist) takes the nominative case. 'Bahnhof' is masculine, so the article is 'der'."
  },
  {
    id: 2,
    prefix: "Hier steht ",
    answer: "ein",
    suffix: " Auto.",
    noun: "Auto",
    gender: "das",
    caseRequired: "Nominative",
    explanation: "The subject of the sentence ('Auto') is in the nominative case. 'Auto' is neuter, so the indefinite article is 'ein'."
  },
  {
    id: 3,
    prefix: "",
    answer: "Die",
    suffix: " Frau liest ein Buch.",
    noun: "Frau",
    gender: "die",
    caseRequired: "Nominative",
    explanation: "The subject of the sentence is in the nominative case. 'Frau' is feminine, so the definite article is 'Die'."
  },

  // Accusative
  {
    id: 4,
    prefix: "Ich habe ",
    answer: "einen",
    suffix: " Hund.",
    noun: "Hund",
    gender: "der",
    caseRequired: "Accusative",
    explanation: "The verb 'haben' always takes a direct object in the accusative case. Since 'Hund' is masculine, 'ein' becomes 'einen'."
  },
  {
    id: 5,
    prefix: "Wir kaufen ",
    answer: "den",
    suffix: " Tisch.",
    noun: "Tisch",
    gender: "der",
    caseRequired: "Accusative",
    explanation: "'kaufen' takes an accusative object. 'Tisch' is masculine, so the definite article 'der' becomes 'den'."
  },
  {
    id: 6,
    prefix: "Sie sucht ",
    answer: "die",
    suffix: " Katze.",
    noun: "Katze",
    gender: "die",
    caseRequired: "Accusative",
    explanation: "Feminine nouns do not change their definite article in the accusative case. It remains 'die'."
  },
  {
    id: 7,
    prefix: "Er trinkt ",
    answer: "ein",
    suffix: " Bier.",
    noun: "Bier",
    gender: "das",
    caseRequired: "Accusative",
    explanation: "Neuter nouns do not change their indefinite article in the accusative case. It remains 'ein'."
  },
  {
    id: 8,
    prefix: "Dieses Geschenk ist für ",
    answer: "den",
    suffix: " Mann.",
    noun: "Mann",
    gender: "der",
    caseRequired: "Accusative",
    explanation: "The preposition 'für' ALWAYS requires the accusative case. 'Mann' is masculine, so the article is 'den'."
  },

  // Dative
  {
    id: 9,
    prefix: "Ich helfe ",
    answer: "dem",
    suffix: " Kind.",
    noun: "Kind",
    gender: "das",
    caseRequired: "Dative",
    explanation: "The verb 'helfen' always requires the dative case. 'Kind' is neuter, so 'das' becomes 'dem' in the dative."
  },
  {
    id: 10,
    prefix: "Das Buch gehört ",
    answer: "der",
    suffix: " Lehrerin.",
    noun: "Lehrerin",
    gender: "die",
    caseRequired: "Dative",
    explanation: "The verb 'gehören' requires the dative case. 'Lehrerin' is feminine, so 'die' becomes 'der' in the dative."
  },
  {
    id: 11,
    prefix: "Wir fahren mit ",
    answer: "dem",
    suffix: " Zug.",
    noun: "Zug",
    gender: "der",
    caseRequired: "Dative",
    explanation: "The preposition 'mit' ALWAYS requires the dative case. 'Zug' is masculine, so 'der' becomes 'dem'."
  },
  {
    id: 12,
    prefix: "Er wohnt bei ",
    answer: "einem",
    suffix: " Freund.",
    noun: "Freund",
    gender: "der",
    caseRequired: "Dative",
    explanation: "The preposition 'bei' ALWAYS requires the dative case. Masculine nouns take the ending '-em' with indefinite articles ('einem')."
  },
  {
    id: 13,
    prefix: "Wie geht es ",
    answer: "den",
    suffix: " Kindern?",
    noun: "Kinder",
    gender: "plural",
    caseRequired: "Dative",
    explanation: "The phrase 'Wie geht es...' requires the dative. For plural nouns in dative, the article is 'den' (and an '-n' is added to the noun)."
  },

  // Two-Way Prepositions
  {
    id: 14,
    prefix: "Ich lege das Buch auf ",
    answer: "den",
    suffix: " Tisch.",
    noun: "Tisch",
    gender: "der",
    caseRequired: "Accusative",
    explanation: "'auf' is a two-way preposition. Because there is movement/action towards a destination (legen), we use Accusative. 'Tisch' is masculine, so 'den'."
  },
  {
    id: 15,
    prefix: "Das Buch liegt auf ",
    answer: "dem",
    suffix: " Tisch.",
    noun: "Tisch",
    gender: "der",
    caseRequired: "Dative",
    explanation: "'auf' is a two-way preposition. Because this describes a static location (liegen), we use Dative. 'Tisch' is masculine, so 'dem'."
  },
  {
    id: 16,
    prefix: "Wir gehen in ",
    answer: "die",
    suffix: " Schule.",
    noun: "Schule",
    gender: "die",
    caseRequired: "Accusative",
    explanation: "'in' is a two-way preposition. 'Gehen' implies movement to a destination, so it takes Accusative. Feminine remains 'die'."
  },
  {
    id: 17,
    prefix: "Wir lernen in ",
    answer: "der",
    suffix: " Schule.",
    noun: "Schule",
    gender: "die",
    caseRequired: "Dative",
    explanation: "'in' is a two-way preposition. 'Lernen' happens at a static location, so it takes Dative. Feminine 'die' becomes 'der' in the dative."
  },
  {
    id: 18,
    prefix: "",
    answer: "Der",
    suffix: " Apfel ist rot.",
    noun: "Apfel",
    gender: "der",
    caseRequired: "Nominative",
    explanation: "'Apfel' is the subject of the sentence, so it is in the nominative case. Since it's masculine, the article is 'Der'."
  },
  {
    id: 19,
    prefix: "Ist das ",
    answer: "eine",
    suffix: " Katze?",
    noun: "Katze",
    gender: "die",
    caseRequired: "Nominative",
    explanation: "The verb 'sein' (ist) links two nominative nouns. 'Katze' is feminine, so the indefinite article is 'eine'."
  },
  {
    id: 20,
    prefix: "",
    answer: "Das",
    suffix: " Mädchen spielt im Garten.",
    noun: "Mädchen",
    gender: "das",
    caseRequired: "Nominative",
    explanation: "'Mädchen' is the subject (nominative). Even though it refers to a girl, the diminutive suffix '-chen' always makes nouns neuter ('das')."
  },
  {
    id: 21,
    prefix: "Ich esse ",
    answer: "den",
    suffix: " Apfel.",
    noun: "Apfel",
    gender: "der",
    caseRequired: "Accusative",
    explanation: "The verb 'essen' takes a direct object (accusative). 'Apfel' is masculine, so 'der' changes to 'den'."
  },
  {
    id: 22,
    prefix: "Wir sehen ",
    answer: "einen",
    suffix: " Film.",
    noun: "Film",
    gender: "der",
    caseRequired: "Accusative",
    explanation: "'sehen' requires the accusative case. 'Film' is masculine, so the indefinite article is 'einen'."
  },
  {
    id: 23,
    prefix: "Sie schreibt ",
    answer: "einen",
    suffix: " Brief.",
    noun: "Brief",
    gender: "der",
    caseRequired: "Accusative",
    explanation: "'schreiben' takes a direct object (accusative). 'Brief' is masculine, so 'einen'."
  },
  {
    id: 24,
    prefix: "Ich trinke Kaffee ohne ",
    answer: "die",
    suffix: " Milch.",
    noun: "Milch",
    gender: "die",
    caseRequired: "Accusative",
    explanation: "The preposition 'ohne' ALWAYS requires the accusative case. Feminine nouns ('die') stay 'die'."
  },
  {
    id: 25,
    prefix: "Wir spazieren durch ",
    answer: "den",
    suffix: " Park.",
    noun: "Park",
    gender: "der",
    caseRequired: "Accusative",
    explanation: "The preposition 'durch' ALWAYS requires the accusative case. 'Park' is masculine, so 'den'."
  },
  {
    id: 26,
    prefix: "Das Meeting beginnt um ",
    answer: "ein",
    suffix: " Uhr.",
    noun: "Uhr",
    gender: "die",
    caseRequired: "Accusative",
    explanation: "In time phrases like 'um ein Uhr', 'um' always takes the accusative. However, in telling time, the number 'ein' is uninflected."
  },
  {
    id: 27,
    prefix: "Ich antworte ",
    answer: "dem",
    suffix: " Lehrer.",
    noun: "Lehrer",
    gender: "der",
    caseRequired: "Dative",
    explanation: "The verb 'antworten' always requires the dative case. 'Lehrer' is masculine, so 'der' becomes 'dem'."
  },
  {
    id: 28,
    prefix: "Das Auto gefällt ",
    answer: "der",
    suffix: " Frau.",
    noun: "Frau",
    gender: "die",
    caseRequired: "Dative",
    explanation: "The verb 'gefallen' (to be pleasing to) requires the dative case. Feminine 'die' becomes 'der' in the dative."
  },
  {
    id: 29,
    prefix: "Er kommt aus ",
    answer: "der",
    suffix: " Schweiz.",
    noun: "Schweiz",
    gender: "die",
    caseRequired: "Dative",
    explanation: "The preposition 'aus' ALWAYS requires the dative case. 'Schweiz' is a feminine country, so 'die' changes to 'der'."
  },
  {
    id: 30,
    prefix: "Ich spreche mit ",
    answer: "einem",
    suffix: " Freund.",
    noun: "Freund",
    gender: "der",
    caseRequired: "Dative",
    explanation: "The preposition 'mit' ALWAYS requires the dative case. Masculine indefinite in dative is 'einem'."
  },
  {
    id: 31,
    prefix: "Nach ",
    answer: "der",
    suffix: " Arbeit gehe ich einkaufen.",
    noun: "Arbeit",
    gender: "die",
    caseRequired: "Dative",
    explanation: "The preposition 'nach' ALWAYS requires the dative case. 'Arbeit' is feminine, so 'die' becomes 'der'."
  },
  {
    id: 32,
    prefix: "Das Geschenk ist von ",
    answer: "einem",
    suffix: " Kollegen.",
    noun: "Kollege",
    gender: "der",
    caseRequired: "Dative",
    explanation: "The preposition 'von' ALWAYS requires the dative. 'Kollege' is masculine, so indefinite is 'einem' (and Kollege is an n-noun, hence Kollegen)."
  },
  {
    id: 33,
    prefix: "Ich gratuliere ",
    answer: "dem",
    suffix: " Gewinner.",
    noun: "Gewinner",
    gender: "der",
    caseRequired: "Dative",
    explanation: "The verb 'gratulieren' requires the dative case. 'Gewinner' is masculine, so 'dem'."
  },
  {
    id: 34,
    prefix: "Die Suppe schmeckt ",
    answer: "dem",
    suffix: " Kind.",
    noun: "Kind",
    gender: "das",
    caseRequired: "Dative",
    explanation: "The verb 'schmecken' (to taste good to someone) requires the dative case. 'Kind' is neuter, so 'das' becomes 'dem'."
  },
  {
    id: 35,
    prefix: "Der Hund läuft hinter ",
    answer: "das",
    suffix: " Haus.",
    noun: "Haus",
    gender: "das",
    caseRequired: "Accusative",
    explanation: "'hinter' is a two-way preposition. 'Laufen' shows movement to a destination, so it takes Accusative. Neuter remains 'das'."
  },
  {
    id: 36,
    prefix: "Der Hund schläft hinter ",
    answer: "dem",
    suffix: " Haus.",
    noun: "Haus",
    gender: "das",
    caseRequired: "Dative",
    explanation: "'hinter' is a two-way preposition. 'Schlafen' describes a static location, so it takes Dative. Neuter 'das' becomes 'dem'."
  },
  {
    id: 37,
    prefix: "Ich hänge das Bild an ",
    answer: "die",
    suffix: " Wand.",
    noun: "Wand",
    gender: "die",
    caseRequired: "Accusative",
    explanation: "'an' is a two-way preposition. The action of hanging (hängen) moves the picture to a destination, so it's Accusative. Feminine remains 'die'."
  },
  {
    id: 38,
    prefix: "Das Bild hängt an ",
    answer: "der",
    suffix: " Wand.",
    noun: "Wand",
    gender: "die",
    caseRequired: "Dative",
    explanation: "'an' is a two-way preposition. The picture is already hanging there (static location), so it's Dative. Feminine 'die' becomes 'der'."
  },
  {
    id: 39,
    prefix: "Das Flugzeug fliegt über ",
    answer: "die",
    suffix: " Wolken.",
    noun: "Wolken",
    gender: "plural",
    caseRequired: "Accusative",
    explanation: "'über' is a two-way preposition. The plane is moving across/over them (path), which takes Accusative. Plural 'die' remains 'die'."
  },
  {
    id: 40,
    prefix: "Die Lampe hängt über ",
    answer: "dem",
    suffix: " Tisch.",
    noun: "Tisch",
    gender: "der",
    caseRequired: "Dative",
    explanation: "'über' is a two-way preposition. The lamp is hanging statically, so it's Dative. Masculine 'der' becomes 'dem'."
  },
  {
    id: 41,
    prefix: "Er stellt sich neben ",
    answer: "den",
    suffix: " Stuhl.",
    noun: "Stuhl",
    gender: "der",
    caseRequired: "Accusative",
    explanation: "'neben' is a two-way preposition. 'Sich stellen' means to position oneself (movement), so Accusative. Masculine becomes 'den'."
  },
  {
    id: 42,
    prefix: "Er steht neben ",
    answer: "dem",
    suffix: " Stuhl.",
    noun: "Stuhl",
    gender: "der",
    caseRequired: "Dative",
    explanation: "'neben' is a two-way preposition. 'Stehen' means to stand (static location), so Dative. Masculine 'der' becomes 'dem'."
  },
  {
    id: 43,
    prefix: "Hast du ",
    answer: "einen",
    suffix: " Moment?",
    noun: "Moment",
    gender: "der",
    caseRequired: "Accusative",
    explanation: "'haben' requires an accusative object. 'Moment' is masculine, so the indefinite article is 'einen'."
  },
  {
    id: 44,
    prefix: "Wer ist ",
    answer: "der",
    suffix: " Mann dort?",
    noun: "Mann",
    gender: "der",
    caseRequired: "Nominative",
    explanation: "The verb 'sein' (ist) links two nominative nouns. 'Mann' is the subject here, so 'der'."
  },
  {
    id: 45,
    prefix: "Wir kaufen ",
    answer: "eine",
    suffix: " Blume.",
    noun: "Blume",
    gender: "die",
    caseRequired: "Accusative",
    explanation: "'kaufen' takes a direct object (accusative). 'Blume' is feminine, so 'eine'."
  },
  {
    id: 46,
    prefix: "",
    answer: "Ein",
    suffix: " Baum wächst schnell.",
    noun: "Baum",
    gender: "der",
    caseRequired: "Nominative",
    explanation: "The subject of the sentence ('Baum') is in the nominative case. 'Baum' is masculine, so 'Ein'."
  },
  {
    id: 47,
    prefix: "Ich gehe zu ",
    answer: "einem",
    suffix: " Arzt.",
    noun: "Arzt",
    gender: "der",
    caseRequired: "Dative",
    explanation: "The preposition 'zu' ALWAYS requires the dative case. 'Arzt' is masculine, so indefinite is 'einem'."
  },
  {
    id: 48,
    prefix: "",
    answer: "Der",
    suffix: " Vater liest ein Buch.",
    noun: "Vater",
    gender: "der",
    caseRequired: "Nominative",
    explanation: "'Vater' is the subject of the sentence, doing the action. It's masculine, so 'Der'."
  },
  {
    id: 49,
    prefix: "",
    answer: "Die",
    suffix: " Mutter kocht das Essen.",
    noun: "Mutter",
    gender: "die",
    caseRequired: "Nominative",
    explanation: "'Mutter' is the subject. It's feminine, so 'Die'."
  },
  {
    id: 50,
    prefix: "",
    answer: "Das",
    suffix: " Zimmer ist sehr groß.",
    noun: "Zimmer",
    gender: "das",
    caseRequired: "Nominative",
    explanation: "The verb 'sein' (ist) links nominative nouns. 'Zimmer' is neuter, so 'Das'."
  },
  {
    id: 51,
    prefix: "",
    answer: "Ein",
    suffix: " Schlüssel liegt auf dem Tisch.",
    noun: "Schlüssel",
    gender: "der",
    caseRequired: "Nominative",
    explanation: "The 'Schlüssel' is the subject doing the lying (liegen). It's masculine, so the indefinite article is 'Ein'."
  },
  {
    id: 52,
    prefix: "Ich öffne ",
    answer: "das",
    suffix: " Fenster.",
    noun: "Fenster",
    gender: "das",
    caseRequired: "Accusative",
    explanation: "The verb 'öffnen' takes a direct object (accusative). 'Fenster' is neuter, so it remains 'das'."
  },
  {
    id: 53,
    prefix: "Er schließt ",
    answer: "die",
    suffix: " Tür.",
    noun: "Tür",
    gender: "die",
    caseRequired: "Accusative",
    explanation: "The verb 'schließen' takes an accusative object. 'Tür' is feminine, so it remains 'die'."
  },
  {
    id: 54,
    prefix: "Hast du ",
    answer: "einen",
    suffix: " Stift?",
    noun: "Stift",
    gender: "der",
    caseRequired: "Accusative",
    explanation: "'haben' requires an accusative object. 'Stift' (pen) is masculine, so 'ein' becomes 'einen'."
  },
  {
    id: 55,
    prefix: "Ich brauche ",
    answer: "eine",
    suffix: " Tasche.",
    noun: "Tasche",
    gender: "die",
    caseRequired: "Accusative",
    explanation: "The verb 'brauchen' requires an accusative object. 'Tasche' (bag) is feminine, so 'eine'."
  },
  {
    id: 56,
    prefix: "Sie trinkt ",
    answer: "einen",
    suffix: " Kaffee.",
    noun: "Kaffee",
    gender: "der",
    caseRequired: "Accusative",
    explanation: "'trinken' takes an accusative object. 'Kaffee' is masculine, so the indefinite article is 'einen'."
  },
  {
    id: 57,
    prefix: "Wir trinken ",
    answer: "das",
    suffix: " Wasser.",
    noun: "Wasser",
    gender: "das",
    caseRequired: "Accusative",
    explanation: "'trinken' takes an accusative object. 'Wasser' is neuter, so it remains 'das'."
  },
  {
    id: 58,
    prefix: "Ohne ",
    answer: "den",
    suffix: " Schlüssel kann ich nicht reingehen.",
    noun: "Schlüssel",
    gender: "der",
    caseRequired: "Accusative",
    explanation: "The preposition 'ohne' ALWAYS requires the accusative case. 'Schlüssel' is masculine, so 'den'."
  },
  {
    id: 59,
    prefix: "Er kauft das Geschenk für ",
    answer: "die",
    suffix: " Mutter.",
    noun: "Mutter",
    gender: "die",
    caseRequired: "Accusative",
    explanation: "The preposition 'für' ALWAYS requires the accusative case. Feminine 'die' remains 'die'."
  },
  {
    id: 60,
    prefix: "Wir laufen durch ",
    answer: "den",
    suffix: " Wald.",
    noun: "Wald",
    gender: "der",
    caseRequired: "Accusative",
    explanation: "The preposition 'durch' ALWAYS requires the accusative case. 'Wald' (forest) is masculine, so 'den'."
  },
  {
    id: 61,
    prefix: "Ich danke ",
    answer: "dem",
    suffix: " Vater.",
    noun: "Vater",
    gender: "der",
    caseRequired: "Dative",
    explanation: "The verb 'danken' always requires the dative case. 'Vater' is masculine, so 'dem'."
  },
  {
    id: 62,
    prefix: "Die Tasche gehört ",
    answer: "der",
    suffix: " Mutter.",
    noun: "Mutter",
    gender: "die",
    caseRequired: "Dative",
    explanation: "The verb 'gehören' requires the dative case. Feminine 'die' becomes 'der' in the dative."
  },
  {
    id: 63,
    prefix: "Wir gehen aus ",
    answer: "dem",
    suffix: " Haus.",
    noun: "Haus",
    gender: "das",
    caseRequired: "Dative",
    explanation: "The preposition 'aus' ALWAYS requires the dative case. 'Haus' is neuter, so 'das' becomes 'dem'."
  },
  {
    id: 64,
    prefix: "Er fährt mit ",
    answer: "dem",
    suffix: " Auto.",
    noun: "Auto",
    gender: "das",
    caseRequired: "Dative",
    explanation: "The preposition 'mit' ALWAYS requires the dative case. 'Auto' is neuter, so 'dem'."
  },
  {
    id: 65,
    prefix: "Ich komme von ",
    answer: "der",
    suffix: " Post.",
    noun: "Post",
    gender: "die",
    caseRequired: "Dative",
    explanation: "The preposition 'von' ALWAYS requires the dative case. 'Post' is feminine, so 'die' becomes 'der'."
  },
  {
    id: 66,
    prefix: "Sie wohnt bei ",
    answer: "einem",
    suffix: " Onkel.",
    noun: "Onkel",
    gender: "der",
    caseRequired: "Dative",
    explanation: "The preposition 'bei' ALWAYS requires the dative case. 'Onkel' is masculine, so indefinite is 'einem'."
  },
  {
    id: 67,
    prefix: "Seit ",
    answer: "einem",
    suffix: " Jahr lerne ich Deutsch.",
    noun: "Jahr",
    gender: "das",
    caseRequired: "Dative",
    explanation: "The preposition 'seit' ALWAYS requires the dative case. 'Jahr' is neuter, so indefinite is 'einem'."
  },
  {
    id: 68,
    prefix: "Ich stelle die Flasche auf ",
    answer: "den",
    suffix: " Tisch.",
    noun: "Tisch",
    gender: "der",
    caseRequired: "Accusative",
    explanation: "'auf' is a two-way preposition. 'Stellen' (to place upright) is a movement to a destination, so it takes Accusative. Masculine becomes 'den'."
  },
  {
    id: 69,
    prefix: "Die Flasche steht auf ",
    answer: "dem",
    suffix: " Tisch.",
    noun: "Tisch",
    gender: "der",
    caseRequired: "Dative",
    explanation: "'auf' is a two-way preposition. 'Stehen' (to stand) describes a static location, so it takes Dative. Masculine 'der' becomes 'dem'."
  },
  {
    id: 70,
    prefix: "Wir hängen das Poster an ",
    answer: "die",
    suffix: " Tür.",
    noun: "Tür",
    gender: "die",
    caseRequired: "Accusative",
    explanation: "'an' is a two-way preposition. 'Hängen' (active) is movement to a destination, so Accusative. Feminine remains 'die'."
  },
  {
    id: 71,
    prefix: "Das Poster hängt an ",
    answer: "der",
    suffix: " Tür.",
    noun: "Tür",
    gender: "die",
    caseRequired: "Dative",
    explanation: "'an' is a two-way preposition. 'Hängen' (passive state) is static location, so Dative. Feminine 'die' becomes 'der'."
  },
  {
    id: 72,
    prefix: "Der Hund geht unter ",
    answer: "den",
    suffix: " Tisch.",
    noun: "Tisch",
    gender: "der",
    caseRequired: "Accusative",
    explanation: "'unter' is a two-way preposition. 'Gehen' is movement to a destination, so Accusative. Masculine 'der' becomes 'den'."
  },
  {
    id: 73,
    prefix: "Der Hund schläft unter ",
    answer: "dem",
    suffix: " Tisch.",
    noun: "Tisch",
    gender: "der",
    caseRequired: "Dative",
    explanation: "'unter' is a two-way preposition. 'Schlafen' describes static location, so Dative. Masculine 'der' becomes 'dem'."
  },
  {
    id: 74,
    prefix: "Ich setze mich auf ",
    answer: "das",
    suffix: " Sofa.",
    noun: "Sofa",
    gender: "das",
    caseRequired: "Accusative",
    explanation: "'auf' is a two-way preposition. 'Sich setzen' (to sit oneself down) is movement, so Accusative. Neuter remains 'das'."
  },
  {
    id: 75,
    prefix: "Ich sitze auf ",
    answer: "dem",
    suffix: " Sofa.",
    noun: "Sofa",
    gender: "das",
    caseRequired: "Dative",
    explanation: "'auf' is a two-way preposition. 'Sitzen' (to be sitting) is a static location, so Dative. Neuter 'das' becomes 'dem'."
  },
  {
    id: 76,
    prefix: "Hast du ",
    answer: "das/ein",
    suffix: " Handy gesehen?",
    noun: "Handy",
    gender: "das",
    caseRequired: "Accusative",
    explanation: "The verb 'sehen' takes a direct object (accusative). 'Handy' is neuter, so it's 'das' (the phone) or 'ein' (a phone)."
  },
  {
    id: 77,
    prefix: "Ich spreche mit ",
    answer: "der",
    suffix: " Lehrerin.",
    noun: "Lehrerin",
    gender: "die",
    caseRequired: "Dative",
    explanation: "The preposition 'mit' ALWAYS requires the dative case. 'Lehrerin' is feminine, so 'die' becomes 'der'."
  },
  {
    id: 78,
    prefix: "",
    answer: "Das",
    suffix: " Gesetz ist sehr wichtig.",
    noun: "Gesetz",
    gender: "das",
    caseRequired: "Nominative",
    explanation: "The subject of the sentence is in the nominative case. 'Gesetz' (Law) is neuter, so 'Das'."
  },
  {
    id: 79,
    prefix: "Alle Menschen müssen ",
    answer: "das",
    suffix: " Gesetz beachten.",
    noun: "Gesetz",
    gender: "das",
    caseRequired: "Accusative",
    explanation: "The verb 'beachten' (to observe/follow) takes a direct object (accusative). 'Gesetz' is neuter, so it remains 'das'."
  },
  {
    id: 80,
    prefix: "",
    answer: "Die",
    suffix: " Antarktis ist der kälteste Kontinent.",
    noun: "Antarktis",
    gender: "die",
    caseRequired: "Nominative",
    explanation: "'Antarktis' is the subject. It is a feminine geographical region, so 'Die'."
  },
  {
    id: 81,
    prefix: "",
    answer: "Der",
    suffix: " Frosch springt ins Wasser.",
    noun: "Frosch",
    gender: "der",
    caseRequired: "Nominative",
    explanation: "'Frosch' (Frog) is the subject doing the jumping. It's masculine, so 'Der'."
  },
  {
    id: 82,
    prefix: "",
    answer: "Die",
    suffix: " Ampel ist rot.",
    noun: "Ampel",
    gender: "die",
    caseRequired: "Nominative",
    explanation: "The verb 'sein' (ist) links nominative nouns. 'Ampel' (Traffic light) is feminine, so 'Die'."
  },
  {
    id: 83,
    prefix: "Ich warte an ",
    answer: "der",
    suffix: " Ampel.",
    noun: "Ampel",
    gender: "die",
    caseRequired: "Dative",
    explanation: "'an' is a two-way preposition. 'Warten' (waiting) is a static action (no movement to a destination), so Dative. Feminine 'die' becomes 'der'."
  },
  {
    id: 84,
    prefix: "Ich esse ",
    answer: "ein",
    suffix: " Ei zum Frühstück.",
    noun: "Ei",
    gender: "das",
    caseRequired: "Accusative",
    explanation: "The verb 'essen' takes an accusative object. 'Ei' (Egg) is neuter, so 'ein'."
  },
  {
    id: 85,
    prefix: "",
    answer: "Die",
    suffix: " Ameise ist ein kleines Insekt.",
    noun: "Ameise",
    gender: "die",
    caseRequired: "Nominative",
    explanation: "The verb 'sein' (ist) takes nominative. 'Ameise' (Ant) is feminine, so 'Die'."
  },
  {
    id: 86,
    prefix: "Ich habe ",
    answer: "eine",
    suffix: " Allergie gegen Pollen.",
    noun: "Allergie",
    gender: "die",
    caseRequired: "Accusative",
    explanation: "'haben' requires an accusative object. 'Allergie' (Allergy) is feminine, so 'eine'."
  },
  {
    id: 87,
    prefix: "Alkohol ist schädlich für ",
    answer: "den",
    suffix: " Körper.",
    noun: "Körper",
    gender: "der",
    caseRequired: "Accusative",
    explanation: "The preposition 'für' ALWAYS requires the accusative case. 'Körper' (Body) is masculine, so 'den'."
  },
  {
    id: 88,
    prefix: "",
    answer: "Der",
    suffix: " Wein kommt aus Deutschland.",
    noun: "Wein",
    gender: "der",
    caseRequired: "Nominative",
    explanation: "'Wein' is the subject of the sentence. It's masculine, so 'Der'."
  },
  {
    id: 89,
    prefix: "",
    answer: "Das",
    suffix: " Bier ist kalt.",
    noun: "Bier",
    gender: "das",
    caseRequired: "Nominative",
    explanation: "'Bier' is the subject of the sentence. It's neuter, so 'Das'."
  },
  {
    id: 90,
    prefix: "",
    answer: "Die",
    suffix: " Welt ist sehr groß.",
    noun: "Welt",
    gender: "die",
    caseRequired: "Nominative",
    explanation: "'Welt' is the subject of the sentence. It's feminine, so 'Die'."
  },
  {
    id: 91,
    prefix: "",
    answer: "Die",
    suffix: " Erde ist unser Planet.",
    noun: "Erde",
    gender: "die",
    caseRequired: "Nominative",
    explanation: "The subject 'Erde' (Earth) is feminine, so 'Die'."
  },
  {
    id: 92,
    prefix: "",
    answer: "Die",
    suffix: " Pflanze wächst in der Wüste.",
    noun: "Pflanze",
    gender: "die",
    caseRequired: "Nominative",
    explanation: "'Pflanze' is the subject. It is feminine, so 'Die'."
  },
  {
    id: 93,
    prefix: "Die Pflanze wächst in ",
    answer: "der",
    suffix: " Wüste.",
    noun: "Wüste",
    gender: "die",
    caseRequired: "Dative",
    explanation: "'in' is a two-way preposition. 'Wachsen' here describes a static location (growing in place), so Dative. Feminine 'die' becomes 'der'."
  },
  {
    id: 94,
    prefix: "",
    answer: "Der",
    suffix: " Löwe ist der König der Tiere.",
    noun: "Löwe",
    gender: "der",
    caseRequired: "Nominative",
    explanation: "The subject 'Löwe' (Lion) is masculine, so 'Der'."
  },
  {
    id: 95,
    prefix: "",
    answer: "Das",
    suffix: " Zebra lebt in Afrika.",
    noun: "Zebra",
    gender: "das",
    caseRequired: "Nominative",
    explanation: "The subject 'Zebra' is neuter, so 'Das'."
  },
  {
    id: 96,
    prefix: "",
    answer: "Der",
    suffix: " Elefant ist ein großes Tier.",
    noun: "Elefant",
    gender: "der",
    caseRequired: "Nominative",
    explanation: "The subject 'Elefant' is masculine, so 'Der'."
  },
  {
    id: 97,
    prefix: "Der Affe hat ",
    answer: "einen",
    suffix: " langen Schwanz.",
    noun: "Schwanz",
    gender: "der",
    caseRequired: "Accusative",
    explanation: "'haben' takes an accusative object. 'Schwanz' (Tail) is masculine, so 'ein' becomes 'einen'."
  },
  {
    id: 98,
    prefix: "Das Zebra ist ",
    answer: "ein",
    suffix: " Säugetier.",
    noun: "Säugetier",
    gender: "das",
    caseRequired: "Nominative",
    explanation: "The verb 'sein' (ist) links two nominative nouns. 'Säugetier' (Mammal) is neuter, so 'ein'."
  },
  {
    id: 99,
    prefix: "",
    answer: "Der",
    suffix: " Affe klettert auf einen Baum.",
    noun: "Affe",
    gender: "der",
    caseRequired: "Nominative",
    explanation: "The subject 'Affe' (Monkey) is masculine, so 'Der'."
  },
  {
    id: 100,
    prefix: "",
    answer: "Ein",
    suffix: " Adler ist ein großer Greifvogel.",
    noun: "Adler",
    gender: "der",
    caseRequired: "Nominative",
    explanation: "The subject 'Adler' (Eagle) is masculine, so 'Ein'."
  },
  {
    id: 101,
    prefix: "Der Klimawandel ist ",
    answer: "eine",
    suffix: " große Herausforderung.",
    noun: "Herausforderung",
    gender: "die",
    caseRequired: "Nominative",
    explanation: "The verb 'sein' (ist) links two nominative nouns. 'Herausforderung' (Challenge) is feminine, so 'eine'."
  },
  {
    id: 102,
    prefix: "Ich brauche ",
    answer: "ein",
    suffix: " neues Rezept für die Pille.",
    noun: "Rezept",
    gender: "das",
    caseRequired: "Accusative",
    explanation: "'brauchen' requires an accusative object. 'Rezept' (Prescription) is neuter, so 'ein'."
  },
  {
    id: 103,
    prefix: "Ich brauche ein neues Rezept für ",
    answer: "die",
    suffix: " Pille.",
    noun: "Pille",
    gender: "die",
    caseRequired: "Accusative",
    explanation: "The preposition 'für' ALWAYS requires the accusative case. 'Pille' is feminine, so 'die'."
  },
  {
    id: 104,
    prefix: "Ich bin in ",
    answer: "der",
    suffix: " Straßenbahn.",
    noun: "Straßenbahn",
    gender: "die",
    caseRequired: "Dative",
    explanation: "'in' is a two-way preposition. 'Sein' (bin) describes a static location (being inside), so Dative. Feminine 'die' becomes 'der'."
  },
  {
    id: 105,
    prefix: "Ich muss auf ",
    answer: "das",
    suffix: " Klo.",
    noun: "Klo",
    gender: "das",
    caseRequired: "Accusative",
    explanation: "'auf' is a two-way preposition. Here it implies movement to a destination, so Accusative. Neuter 'das' remains 'das'."
  },
  {
    id: 106,
    prefix: "Ich habe um 10 Uhr ",
    answer: "einen",
    suffix: " Termin beim Arzt.",
    noun: "Termin",
    gender: "der",
    caseRequired: "Accusative",
    explanation: "'haben' takes an accusative object. 'Termin' (Appointment) is masculine, so 'einen'."
  },
  {
    id: 107,
    prefix: "Ich hätte gerne ",
    answer: "eine",
    suffix: " Pizza Margherita.",
    noun: "Pizza",
    gender: "die",
    caseRequired: "Accusative",
    explanation: "'hätte gerne' (would like to have) requires an accusative object. 'Pizza' is feminine, so 'eine'."
  }
];
