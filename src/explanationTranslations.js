const TRANSLATIONS = {
  "'být' (long ý) = to be; 'byt' (short y) = apartment": [
    "'být' (dlouhé ý) znamená být; 'byt' (krátké y) znamená byt.",
    "'být' (długie ý) znaczy „być”; 'byt' (krótkie y) oznacza mieszkanie.",
    "'být' (довге ý) означає «бути»; 'byt' (коротке y) — квартира.",
    "'být' (долгое ý) означает «быть»; 'byt' (краткое y) — квартира."
  ],
  "'byt' (short y) = apartment; 'být' (long ý) = to be": [
    "'byt' (krátké y) znamená byt; 'být' (dlouhé ý) znamená být.",
    "'byt' (krótkie y) oznacza mieszkanie; 'být' (długie ý) znaczy „być”.",
    "'byt' (коротке y) — квартира; 'být' (довге ý) означає «бути».",
    "'byt' (краткое y) — квартира; 'být' (долгое ý) означает «быть»."
  ],
  "'mýt' (long ý) = to wash; 'mít' (long í) = to have": [
    "'mýt' (dlouhé ý) znamená mýt; 'mít' (dlouhé í) znamená mít.",
    "'mýt' (długie ý) znaczy „myć”; 'mít' (długie í) znaczy „mieć”.",
    "'mýt' (довге ý) означає «мити»; 'mít' (довге í) — «мати».",
    "'mýt' (долгое ý) означает «мыть»; 'mít' (долгое í) — «иметь»."
  ],
  "'mít' (long í) = to have; 'mýt' (long ý) = to wash": [
    "'mít' (dlouhé í) znamená mít; 'mýt' (dlouhé ý) znamená mýt.",
    "'mít' (długie í) znaczy „mieć”; 'mýt' (długie ý) znaczy „myć”.",
    "'mít' (довге í) означає «мати»; 'mýt' (довге ý) — «мити».",
    "'mít' (долгое í) означает «иметь»; 'mýt' (долгое ý) — «мыть»."
  ],
  "'ví' (long í) = knows; 'vi' is not a Czech word": [
    "'ví' (dlouhé í) znamená „ví”; 'vi' není české slovo.",
    "'ví' (długie í) znaczy „wie”; 'vi' nie jest czeskim słowem.",
    "'ví' (довге í) означає «знає»; 'vi' — не чеське слово.",
    "'ví' (долгое í) означает «знает»; 'vi' — не чешское слово."
  ],
  "'byl' = he was (from být); 'bil' = he hit (from bít)": [
    "'byl' znamená „byl” (od slovesa být); 'bil' znamená „uhodil” (od slovesa bít).",
    "'byl' znaczy „był” (od 'být'); 'bil' znaczy „uderzył” (od 'bít').",
    "'byl' означає «він був» (від 'být'); 'bil' — «він ударив» (від 'bít').",
    "'byl' означает «он был» (от 'být'); 'bil' — «он ударил» (от 'bít')."
  ],
  "'bil' = he hit (from bít); 'byl' = he was (from být)": [
    "'bil' znamená „uhodil” (od slovesa bít); 'byl' znamená „byl” (od slovesa být).",
    "'bil' znaczy „uderzył” (od 'bít'); 'byl' znaczy „był” (od 'být').",
    "'bil' означає «він ударив» (від 'bít'); 'byl' — «він був» (від 'být').",
    "'bil' означает «он ударил» (от 'bít'); 'byl' — «он был» (от 'být')."
  ],
  "'ty' (short y) = you; 'tý' is colloquial/nonstandard": [
    "'ty' (krátké y) znamená „ty”; 'tý' je hovorová, nespisovná podoba.",
    "'ty' (krótkie y) znaczy „ty”; 'tý' to forma potoczna i niepoprawna standardowo.",
    "'ty' (коротке y) означає «ти»; 'tý' — розмовна, ненормативна форма.",
    "'ty' (краткое y) означает «ты»; 'tý' — разговорная, ненормативная форма."
  ],
  "'výt' (ý) = to howl; 'vít' (í) = to wind/twine": [
    "'výt' s ý znamená výt; 'vít' s í znamená vinout nebo splétat.",
    "'výt' z ý znaczy „wyć”; 'vít' z í — „wić” lub „splatać”.",
    "'výt' з ý означає «вити»; 'vít' з í — «обвивати» або «плести».",
    "'výt' с ý означает «выть»; 'vít' с í — «обвивать» или «плести»."
  ],
  "'vít' (í) = to wind/twine; 'výt' (ý) = to howl": [
    "'vít' s í znamená vinout nebo splétat; 'výt' s ý znamená výt.",
    "'vít' z í znaczy „wić” lub „splatać”; 'výt' z ý — „wyć”.",
    "'vít' з í означає «обвивати» або «плести»; 'výt' з ý — «вити».",
    "'vít' с í означает «обвивать» или «плести»; 'výt' с ý — «выть»."
  ],
  "'dým' (long ý) = smoke; the long vowel is essential": [
    "'dým' (dlouhé ý) znamená kouř; délka samohlásky je důležitá.",
    "'dým' (długie ý) oznacza dym; długość samogłoski ma znaczenie.",
    "'dým' (довге ý) означає дим; довгота голосної має значення.",
    "'dým' (долгое ý) означает дым; долгота гласной важна."
  ],
  "'sýr' (long ý) = cheese; 'sir' is not a Czech word": [
    "'sýr' (dlouhé ý) znamená sýr; 'sir' není české slovo.",
    "'sýr' (długie ý) oznacza ser; 'sir' nie jest czeskim słowem.",
    "'sýr' (довге ý) означає сир; 'sir' — не чеське слово.",
    "'sýr' (долгое ý) означает сыр; 'sir' — не чешское слово."
  ],
  "'rýže' (long ý + ž) = rice; 'říže' is not a word": [
    "'rýže' s dlouhým ý a ž znamená rýže; 'říže' není slovo.",
    "'rýže' z długim ý i ž oznacza ryż; 'říže' nie jest słowem.",
    "'rýže' з довгим ý і ž означає рис; 'říže' — не слово.",
    "'rýže' с долгим ý и ž означает рис; 'říže' — не слово."
  ],
  "'péct' (long é) = to bake; the vowel must be long": [
    "'péct' (dlouhé é) znamená péct; samohláska musí být dlouhá.",
    "'péct' (długie é) znaczy „piec”; samogłoska musi być długa.",
    "'péct' (довге é) означає «пекти»; голосна має бути довгою.",
    "'péct' (долгое é) означает «печь»; гласная должна быть долгой."
  ],
  "'žít' with ž = to live; ž (háček) is essential here": [
    "'žít' se ž znamená žít; písmeno ž s háčkem je zde nezbytné.",
    "'žít' z ž znaczy „żyć”; litera ž z haczykiem jest tu niezbędna.",
    "'žít' з ž означає «жити»; літера ž з гачеком тут необхідна.",
    "'žít' с ž означает «жить»; буква ž с гачеком здесь обязательна."
  ],
  "'létat' (long é) = to fly; the vowel length is essential": [
    "'létat' (dlouhé é) znamená létat; délka samohlásky je důležitá.",
    "'létat' (długie é) znaczy „latać”; długość samogłoski ma znaczenie.",
    "'létat' (довге é) означає «літати»; довгота голосної важлива.",
    "'létat' (долгое é) означает «летать»; долгота гласной важна."
  ],
  "'už' with ž = already; ž and š are different sounds": [
    "'už' se ž znamená „už”; ž a š jsou různé hlásky.",
    "'už' z ž znaczy „już”; ž i š to różne głoski.",
    "'už' з ž означає «вже»; ž і š — різні звуки.",
    "'už' с ž означает «уже»; ž и š — разные звуки."
  ],
  "'pero' (short e) = pen/feather; 'péro' (long é) = spring": [
    "'pero' s krátkým e znamená pero nebo pírko; 'péro' s dlouhým é znamená pružinu.",
    "'pero' z krótkim e oznacza pióro; 'péro' z długim é oznacza sprężynę.",
    "'pero' з коротким e означає ручку або перо; 'péro' з довгим é — пружину.",
    "'pero' с кратким e означает ручку или перо; 'péro' с долгим é — пружину."
  ],
  "'péro' (long é) = spring; 'pero' (short e) = pen": [
    "'péro' s dlouhým é znamená pružinu; 'pero' s krátkým e znamená pero.",
    "'péro' z długim é oznacza sprężynę; 'pero' z krótkim e — pióro.",
    "'péro' з довгим é означає пружину; 'pero' з коротким e — ручку або перо.",
    "'péro' с долгим é означает пружину; 'pero' с кратким e — ручку или перо."
  ],
  "'rada' = advice/council; 'řada' = row/series": [
    "'rada' znamená radu nebo radu (orgán); 'řada' znamená řadu či sérii.",
    "'rada' oznacza radę; 'řada' oznacza rząd lub serię.",
    "'rada' означає пораду або раду; 'řada' — ряд чи серію.",
    "'rada' означает совет; 'řada' — ряд или серию."
  ],
  "'řada' (with ř) = row/series; 'rada' = advice": [
    "'řada' s ř znamená řadu nebo sérii; 'rada' znamená radu.",
    "'řada' z ř oznacza rząd lub serię; 'rada' oznacza radę.",
    "'řada' з ř означає ряд або серію; 'rada' означає пораду.",
    "'řada' с ř означает ряд или серию; 'rada' означает совет."
  ],
  "'nahoře' – the ř and ě are both essential": [
    "Ve slově 'nahoře' jsou nezbytná ř i ě.",
    "W słowie 'nahoře' niezbędne są zarówno ř, jak i ě.",
    "У слові 'nahoře' необхідні і ř, і ě.",
    "В слове 'nahoře' необходимы и ř, и ě."
  ],
  "'hledat' – short e; no long vowel in this verb": [
    "Ve slově 'hledat' je krátké e; toto sloveso nemá dlouhou samohlásku.",
    "W słowie 'hledat' występuje krótkie e; w tym czasowniku nie ma długiej samogłoski.",
    "У слові 'hledat' коротке e; у цьому дієслові немає довгої голосної.",
    "В слове 'hledat' краткое e; в этом глаголе нет долгой гласной."
  ],
  "'led' – standard Czech spelling; short e": [
    "'led' je spisovný český pravopis s krátkým e.",
    "'led' to standardowa czeska pisownia z krótkim e.",
    "'led' — нормативне чеське написання з коротким e.",
    "'led' — нормативное чешское написание с кратким e."
  ],
  "'sud' (short u) = barrel; Czech doesn't use ú here": [
    "'sud' s krátkým u znamená sud; v tomto slově se ú nepíše.",
    "'sud' z krótkim u oznacza beczkę; w tym słowie nie pisze się ú.",
    "'sud' з коротким u означає бочку; у цьому слові ú не вживається.",
    "'sud' с кратким u означает бочку; в этом слове ú не пишется."
  ],
  "'kůň' (with ů) = horse; ů marks long u inside a word": [
    "'kůň' s ů znamená kůň; ů označuje dlouhé u uprostřed slova.",
    "'kůň' z ů oznacza konia; ů oznacza długie u wewnątrz wyrazu.",
    "'kůň' з ů означає коня; ů позначає довге u всередині слова.",
    "'kůň' с ů означает лошадь; ů обозначает долгое u внутри слова."
  ],
  "'dům' (with ů) = house; ů is required in the middle": [
    "'dům' s ů znamená dům; uprostřed slova je ů nutné.",
    "'dům' z ů oznacza dom; ů jest wymagane w środku wyrazu.",
    "'dům' з ů означає будинок; у середині слова потрібне ů.",
    "'dům' с ů означает дом; в середине слова необходимо ů."
  ],
  "'sůl' (with ů) = salt; long vowel is essential": [
    "'sůl' s ů znamená sůl; dlouhá samohláska je důležitá.",
    "'sůl' z ů oznacza sól; długa samogłoska ma znaczenie.",
    "'sůl' з ů означає сіль; довгота голосної важлива.",
    "'sůl' с ů означает соль; долгота гласной важна."
  ],
  "'únor' (with ú) = February; ú at word start": [
    "'únor' s ú znamená únor; na začátku slova se píše ú.",
    "'únor' z ú oznacza luty; na początku wyrazu pisze się ú.",
    "'únor' з ú означає лютий; на початку слова пишеться ú.",
    "'únor' с ú означает февраль; в начале слова пишется ú."
  ],
  "'újma' (with ú) = harm; ú required at word start": [
    "'újma' s ú znamená újmu; na začátku slova je ú povinné.",
    "'újma' z ú oznacza szkodę; na początku wyrazu wymagane jest ú.",
    "'újma' з ú означає шкоду; на початку слова обов'язкове ú.",
    "'újma' с ú означает ущерб; в начале слова обязательно пишется ú."
  ],
  "'polévka' is standard Czech; 'polívka' is colloquial (obecná čeština).": [
    "'polévka' je spisovná čeština; 'polívka' je hovorová obecná čeština.",
    "'polévka' to standardowy czeski; 'polívka' to potoczna forma (obecná čeština).",
    "'polévka' — нормативна чеська форма; 'polívka' — розмовна (obecná čeština).",
    "'polévka' — нормативная чешская форма; 'polívka' — разговорная (obecná čeština)."
  ],
  "'malý' is standard; 'malej' is colloquial Bohemian speech.": [
    "'malý' je spisovná podoba; 'malej' je hovorová čeština z Čech.",
    "'malý' to forma standardowa; 'malej' to potoczna mowa czeska z Czech.",
    "'malý' — нормативна форма; 'malej' — розмовний варіант богемської чеської.",
    "'malý' — нормативная форма; 'malej' — разговорный вариант богемского чешского."
  ],
  "'být' is standard Czech; 'bejt' is colloquial.": [
    "'být' je spisovná čeština; 'bejt' je hovorové.",
    "'být' to standardowa czeszczyzna; 'bejt' to forma potoczna.",
    "'být' — нормативна чеська форма; 'bejt' — розмовна.",
    "'být' — нормативная чешская форма; 'bejt' — разговорная."
  ],
  "'mýt' = to wash; 'mít' = to have. Only the vowel differs.": [
    "'mýt' znamená mýt; 'mít' znamená mít. Liší se pouze samohláskou.",
    "'mýt' znaczy „myć”; 'mít' znaczy „mieć”. Różnią się tylko samogłoską.",
    "'mýt' означає «мити»; 'mít' — «мати». Відрізняються лише голосною.",
    "'mýt' означает «мыть»; 'mít' — «иметь». Различается только гласная."
  ],
  "'vila' (short i) = villa; 'víla' (long í) = fairy.": [
    "'vila' s krátkým i znamená vilu; 'víla' s dlouhým í znamená vílu.",
    "'vila' z krótkim i oznacza willę; 'víla' z długim í oznacza wróżkę.",
    "'vila' з коротким i означає віллу; 'víla' з довгим í означає фею.",
    "'vila' с кратким i означает виллу; 'víla' с долгим í означает фею."
  ],
  "'být' = to be; 'bít' = to beat/hit.": [
    "'být' znamená být; 'bít' znamená bít nebo udeřit.",
    "'být' znaczy „być”; 'bít' znaczy „bić” lub „uderzyć”.",
    "'být' означає «бути»; 'bít' — «бити» або «вдарити».",
    "'být' означает «быть»; 'bít' — «бить» или «ударить»."
  ],
  "'dům' is neutral/standard; 'barák' is colloquial.": [
    "'dům' je neutrální a spisovné; 'barák' je hovorové.",
    "'dům' to neutralne, standardowe słowo; 'barák' jest potoczne.",
    "'dům' — нейтральне нормативне слово; 'barák' — розмовне.",
    "'dům' — нейтральное нормативное слово; 'barák' — разговорное."
  ],
  "'rada' = advice or council; 'ráda' = glad/gladly (feminine).": [
    "'rada' znamená radu; 'ráda' znamená „ráda” (ženský rod).",
    "'rada' oznacza radę; 'ráda' znaczy „chętnie” lub „zadowolona” (rod żeński).",
    "'rada' означає пораду або раду; 'ráda' — «рада» (жіночий рід).",
    "'rada' означает совет; 'ráda' — «рада» или «охотно» (женский род)."
  ],
  "'cestovat' – no háček on e; ě doesn't follow c here": [
    "Ve slově 'cestovat' není nad e háček; po c zde ě nenásleduje.",
    "W słowie 'cestovat' nad e nie ma haczyka; po c nie występuje tu ě.",
    "У слові 'cestovat' над e немає гачека; після c тут не пишеться ě.",
    "В слове 'cestovat' над e нет гачека; после c здесь не пишется ě."
  ],
  "'židle' (short i) = chair; no long vowel": [
    "'židle' s krátkým i znamená židli; samohláska není dlouhá.",
    "'židle' z krótkim i oznacza krzesło; samogłoska nie jest długa.",
    "'židle' з коротким i означає стілець; голосна не довга.",
    "'židle' с кратким i означает стул; гласная не долгая."
  ],
  "'povinnost' – doubled nn is correct in this noun": [
    "Ve slově 'povinnost' se píše nn; toto podstatné jméno má dvě n.",
    "W rzeczowniku 'povinnost' poprawna jest podwójna litera nn.",
    "У іменнику 'povinnost' правильно пишеться подвоєне nn.",
    "В существительном 'povinnost' правильно пишется двойное nn."
  ],
  "'lít' (soft í) = to pour; hard ý would be wrong": [
    "'lít' s měkkým í znamená lít; tvrdé ý by bylo chybně.",
    "'lít' z miękkim í znaczy „lać”; twarde ý byłoby błędne.",
    "'lít' з м'яким í означає «лити»; тверде ý було б помилкою.",
    "'lít' с мягким í означает «лить»; твёрдое ý было бы ошибкой."
  ],
  "'řídit' – ř (with háček) is essential here": [
    "Ve slově 'řídit' je nezbytné ř s háčkem.",
    "W słowie 'řídit' niezbędne jest ř z haczykiem.",
    "У слові 'řídit' необхідна літера ř з гачеком.",
    "В слове 'řídit' необходима буква ř с гачеком."
  ],
  "'přítel' – long í in the prefix pří- is required": [
    "Ve slově 'přítel' je v předponě pří- nutné dlouhé í.",
    "W słowie 'přítel' w przedrostku pří- wymagane jest długie í.",
    "У слові 'přítel' у префіксі pří- потрібне довге í.",
    "В слове 'přítel' в приставке pří- требуется долгое í."
  ],
  "'věřit' – the ě is required (long vowel + ř)": [
    "Ve slově 'věřit' je nutné ě (dlouhá samohláska + ř).",
    "W słowie 'věřit' wymagane jest ě (długa samogłoska + ř).",
    "У слові 'věřit' потрібне ě (довга голосна + ř).",
    "В слове 'věřit' необходимо ě (долгая гласная + ř)."
  ],
  "'účet' – ú at start + č (háček) are both needed": [
    "Ve slově 'účet' je potřeba ú na začátku i č s háčkem.",
    "W słowie 'účet' potrzebne jest ú na początku oraz č z haczykiem.",
    "У слові 'účet' потрібні ú на початку та č з гачеком.",
    "В слове 'účet' нужны ú в начале и č с гачеком."
  ],
  "'říkat' – ř with háček is essential for this verb": [
    "Ve slově 'říkat' je pro toto sloveso nezbytné ř s háčkem.",
    "W czasowniku 'říkat' niezbędne jest ř z haczykiem.",
    "У дієслові 'říkat' необхідна літера ř з гачеком.",
    "В глаголе 'říkat' необходима буква ř с гачеком."
  ],
  "'příliš' – long í required in this adverb": [
    "Ve slově 'příliš' je v této příslovce nutné dlouhé í.",
    "W przysłówku 'příliš' wymagane jest długie í.",
    "У прислівнику 'příliš' потрібне довге í.",
    "В наречии 'příliš' требуется долгое í."
  ],
  "'úžasný' – ú at word start + ž are both required": [
    "Ve slově 'úžasný' je potřeba ú na začátku i ž.",
    "W słowie 'úžasný' wymagane jest ú na początku oraz ž.",
    "У слові 'úžasný' потрібні ú на початку та ž.",
    "В слове 'úžasný' нужны ú в начале и ž."
  ],
  "'účel' – ú at start + č with háček are required": [
    "Ve slově 'účel' je potřeba ú na začátku i č s háčkem.",
    "W słowie 'účel' potrzebne jest ú na początku oraz č z haczykiem.",
    "У слові 'účel' потрібні ú на початку та č з гачеком.",
    "В слове 'účel' нужны ú в начале и č с гачеком."
  ],
  "'denní' – doubled nn is correct in this adjective": [
    "V přídavném jménu 'denní' se správně píše nn.",
    "W przymiotniku 'denní' poprawna jest podwójna litera nn.",
    "У прикметнику 'denní' правильно пишеться подвоєне nn.",
    "В прилагательном 'denní' правильно пишется двойное nn."
  ],
  "'počítat' – č (háček) is required after po-": [
    "Ve slově 'počítat' je po- následováno č s háčkem.",
    "W słowie 'počítat' po- musi występować č z haczykiem.",
    "У слові 'počítat' після po- потрібна літера č з гачеком.",
    "В слове 'počítat' после po- нужна буква č с гачеком."
  ],
  "'vést' = to lead/guide; 'vézt' = to transport by vehicle. They sound alike.": [
    "'vést' znamená vést nebo provázet; 'vézt' znamená přepravovat vozidlem. Znějí stejně.",
    "'vést' znaczy „prowadzić”; 'vézt' — „przewozić pojazdem”. Wymawia się je tak samo.",
    "'vést' означає «вести»; 'vézt' — «перевозити транспортом». Вони звучать однаково.",
    "'vést' означает «вести»; 'vézt' — «перевозить на транспорте». Они звучат одинаково."
  ],
  "'kuře' has ř (háček), not plain r.": [
    "Ve slově 'kuře' je ř s háčkem, nikoli obyčejné r.",
    "W słowie 'kuře' występuje ř z haczykiem, a nie zwykłe r.",
    "У слові 'kuře' пишеться ř з гачеком, а не звичайне r.",
    "В слове 'kuře' пишется ř с гачеком, а не обычное r."
  ],
  "'zaměstnavatel' = employer; 'zaměstnanec' = employee.": [
    "'zaměstnavatel' znamená zaměstnavatel; 'zaměstnanec' znamená zaměstnanec.",
    "'zaměstnavatel' oznacza pracodawcę; 'zaměstnanec' — pracownika.",
    "'zaměstnavatel' означає роботодавця; 'zaměstnanec' — працівника.",
    "'zaměstnavatel' означает работодателя; 'zaměstnanec' — работника."
  ],
  "'sůl' has ů (kroužek); 'sul' is wrong.": [
    "Ve slově 'sůl' se píše ů s kroužkem; 'sul' je chybně.",
    "W słowie 'sůl' pisze się ů z kółkiem; 'sul' jest błędne.",
    "У слові 'sůl' пишеться ů з кружечком; 'sul' — помилка.",
    "В слове 'sůl' пишется ů с кружком; 'sul' — ошибка."
  ],
  "'mazlíček' has č (háček) on the third syllable.": [
    "Ve slově 'mazlíček' je ve třetí slabice č s háčkem.",
    "W słowie 'mazlíček' w trzeciej sylabie występuje č z haczykiem.",
    "У слові 'mazlíček' у третьому складі є č з гачеком.",
    "В слове 'mazlíček' в третьем слоге пишется č с гачеком."
  ],
  "'želva' begins with ž (háček), not plain z.": [
    "Slovo 'želva' začíná na ž s háčkem, nikoli na obyčejné z.",
    "Słowo 'želva' zaczyna się od ž z haczykiem, a nie zwykłego z.",
    "Слово 'želva' починається з ž з гачеком, а не звичайного z.",
    "Слово 'želva' начинается с ž с гачеком, а не обычного z."
  ],
  "'salát' has a long á.": [
    "Ve slově 'salát' je dlouhé á.",
    "W słowie 'salát' występuje długie á.",
    "У слові 'salát' пишеться довге á.",
    "В слове 'salát' пишется долгое á."
  ],
  "'služební cesta' = business trip; 'služebná' = a maid.": [
    "'služební cesta' znamená pracovní cestu; 'služebná' znamená služku.",
    "'služební cesta' oznacza podróż służbową; 'služebná' — służącą.",
    "'služební cesta' означає відрядження; 'služebná' — служницю.",
    "'služební cesta' означает командировку; 'služebná' — служанку."
  ],
  "'pas' (short a) = passport; 'pás' (long á) = belt.": [
    "'pas' s krátkým a znamená pas; 'pás' s dlouhým á znamená opasek.",
    "'pas' z krótkim a oznacza paszport; 'pás' z długim á — pasek.",
    "'pas' з коротким a означає паспорт; 'pás' з довгим á — пояс.",
    "'pas' с кратким a означает паспорт; 'pás' с долгим á — пояс."
  ],
  "'pan' = Mr (with a name); 'pán' = gentleman / lord / master.": [
    "'pan' je oslovení před jménem; 'pán' znamená gentleman, pán nebo mistr.",
    "'pan' to forma grzecznościowa przed nazwiskiem; 'pán' oznacza pana, władcę lub mistrza.",
    "'pan' — звертання перед ім'ям; 'pán' означає пана, володаря або господаря.",
    "'pan' — обращение перед именем; 'pán' означает господина, владыку или хозяина."
  ],
  "'vědět' = to know (facts); 'vidět' = to see.": [
    "'vědět' znamená vědět (znát fakta); 'vidět' znamená vidět.",
    "'vědět' znaczy „wiedzieć” (znać fakty); 'vidět' — „widzieć”.",
    "'vědět' означає «знати» (факти); 'vidět' — «бачити».",
    "'vědět' означает «знать» (факты); 'vidět' — «видеть»."
  ],
  "'rád' = glad/gladly; 'řád' = order / rule (with ř).": [
    "'rád' znamená rád nebo ochotně; 'řád' s ř znamená řád nebo pravidlo.",
    "'rád' znaczy „zadowolony” lub „chętnie”; 'řád' z ř oznacza porządek lub zasadę.",
    "'rád' означає «радий» або «охоче»; 'řád' з ř — порядок або правило.",
    "'rád' означает «рад» или «охотно»; 'řád' с ř — порядок или правило."
  ],
  "'šlehačka' begins with š (háček).": [
    "Slovo 'šlehačka' začíná na š s háčkem.",
    "Słowo 'šlehačka' zaczyna się od š z haczykiem.",
    "Слово 'šlehačka' починається з š з гачеком.",
    "Слово 'šlehačka' начинается с š с гачеком."
  ],
  "'císař' has a long í and ř (háček).": [
    "Ve slově 'císař' je dlouhé í a ř s háčkem.",
    "W słowie 'císař' występuje długie í oraz ř z haczykiem.",
    "У слові 'císař' є довге í та ř з гачеком.",
    "В слове 'císař' есть долгое í и ř с гачеком."
  ],
  "'vézt' = to transport by vehicle; 'vést' = to lead/guide.": [
    "'vézt' znamená přepravovat vozidlem; 'vést' znamená vést nebo provázet.",
    "'vézt' znaczy „przewozić pojazdem”; 'vést' — „prowadzić”.",
    "'vézt' означає «перевозити транспортом»; 'vést' — «вести».",
    "'vézt' означает «перевозить на транспорте»; 'vést' — «вести»."
  ],
  "'morče' has č (háček).": [
    "Ve slově 'morče' je č s háčkem.",
    "W słowie 'morče' występuje č z haczykiem.",
    "У слові 'morče' пишеться č з гачеком.",
    "В слове 'morče' пишется č с гачеком."
  ],
  "'účinný' – doubled nn in the adjective suffix": [
    "V přídavném jménu 'účinný' se ve slovotvorné příponě píše nn.",
    "W przymiotniku 'účinný' w przyrostku występuje podwójne nn.",
    "У прикметнику 'účinný' у суфіксі пишеться подвоєне nn.",
    "В прилагательном 'účinný' в суффиксе пишется двойное nn."
  ],
  "'výhoda' – prefix vý- always has a long vowel": [
    "Předpona vý- ve slově 'výhoda' má vždy dlouhou samohlásku.",
    "Przedrostek vý- w słowie 'výhoda' zawsze zawiera długą samogłoskę.",
    "Префікс vý- у слові 'výhoda' завжди має довгу голосну.",
    "Приставка vý- в слове 'výhoda' всегда содержит долгую гласную."
  ],
  "'potvrdit' – no accent on r; Czech r is never accented": [
    "Ve slově 'potvrdit' není nad r diakritiky; české r se nikdy neoznačuje přízvinkem.",
    "W słowie 'potvrdit' nad r nie ma znaku diakrytycznego; czeskie r nie przyjmuje akcentu.",
    "У слові 'potvrdit' над r немає діакритики; чеське r не позначається акцентом.",
    "В слове 'potvrdit' над r нет диакритики; чешская r не получает ударения."
  ],
  "'předčit' – short i; no long vowel at the end": [
    "Ve slově 'předčit' je krátké i; na konci není dlouhá samohláska.",
    "W słowie 'předčit' występuje krótkie i; na końcu nie ma długiej samogłoski.",
    "У слові 'předčit' коротке i; наприкінці немає довгої голосної.",
    "В слове 'předčit' краткое i; в конце нет долгой гласной."
  ],
  "'výzkum' – prefix vý- requires the long vowel": [
    "Ve slově 'výzkum' vyžaduje předpona vý- dlouhou samohlásku.",
    "W słowie 'výzkum' przedrostek vý- wymaga długiej samogłoski.",
    "У слові 'výzkum' префікс vý- вимагає довгої голосної.",
    "В слове 'výzkum' приставка vý- требует долгой гласной."
  ],
  "'průzkum' – prefix prů- always has ů (long u)": [
    "Předpona prů- ve slově 'průzkum' má vždy ů (dlouhé u).",
    "Przedrostek prů- w słowie 'průzkum' zawsze zawiera ů (długie u).",
    "Префікс prů- у слові 'průzkum' завжди має ů (довге u).",
    "Приставка prů- в слове 'průzkum' всегда содержит ů (долгое u)."
  ],
  "'příčina' – long í in prefix pří- is required": [
    "Ve slově 'příčina' je v předponě pří- nutné dlouhé í.",
    "W słowie 'příčina' w przedrostku pří- wymagane jest długie í.",
    "У слові 'příčina' у префіксі pří- потрібне довге í.",
    "В слове 'příčina' в приставке pří- требуется долгое í."
  ],
  "'průběh' – prefix prů- always has the ů": [
    "Předpona prů- ve slově 'průběh' má vždy ů.",
    "Przedrostek prů- w słowie 'průběh' zawsze zawiera ů.",
    "Префікс prů- у слові 'průběh' завжди має ů.",
    "Приставка prů- в слове 'průběh' всегда содержит ů."
  ],
  "'součást' – č (háček) is required in this word": [
    "Ve slově 'součást' je nutné č s háčkem.",
    "W słowie 'součást' wymagane jest č z haczykiem.",
    "У слові 'součást' потрібна літера č з гачеком.",
    "В слове 'součást' нужна буква č с гачеком."
  ],
  "'příznivý' – long í in prefix pří- is essential": [
    "Ve slově 'příznivý' je dlouhé í v předponě pří- nezbytné.",
    "W słowie 'příznivý' długie í w przedrostku pří- jest niezbędne.",
    "У слові 'příznivý' довге í у префіксі pří- є обов'язковим.",
    "В слове 'příznivý' долгое í в приставке pří- обязательно."
  ],
  "'povinnost' – doubled nn is the correct form": [
    "Správný tvar slova 'povinnost' obsahuje nn.",
    "Poprawna forma słowa 'povinnost' zawiera podwójne nn.",
    "Правильна форма слова 'povinnost' містить подвоєне nn.",
    "Правильная форма слова 'povinnost' содержит двойное nn."
  ],
  "'objev' – short e; no long vowel in this noun": [
    "Ve slově 'objev' je krátké e; toto podstatné jméno nemá dlouhou samohlásku.",
    "W słowie 'objev' występuje krótkie e; ten rzeczownik nie ma długiej samogłoski.",
    "У слові 'objev' коротке e; у цьому іменнику немає довгої голосної.",
    "В слове 'objev' краткое e; в этом существительном нет долгой гласной."
  ],
  "'podmínka' – long í is required in this word": [
    "Ve slově 'podmínka' je nutné dlouhé í.",
    "W słowie 'podmínka' wymagane jest długie í.",
    "У слові 'podmínka' потрібне довге í.",
    "В слове 'podmínka' требуется долгое í."
  ],
  "'situace' – no diacritics; borrowed word keeps simple vowels": [
    "Slovo 'situace' nemá diakritiku; přejaté slovo si ponechává jednoduché samohlásky.",
    "Słowo 'situace' nie ma znaków diakrytycznych; zapożyczenie zachowuje zwykłe samogłoski.",
    "У слові 'situace' немає діакритики; запозичене слово зберігає звичайні голосні.",
    "В слове 'situace' нет диакритики; заимствованное слово сохраняет простые гласные."
  ],
  "'nepřípustný' – long í in the root -přípust-": [
    "Ve slově 'nepřípustný' je v kořeni -přípust- dlouhé í.",
    "W słowie 'nepřípustný' w rdzeniu -přípust- występuje długie í.",
    "У слові 'nepřípustný' у корені -přípust- пишеться довге í.",
    "В слове 'nepřípustný' в корне -přípust- пишется долгое í."
  ],
  "'podmíněnost' – long í in the root -mín-": [
    "Ve slově 'podmíněnost' je v kořeni -mín- dlouhé í.",
    "W słowie 'podmíněnost' w rdzeniu -mín- występuje długie í.",
    "У слові 'podmíněnost' у корені -mín- пишеться довге í.",
    "В слове 'podmíněnost' в корне -mín- пишется долгое í."
  ],
  "'zlegalizovat' – no extra length; borrowed root": [
    "Ve slově 'zlegalizovat' se délka nepřidává; jde o přejatý kořen.",
    "W słowie 'zlegalizovat' nie dodaje się długości; rdzeń jest zapożyczony.",
    "У слові 'zlegalizovat' додаткової довготи немає; корінь запозичений.",
    "В слове 'zlegalizovat' дополнительной долготы нет; корень заимствованный."
  ],
  "'nevyhnutelný' – suffix -telný has short e": [
    "V příponě -telný ve slově 'nevyhnutelný' je krátké e.",
    "W przyrostku -telný w słowie 'nevyhnutelný' występuje krótkie e.",
    "У суфіксі -telný у слові 'nevyhnutelný' пишеться коротке e.",
    "В суффиксе -telný в слове 'nevyhnutelný' пишется краткое e."
  ],
  "'bezprostřední' – short e, no long é here": [
    "Ve slově 'bezprostřední' je krátké e, nikoli dlouhé é.",
    "W słowie 'bezprostřední' występuje krótkie e, a nie długie é.",
    "У слові 'bezprostřední' коротке e, а не довге é.",
    "В слове 'bezprostřední' краткое e, а не долгое é."
  ],
  "'zprostředkovatel' – ř + ě are both required": [
    "Ve slově 'zprostředkovatel' jsou nutná ř i ě.",
    "W słowie 'zprostředkovatel' wymagane są zarówno ř, jak i ě.",
    "У слові 'zprostředkovatel' потрібні і ř, і ě.",
    "В слове 'zprostředkovatel' необходимы и ř, и ě."
  ],
  "'zpronevěřit' – ř (with háček) is essential": [
    "Ve slově 'zpronevěřit' je nezbytné ř s háčkem.",
    "W słowie 'zpronevěřit' niezbędne jest ř z haczykiem.",
    "У слові 'zpronevěřit' необхідна літера ř з гачеком.",
    "В слове 'zpronevěřit' необходима буква ř с гачеком."
  ],
  "'předpokládaný' – long á in the root -kláda-": [
    "Ve slově 'předpokládaný' je v kořeni -kláda- dlouhé á.",
    "W słowie 'předpokládaný' w rdzeniu -kláda- występuje długie á.",
    "У слові 'předpokládaný' у корені -kláda- пишеться довге á.",
    "В слове 'předpokládaný' в корне -kláda- пишется долгое á."
  ],
  "'nezpochybnitelný' – n without háček before -itelný": [
    "Ve slově 'nezpochybnitelný' je před příponou -itelný obyčejné n bez háčku.",
    "W słowie 'nezpochybnitelný' przed przyrostkiem -itelný występuje zwykłe n bez haczyka.",
    "У слові 'nezpochybnitelný' перед суфіксом -itelný пишеться звичайне n без гачека.",
    "В слове 'nezpochybnitelný' перед суффиксом -itelný пишется обычное n без гачека."
  ],
  "'bezpodmínečný' – long í in root -mín-": [
    "Ve slově 'bezpodmínečný' je v kořeni -mín- dlouhé í.",
    "W słowie 'bezpodmínečný' w rdzeniu -mín- występuje długie í.",
    "У слові 'bezpodmínečný' у корені -mín- пишеться довге í.",
    "В слове 'bezpodmínečný' в корне -mín- пишется долгое í."
  ],
  "'nepřiměřený' – ř in prefix při- is essential": [
    "Ve slově 'nepřiměřený' je v předponě při- nezbytné ř.",
    "W słowie 'nepřiměřený' ř w przedrostku při- jest niezbędne.",
    "У слові 'nepřiměřený' у префіксі při- необхідна літера ř.",
    "В слове 'nepřiměřený' в приставке při- необходима буква ř."
  ],
  "'zodpovědnost' – ě is required in -věd-": [
    "Ve slově 'zodpovědnost' je v části -věd- nutné ě.",
    "W słowie 'zodpovědnost' w części -věd- wymagane jest ě.",
    "У слові 'zodpovědnost' у частині -věd- потрібне ě.",
    "В слове 'zodpovědnost' в части -věd- необходимо ě."
  ],
  "'zdestabilizovat' – no long á; borrowed root": [
    "Ve slově 'zdestabilizovat' není dlouhé á; kořen je přejatý.",
    "W słowie 'zdestabilizovat' nie ma długiego á; rdzeń jest zapożyczony.",
    "У слові 'zdestabilizovat' немає довгого á; корінь запозичений.",
    "В слове 'zdestabilizovat' нет долгого á; корень заимствованный."
  ],
  "'svědomitost' – ě after sv- is correct": [
    "Ve slově 'svědomitost' je po sv- správně ě.",
    "W słowie 'svědomitost' po sv- poprawnie występuje ě.",
    "У слові 'svědomitost' після sv- правильно пишеться ě.",
    "В слове 'svědomitost' после sv- правильно пишется ě."
  ]
};

export function localizeExplanation(explanation, lang) {
  if (typeof explanation !== 'string' || lang === 'en') return explanation;
  const index = { cs: 0, pl: 1, uk: 2, ru: 3 }[lang];
  return index === undefined ? explanation : TRANSLATIONS[explanation]?.[index] ?? explanation;
}
