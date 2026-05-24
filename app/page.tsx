"use client";

import { useMemo, useState } from "react";

type Gender = "woman" | "man" | "monster" | "undead";
type Intensity = "brutal" | "grisly" | "legendary";
type Tone = "vicious" | "vulgar";

type Weapon = {
  name: string;
  family: "blade" | "axe" | "pierce" | "blunt" | "ranged" | "arcane";
  actions: string[];
  finishers: string[];
};

const weapons: Weapon[] = [
  {
    name: "Longsword",
    family: "blade",
    actions: ["cleaves", "carves", "drives a clean line through", "opens"],
    finishers: [
      "the steel rings once, then comes away slick and red",
      "blood sheets down the fuller and spatters across the killer's wrist",
      "the cut is so sharp the wound hangs open before the body understands it is dead"
    ]
  },
  {
    name: "Greatsword",
    family: "blade",
    actions: ["hews", "splits", "scythes through", "shears open"],
    finishers: [
      "the blow carries through with a wet, final weight",
      "a fan of blood paints the stones behind the corpse",
      "armor buckles inward as meat and bone give way together"
    ]
  },
  {
    name: "Dagger",
    family: "pierce",
    actions: ["punches into", "sinks beneath", "needles through", "rips across"],
    finishers: [
      "the blade vanishes to the hilt and comes back steaming",
      "blood bubbles out in quick, choking pulses",
      "the killer feels the last heartbeat shudder against the grip"
    ]
  },
  {
    name: "Rapier",
    family: "pierce",
    actions: ["threads through", "skewers", "pierces", "flicks into"],
    finishers: [
      "a thin red line becomes a sudden fountain",
      "the point exits with a bead of gore trembling on the tip",
      "the target folds around the wound, elegant only for the first heartbeat"
    ]
  },
  {
    name: "Battleaxe",
    family: "axe",
    actions: ["bites into", "chops through", "hooks and tears", "buries itself in"],
    finishers: [
      "the axe comes free with a hard twist and a black-red splash",
      "bone chips skip across the floor like thrown dice",
      "the edge drags a rope of gore after it"
    ]
  },
  {
    name: "Greataxe",
    family: "axe",
    actions: ["splits", "mangles", "nearly halves", "crashes through"],
    finishers: [
      "the corpse drops in pieces that arrive at the ground out of order",
      "the impact throws blood over everyone standing too close",
      "the haft jolts as the blade punches through bone and keeps going"
    ]
  },
  {
    name: "Warhammer",
    family: "blunt",
    actions: ["crushes", "caves in", "hammers flat", "pulverizes"],
    finishers: [
      "the sound is less a crack than a sack of wet stones bursting",
      "a spray of blood and pale fragments freckles the killer's armor",
      "the body hits the ground boneless where the blow landed"
    ]
  },
  {
    name: "Mace",
    family: "blunt",
    actions: ["smashes", "breaks", "staves in", "pounds apart"],
    finishers: [
      "the flanges come away clotted with hair, blood, and meat",
      "the wound collapses inward with an ugly sucking sound",
      "the last breath leaves as a red mist"
    ]
  },
  {
    name: "Spear",
    family: "pierce",
    actions: ["drives through", "pins", "punches into", "skewers"],
    finishers: [
      "the shaft kicks as the target's body spasms around it",
      "blood runs down the haft in hot ribbons",
      "the killer rips it free and the wound answers with a gush"
    ]
  },
  {
    name: "Arrow",
    family: "ranged",
    actions: ["slams into", "buries itself in", "punches through", "nails"],
    finishers: [
      "the fletching quivers while blood patters beneath it",
      "the target staggers one step, then drops as if the strings were cut",
      "the arrowhead exits with a wet snap and a brief red spray"
    ]
  },
  {
    name: "Crossbow Bolt",
    family: "ranged",
    actions: ["cracks into", "drills through", "blasts open", "pins"],
    finishers: [
      "the bolt punches through with brutal, mechanical certainty",
      "a thick spurt of blood follows the quarrel's path",
      "the impact twists the body sideways before it collapses"
    ]
  },
  {
    name: "Fire Spell",
    family: "arcane",
    actions: ["boils", "burns through", "chars", "bursts against"],
    finishers: [
      "fat hisses, blood steams, and the air tastes like iron and ash",
      "flame crawls inside the wound before the body falls",
      "the target's scream ends in a black cough of smoke"
    ]
  }
];

const bodyParts = [
  {
    label: "head",
    details: {
      blade: ["the skull from brow to jaw", "one side of the face, leaving a red ruin"],
      axe: ["the temple, popping the skull open like split firewood", "the jaw clean from its hinges"],
      pierce: ["one eye and out the back of the skull", "the open mouth, silencing the scream"],
      blunt: ["the crown of the skull, flattening it under the blow", "the face until teeth scatter in blood"],
      ranged: ["the eye socket", "the throat beneath the chin"],
      arcane: ["the face, blistering skin away in curling strips", "the eyes until they burst into steam"]
    }
  },
  {
    label: "neck",
    details: {
      blade: ["the throat in a red smile", "the neck so deeply the head lolls loose"],
      axe: ["the side of the neck, chopping through cord and bone", "the collar and spine in one savage bite"],
      pierce: ["the windpipe", "the hollow under the jaw"],
      blunt: ["the neck with a crack that folds the head backward", "the collarbone into jagged splinters"],
      ranged: ["the jugular", "the soft meat beside the spine"],
      arcane: ["the throat, filling it with fire and boiling blood"]
    }
  },
  {
    label: "chest",
    details: {
      blade: ["the ribs and opens the heart cage", "the sternum in a long red furrow"],
      axe: ["the breastbone, splitting ribs outward", "the upper torso with a butcher's finality"],
      pierce: ["the heart", "the lung, drawing a wet red gasp"],
      blunt: ["the ribs inward until organs rupture", "the sternum flat against the spine"],
      ranged: ["the heart", "the lung, pinning breath inside the body"],
      arcane: ["the chest, igniting cloth, hair, and blood at once"]
    }
  },
  {
    label: "gut",
    details: {
      blade: ["the belly, spilling loops of slick intestine", "the abdomen in a steaming red curtain"],
      axe: ["the hip and stomach together, tearing the body sideways", "the belly with a meat-cleaver crunch"],
      pierce: ["the stomach and out through the back", "deep under the ribs into vital softness"],
      blunt: ["the gut until something inside bursts", "the pelvis with a nauseating crack"],
      ranged: ["the belly, pinning torn entrails inside", "the kidney from behind"],
      arcane: ["the abdomen, boiling the blood under the skin"]
    }
  },
  {
    label: "arm",
    details: {
      blade: ["the weapon arm at the elbow", "the forearm, sending the hand spinning away"],
      axe: ["the shoulder joint, taking the arm in a red arc", "the bicep and bone beneath it"],
      pierce: ["the armpit and into the heart", "the wrist before sliding into the ribs"],
      blunt: ["the elbow backward until bone juts white", "the shoulder into a pulp of mail and meat"],
      ranged: ["the shoulder, turning the arm useless before the killing fall", "the hand and into the chest beyond"],
      arcane: ["the arm, cooking muscle until it sloughs from the bone"]
    }
  },
  {
    label: "leg",
    details: {
      blade: ["the thigh, opening the artery in a pumping red flood", "behind the knee, dropping the target instantly"],
      axe: ["the knee, nearly taking the leg off", "the femur with a crack you feel in your teeth"],
      pierce: ["the thigh artery", "the groin crease without lingering there, striking the artery deep"],
      blunt: ["the knee sideways, then the skull as the target falls", "the shin into splinters before the final collapse"],
      ranged: ["the thigh artery", "the kneecap, pitching the body into its own blood"],
      arcane: ["the legs, burning tendons until the body folds"]
    }
  },
  {
    label: "back",
    details: {
      blade: ["between the shoulder blades", "the spine in a dragging, red line"],
      axe: ["the spine, dropping the target like a felled tree", "the shoulder blade and ribs beneath it"],
      pierce: ["the back and through the heart", "the kidney with a deep, fatal twist"],
      blunt: ["the spine until it bends wrong", "the ribs from behind, bursting breath and blood forward"],
      ranged: ["between the shoulder blades", "the base of the skull"],
      arcane: ["the back, tracing the spine in a chain of black blisters"]
    }
  }
] as const;

const genderCopy: Record<Gender, { label: string; subject: string; possessive: string; trait: string[] }> = {
  woman: {
    label: "Woman",
    subject: "she",
    possessive: "her",
    trait: ["braids whip through the blood spray", "her final snarl dies as the blow lands"]
  },
  man: {
    label: "Man",
    subject: "he",
    possessive: "his",
    trait: ["his beard catches the first red droplets", "his final curse breaks into a choking gargle"]
  },
  monster: {
    label: "Monster",
    subject: "it",
    possessive: "its",
    trait: ["black ichor joins the red spray", "a bestial shriek turns into a bubbling whine"]
  },
  undead: {
    label: "Undead",
    subject: "it",
    possessive: "its",
    trait: ["old gore and grave dust puff from the wound", "dead flesh peels away in cold clumps"]
  }
};

const intensityCopy: Record<Intensity, string[]> = {
  brutal: [
    "It is fast, ugly, and final.",
    "The corpse drops hard, leaving a spreading pool beneath it."
  ],
  grisly: [
    "Blood gushes in hot pulses, splattering the attacker from wrist to shoulder.",
    "The body twitches twice before going still in the mess."
  ],
  legendary: [
    "The table goes silent for a heartbeat as the kill paints the battlefield in red.",
    "Bystanders taste copper in the air, and the attacker is left wearing the proof."
  ]
};

const vulgarCopy: Record<Intensity, string[]> = {
  brutal: [
    "The body drops hard, shitting blood onto the floorboards.",
    "A hot stink of blood and ruptured gut rolls off the corpse.",
    "The last breath comes out as a wet, obscene choke.",
    "Blood pours out fast enough to soak the killer's boots.",
    "The corpse lands open, leaking dark red filth into the dirt.",
    "The wound pumps once, twice, then gives up in a thick spill.",
    "A red spit of breath flecks the killer's face.",
    "The body jerks and empties itself in a foul, final mess."
  ],
  grisly: [
    "Blood sheets down in ropes, hot enough to steam in the cold air.",
    "The killer is left slick with gore, piss, and arterial spray.",
    "A foul brown-red stink rises as the body loses control.",
    "Chunks of meat slide free and slap wetly against the ground.",
    "Blood bubbles from the wound in thick, choking bursts.",
    "The corpse twitches in a widening pool of red and black.",
    "The impact leaves a smear of meat across armor and stone.",
    "The wound opens wider with every dying spasm.",
    "A spray of blood, spit, and broken teeth catches the nearest face.",
    "The body collapses around the injury, leaking from too many places at once."
  ],
  legendary: [
    "The kill leaves the body ruined beyond recognition, a sack of split meat and exposed bone.",
    "The attacker stands in the splash zone, painted with blood, bile, and brain matter.",
    "For a second, the fight stalls around the filthy sound of the body coming apart.",
    "The corpse hits in pieces, each one wet enough to leave its own stain.",
    "The wound keeps draining after the body stops moving.",
    "A curtain of hot gore marks the wall, the floor, and anyone close enough to swear about it.",
    "The smell is immediate: copper, shit, burned hair, and opened stomach.",
    "The final spasm throws one last spray across the battlefield.",
    "The body is no longer a person so much as evidence.",
    "What remains would need a bucket, a shovel, and someone with a strong stomach."
  ]
};

const vulgarTransitions = [
  "The sound is thick and intimate.",
  "The force of it drives gore outward.",
  "There is no clean edge to the damage.",
  "The wound yawns open under the hit.",
  "The body answers with blood and bile.",
  "The impact turns resistance into meat.",
  "The killing stroke lands without mercy.",
  "The air fills with copper and shit."
];

const vulgarReactions: Record<Gender, string[]> = {
  woman: [
    "She tries to curse, but blood floods her mouth.",
    "She drops with her hands slipping in the hot mess beneath her.",
    "Her final breath tears loose as a red gargle.",
    "She folds around the wound and goes down hard."
  ],
  man: [
    "He tries to curse, but it comes out as a red gargle.",
    "His knees buckle while blood runs down his chin.",
    "He grabs at the wound like he can hold himself together.",
    "His last breath sprays out between clenched teeth."
  ],
  monster: [
    "It shrieks until the sound drowns in its own fluids.",
    "It thrashes once, smearing ichor across the ground.",
    "Its jaws snap at nothing while the wound pumps dark gore.",
    "It dies loud, filthy, and leaking."
  ],
  undead: [
    "It collapses in a heap of old meat and grave stink.",
    "Dry rot and black gore spill out together.",
    "Its jaw keeps working after the rest of it gives up.",
    "It dies again, somehow even less gracefully."
  ]
};

const vulgarBodyDetails: Record<Weapon["family"], string[]> = {
  blade: [
    "splits the face open and leaves one eyeball hanging in the ruin",
    "opens the belly and dumps steaming guts into the dirt",
    "parts the throat so wide the last curse spills out in blood",
    "slices through the cheek and sends teeth skittering across the floor",
    "rips across the chest and peels armor, cloth, and meat together",
    "cuts under the ribs and lets the lungs sag out in a wet red mess",
    "splits the nose, lips, and jaw into something no healer wants to touch",
    "shears through the wrist and leaves the hand flopping in the dirt",
    "slashes the thigh open until blood pumps down the leg in hot ropes",
    "carves a deep red trench from collarbone to hip",
    "slashes low across the groin and drops the target in a screaming spray of blood",
    "opens the scalp and peels it back in a wet flap"
  ],
  axe: [
    "splits the skull and spatters brains across the nearest shield",
    "takes the jaw loose in a wet chunk of teeth and tongue",
    "bites deep enough to make ribs pop like snapped kindling",
    "chops into the shoulder and nearly takes the arm with it",
    "buries itself in the chest and cracks the ribs apart like rotten boards",
    "hooks the neck and tears it open in a thick red grin",
    "cleaves the hip so hard the body folds sideways",
    "opens the back and drags a rope of gore out with the blade",
    "hacks through the knee and leaves the leg hanging wrong",
    "punches through the breastbone with a butcher's crack",
    "splits the groin and pelvis in a spray of blood and bone",
    "takes the scalp and skull together in one wet chunk"
  ],
  pierce: [
    "drives straight through the eyeball and punches out the back of the skull",
    "slips under the ribs and turns the heart into red slurry",
    "opens a hole that jets blood with every dying twitch",
    "stabs through the mouth and pins the tongue in a choking mess",
    "punches into the throat and makes every breath a bubbling failure",
    "slides into the kidney and twists until the legs give out",
    "spears the lung and fills the next gasp with blood",
    "punches through the cheek and out behind the ear",
    "buries itself in the gut and comes back dragging slick strands",
    "drives through the armpit and finds the heart from the side",
    "stabs low into the groin and makes the legs buckle in a red rush",
    "punches through the lower belly and comes out slick with shit and blood"
  ],
  blunt: [
    "caves the skull in and sprays brains over the killer's boots",
    "smashes teeth down the throat in a choking red cough",
    "folds the ribs inward with a wet crunch until something inside bursts",
    "crushes the face into a bloody crater",
    "breaks the jaw so badly it hangs like a ruined hinge",
    "hammers the knee sideways and drops the body screaming into the dirt",
    "pulverizes the collarbone into white chips under the skin",
    "drives the sternum inward until the chest stops being chest-shaped",
    "snaps the neck with a crack sharp enough to quiet the room",
    "bursts the nose, teeth, and cheekbones into one red mess",
    "crushes the pelvis with a deep, ugly crack",
    "smashes the groin hard enough to drop the target mid-scream"
  ],
  ranged: [
    "punches through the eyeball and nails the skull from the inside",
    "tears through the throat and leaves blood bubbling in the wound",
    "opens the chest in a ragged little fountain",
    "buries itself in the lung and makes the next breath come out pink",
    "cracks through the cheekbone and exits in a spray of teeth",
    "pins the hand to the ribs before the body realizes it is dead",
    "drives through the neck and sends blood pulsing down the shaft",
    "hits the gut and leaves the target clutching a leaking hole",
    "splits the kneecap and pitches the body face-first into the dirt",
    "takes them under the jaw and snaps the head back hard",
    "punches low through the pelvis and leaves blood running down both legs",
    "buries itself in the lower belly and leaks filth around the shaft"
  ],
  arcane: [
    "boils the eyes until they burst and run down the face",
    "cooks the lungs into a choking black froth",
    "pops skin, blood, and meat in a reeking flash",
    "burns the mouth open around a scream that turns into smoke",
    "splits the belly with pressure and spills steaming gore",
    "sears the chest until the ribs show through blackened meat",
    "blasts the jaw loose in a burst of sparks and blood",
    "turns the veins bright for one awful second before they rupture",
    "chars the hands into claws while the body drops",
    "bursts the throat from the inside in a spray of steam and red mist",
    "boils the bowels until the body ruptures and spills foul steam",
    "burns through the groin and belly in a reeking blast of blood and shit"
  ]
};

const vulgarScenes: Record<Weapon["family"], string[]> = {
  blade: [
    "The {weapon} opens the target from collarbone to gut; ribs show through the split, wet meat slides loose, and blood runs down the blade in thick black-red strings.",
    "The {weapon} cuts across the face and takes an eye with it; the socket gushes, teeth spill out, and the target drops choking on blood and broken tongue.",
    "The {weapon} saws through the throat in one savage pull; hot blood dumps down the chest while the head lolls half-attached on a flap of meat.",
    "The {weapon} punches under the ribs and rips sideways; stomach, bile, and shit-slick intestine spill into the open as the body folds around the wound.",
    "The {weapon} slashes low through the pelvis; the target collapses screaming, blood pouring down both legs before the scream turns into a wet gargle.",
    "The {weapon} carves through the jaw and cheek, leaving the mouth hanging open in a ruined flap while spit, teeth, and blood spray across the floor.",
    "The {weapon} splits the scalp and skull; the cut opens wide enough to show pale bone, dark brain matter, and a pulsing mess that should have stayed inside.",
    "The {weapon} takes the arm near the elbow, then bites into the chest on the follow-through; blood fans out while the severed hand keeps twitching in the dirt."
  ],
  axe: [
    "The {weapon} crashes into the skull and buries deep; bone pops, brains splash across the haft, and the body drops with its head caved into a red bowl.",
    "The {weapon} hooks under the jaw and rips upward; teeth, tongue, and throat meat tear free in one filthy strip as blood pumps down the front.",
    "The {weapon} splits the chest open with a butcher's crack; ribs spring apart, lungs sag in the gap, and the heart gives one obscene kick before going still.",
    "The {weapon} chops through the belly and hip together; guts spill over the beltline, slick with bile and shit, while the target folds into the mess.",
    "The {weapon} takes the knee apart and keeps going into the thigh; the leg hangs by meat, the artery sprays, and the body hits the ground screaming.",
    "The {weapon} bites into the neck and shoulder so hard the head jerks sideways; blood blasts over the killer's hands as the spine gives a final crack.",
    "The {weapon} splits the pelvis with a wet, deep crunch; the target drops immediately, leaking blood and piss into the dirt.",
    "The {weapon} tears down the back and opens the spine; gore drags out behind the blade in a rope while the body collapses boneless."
  ],
  pierce: [
    "The {weapon} drives straight through the eyeball and out the back of the skull; the eye bursts around the steel and blood runs down the face in thick lines.",
    "The {weapon} slides under the ribs and twists in the heart; the target coughs a mouthful of blood, then empties out in a hot red rush.",
    "The {weapon} punches through the throat and pins the scream in place; every breath becomes a bubbling spray until the body drops.",
    "The {weapon} enters low in the belly and comes out fouled with shit and dark blood; the target doubles over, clutching the hole as guts slide between the fingers.",
    "The {weapon} spears through the mouth and out below the ear; teeth crack against the shaft while blood pours over the lips.",
    "The {weapon} drives into the kidney and twists; the legs fail, piss runs down one boot, and the target collapses in a shaking heap.",
    "The {weapon} punches through the lung and stays there; the next breath comes out as pink foam and a wet little whistle.",
    "The {weapon} thrusts up beneath the jaw into the skull; the target stiffens, shudders, and leaks blood from the nose and mouth."
  ],
  blunt: [
    "The {weapon} caves the face inward; the nose vanishes, teeth shoot down the throat, and the skull gives under the blow with a heavy wet crack.",
    "The {weapon} smashes the temple flat; brains and bone fragments spit sideways while the body drops like the strings were cut.",
    "The {weapon} drives the sternum into the organs beneath; ribs fold inward, lungs rupture, and blood erupts from the mouth in a thick spray.",
    "The {weapon} crushes the pelvis with a deep crack; the target screams once, then collapses leaking blood, piss, and worse.",
    "The {weapon} hammers the knee backward and follows into the skull as the target falls; bone breaks twice, and the second sound is wetter.",
    "The {weapon} breaks the jaw loose from the face; it hangs crooked while blood and spit pour over the chest.",
    "The {weapon} pulps the shoulder into armor, bone, and meat; the arm goes limp while the shock tears a red cough from the lungs.",
    "The {weapon} lands on the crown of the head and drives everything downward; the body folds, the skull caves, and gore spatters the killer's boots."
  ],
  ranged: [
    "The {weapon} punches through the eye socket and rattles inside the skull; blood and jelly run down the cheek before the body drops.",
    "The {weapon} tears through the throat and exits in a red spray; the target clutches at the hole while blood bubbles between the fingers.",
    "The {weapon} buries itself in the lung; the target tries to breathe and only manages a froth of blood, spit, and panic.",
    "The {weapon} drives through the belly and pins a loop of intestine against the spine; the body folds around the shaft and leaks foul red-brown fluid.",
    "The {weapon} cracks through the cheekbone and exits with teeth behind it; the mouth collapses into a bloody, choking ruin.",
    "The {weapon} punches low through the pelvis; blood runs down both legs as the target drops hard and shaking.",
    "The {weapon} enters beneath the jaw and snaps the head back; blood pours from the mouth before the body even hits the ground.",
    "The {weapon} takes the kneecap apart, then the fall drives bone through skin; the target lands face-first in their own blood."
  ],
  arcane: [
    "The {weapon} boils the eyes until they burst; fluid runs down the face while the skull blackens and the mouth fills with smoke.",
    "The {weapon} detonates inside the chest; ribs flare outward, cooked lung matter sprays free, and the corpse hits the ground steaming.",
    "The {weapon} cooks the belly from within; the abdomen splits, releasing blood, bile, and a reeking burst of shit-stained steam.",
    "The {weapon} burns through the throat and mouth; the scream becomes smoke, then blood, then nothing.",
    "The {weapon} flashes under the skin and ruptures every vein it touches; red mist blooms from the eyes, nose, and gums.",
    "The {weapon} sears the pelvis and gut in one blast; meat sloughs away while the target collapses in a foul, steaming heap.",
    "The {weapon} chars the face down to bone; teeth crack from the heat and the eyes run like wax.",
    "The {weapon} fills the lungs with fire; the target coughs black foam and blood until the body finally stops twitching."
  ]
};

const genderedVulgarScenes: Partial<Record<Gender, Partial<Record<Weapon["family"], string[]>>>> = {
  woman: {
    blade: [
      "The {weapon} cuts across her painted mouth and cheek, splitting her face into a red ruin; teeth, spit, and blood spill down her chin before she hits the ground.",
      "The {weapon} opens her from ribs to belly; her hair whips forward into the blood spray as hot guts slide out over her belt.",
      "The {weapon} takes her throat in a brutal line; her scream breaks into a wet hiss while blood pours down her front.",
      "The {weapon} splits her skull beneath the hairline; one eye goes glassy, the other fills with blood as she drops.",
      "The {weapon} slashes through her thigh and deep into the artery; she goes down hard, kicking in the dirt while blood soaks both legs."
    ],
    axe: [
      "The {weapon} bites through her collar and shoulder; bone cracks under the blade and her hair sticks to the gore pouring down her chest.",
      "The {weapon} splits her head at the temple; blood mats her hair instantly and brain matter spatters the killer's hands.",
      "The {weapon} chops into her ribs and wrenches free with a wet pull, dragging meat and cloth with it.",
      "The {weapon} hooks her under the jaw and tears upward; her mouth comes apart in a spray of teeth and blood.",
      "The {weapon} cleaves through her hip; she folds sideways and hits the ground with a filthy, broken scream."
    ],
    pierce: [
      "The {weapon} punches through her eye and out the back of her skull; blood runs through her lashes while her body goes slack.",
      "The {weapon} slides under her ribs and twists; her breath turns to red foam before she collapses onto the blade.",
      "The {weapon} stabs through her throat; she claws at the shaft, choking as blood bubbles over her fingers.",
      "The {weapon} drives into her belly and comes back fouled with bile and shit; she doubles over, gagging blood onto the floor.",
      "The {weapon} pierces beneath her jaw and drives up into the skull; her knees buckle before the killer rips it free."
    ],
    blunt: [
      "The {weapon} caves in her face; her nose and teeth collapse inward and blood sprays from the ruin of her mouth.",
      "The {weapon} smashes her temple with a wet crack; hair, blood, and bone fragments slap across the killer's arm.",
      "The {weapon} crushes her ribs flat; she folds around the impact, coughing blood down her front.",
      "The {weapon} breaks her jaw loose; it hangs crooked while she chokes on spit and blood.",
      "The {weapon} drives her into the floor hard enough to crack bone; she lands on her ass, twitching in a spreading pool."
    ],
    ranged: [
      "The {weapon} punches through her eye socket; blood and jelly track down her cheek before she falls backward.",
      "The {weapon} tears through her throat and exits in a red spray; she clutches the hole until her hands go slack.",
      "The {weapon} buries itself in her lung; her next breath is a bubbling mess of blood and panic.",
      "The {weapon} hits her belly and pins torn intestine inside; she folds over it, gagging on the stink of opened gut.",
      "The {weapon} cracks through her cheekbone and sends teeth across the floor."
    ],
    arcane: [
      "The {weapon} boils the blood in her face; her eyes burst, her hair smokes, and she drops screaming through a mouth full of steam.",
      "The {weapon} detonates inside her chest; ribs flare outward and cooked lung matter spatters the ground.",
      "The {weapon} cooks her belly until it splits; bile and shit-stained steam roll out with the blood.",
      "The {weapon} burns through her throat; the scream dies as smoke and blood pour from her mouth.",
      "The {weapon} chars her face down to bone; teeth crack in the heat and her eyes run down her cheeks."
    ]
  },
  man: {
    blade: [
      "The {weapon} carves through his beard and jaw, opening his mouth sideways; teeth and blood spill down his chest as he drops.",
      "The {weapon} opens his gut from belt to sternum; his hands go to the wound, but only come away full of slippery intestine.",
      "The {weapon} cuts his throat so deep his last curse sprays out in red mist.",
      "The {weapon} splits his skull above the brow; his eyes roll back while brain matter leaks into his beard.",
      "The {weapon} slashes through his thigh; blood pumps over his boot while he falls flat on his ass."
    ],
    axe: [
      "The {weapon} crashes into his bearded jaw and tears half of it loose; blood, teeth, and tongue hit the floor together.",
      "The {weapon} splits his skull down through the brow; his beard catches the blood as his face caves open.",
      "The {weapon} chops into his chest with a butcher's crack; ribs spring apart and his lungs sag into the gap.",
      "The {weapon} buries in his shoulder and rips free, dragging meat and mail in one filthy strip.",
      "The {weapon} splits his pelvis; he drops instantly, leaking blood and piss into the dirt."
    ],
    pierce: [
      "The {weapon} drives through his eye and out the back of his skull; he stiffens, then drops with blood pouring into his beard.",
      "The {weapon} slips between his ribs and twists in the heart; his final breath erupts as a thick red cough.",
      "The {weapon} punches through his throat and pins the curse in place.",
      "The {weapon} enters low in his belly and comes out slick with shit and blood; he folds over it, gagging.",
      "The {weapon} thrusts up beneath his jaw into the skull; his knees buckle before the killer yanks it free."
    ],
    blunt: [
      "The {weapon} caves his face inward; beard, teeth, and blood mash together under the blow.",
      "The {weapon} smashes his temple flat; bone chips and brain matter spray across the killer's armor.",
      "The {weapon} drives his sternum into his organs; he coughs blood hard enough to paint his beard red.",
      "The {weapon} breaks his jaw loose and sends him sprawling on his ass, choking on broken teeth.",
      "The {weapon} crushes his pelvis with a deep crack; he drops hard, pissing blood into the dirt."
    ],
    ranged: [
      "The {weapon} punches through his eye socket and rattles inside the skull; blood runs into his beard as he falls.",
      "The {weapon} tears through his throat; he clutches the hole while blood bubbles between his fingers.",
      "The {weapon} buries itself in his lung; his next breath is pink foam and a wet, useless wheeze.",
      "The {weapon} hits his gut and pins a loop of intestine against the spine.",
      "The {weapon} cracks through his cheekbone and exits with teeth behind it."
    ],
    arcane: [
      "The {weapon} boils his eyes until they burst; blood and fluid run into his beard while smoke pours from his mouth.",
      "The {weapon} detonates in his chest; ribs flare outward and cooked lung matter sprays free.",
      "The {weapon} cooks his belly until it splits, dumping blood, bile, and shit-stained steam.",
      "The {weapon} burns through his throat; his curse turns into smoke and red foam.",
      "The {weapon} chars his jaw and beard into a blackened mess before his body drops."
    ]
  }
};

const vulgarAftermath: Record<Intensity, string[]> = {
  brutal: [
    "The killer is left spattered from wrist to chest, breathing through the stink of blood and opened organs.",
    "A dark pool spreads under the corpse, thick with clots and bits of meat.",
    "The body gives one last twitch and leaks quietly into the dirt.",
    "The smell hits immediately: copper, piss, and hot viscera."
  ],
  grisly: [
    "Blood patters off armor and onto the floor while the corpse empties itself in ugly little pulses.",
    "Anyone close enough gets flecked with gore, spit, and the warm spray of arterial blood.",
    "The body keeps draining after death, turning the ground slick and black-red.",
    "The corpse spasms once, forcing more blood and bile out through the wound."
  ],
  legendary: [
    "For a moment the battlefield is silent except for dripping blood and the wet slide of ruined anatomy settling into place.",
    "The kill leaves a fan of gore across the scene, as if the body burst open just to mark the killer's work.",
    "What remains is barely a corpse: split meat, exposed bone, and enough filth to make hardened soldiers gag.",
    "The attacker stands in the mess, painted with blood, bile, and brain matter."
  ]
};

function pick<T>(items: readonly T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function capitalize(text: string) {
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

function generateDeathBlow(weapon: Weapon, gender: Gender, intensity: Intensity, tone: Tone) {
  const part = pick(bodyParts);
  const action = pick(weapon.actions);
  const detail = pick(part.details[weapon.family]);

  if (tone === "vulgar") {
    const genderScenes = genderedVulgarScenes[gender]?.[weapon.family] ?? [];
    const scenePool = genderScenes.length > 0 && Math.random() < 0.75 ? genderScenes : vulgarScenes[weapon.family];
    const scene = pick(scenePool).replace("{weapon}", weapon.name.toLowerCase());
    const closer = pick(vulgarAftermath[intensity]);

    return [scene, closer].join(" ");
  }

  const finish = pick(weapon.finishers);
  const trait = pick(genderCopy[gender].trait);
  const closer = pick(intensityCopy[intensity]);
  const subject = genderCopy[gender].subject;

  return [
    `The ${weapon.name.toLowerCase()} ${action} ${detail}.`,
    `${capitalize(trait)}; ${subject} reels as ${finish}.`,
    closer
  ].join(" ");
}

export default function HomePage() {
  const [weaponName, setWeaponName] = useState(weapons[0].name);
  const [gender, setGender] = useState<Gender>("monster");
  const [intensity, setIntensity] = useState<Intensity>("grisly");
  const [tone, setTone] = useState<Tone>("vulgar");
  const [history, setHistory] = useState<string[]>([
    "Choose a weapon and target, then roll the killing blow."
  ]);

  const selectedWeapon = useMemo(
    () => weapons.find((weapon) => weapon.name === weaponName) ?? weapons[0],
    [weaponName]
  );

  function roll() {
    setHistory((current) => [
      generateDeathBlow(selectedWeapon, gender, intensity, tone),
      ...current.slice(0, 7)
    ]);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[23rem_1fr]">
      <aside className="death-panel p-5">
        <div className="mb-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blood">D&D table tool</p>
          <h1 className="mt-2 text-3xl font-black leading-tight text-bone">Death Blow Generator</h1>
        </div>

        <div className="grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-bone/80">Weapon</span>
            <select
              className="control"
              value={weaponName}
              onChange={(event) => setWeaponName(event.target.value)}
            >
              {weapons.map((weapon) => (
                <option key={weapon.name}>{weapon.name}</option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-bone/80">Target</span>
            <select
              className="control"
              value={gender}
              onChange={(event) => setGender(event.target.value as Gender)}
            >
              {Object.entries(genderCopy).map(([value, copy]) => (
                <option key={value} value={value}>
                  {copy.label}
                </option>
              ))}
            </select>
          </label>

          <fieldset className="grid gap-2">
            <legend className="text-sm font-bold text-bone/80">Gore Level</legend>
            <div className="grid grid-cols-3 gap-2">
              {(["brutal", "grisly", "legendary"] as const).map((level) => (
                <button
                  key={level}
                  className={`segmented ${intensity === level ? "segmented-active" : ""}`}
                  type="button"
                  onClick={() => setIntensity(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="grid gap-2">
            <legend className="text-sm font-bold text-bone/80">Table Tone</legend>
            <div className="grid grid-cols-2 gap-2">
              {(["vicious", "vulgar"] as const).map((level) => (
                <button
                  key={level}
                  className={`segmented ${tone === level ? "segmented-active" : ""}`}
                  type="button"
                  onClick={() => setTone(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </fieldset>

          <button className="roll-button" type="button" onClick={roll}>
            Roll Killing Blow
          </button>
        </div>
      </aside>

      <section className="grid gap-4">
        <div className="rounded-md border border-bone/15 bg-night/70 p-5 shadow-quest">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-rust">Current roll</p>
              <h2 className="mt-1 text-xl font-black text-bone">
                {selectedWeapon.name} vs. {genderCopy[gender].label}
              </h2>
            </div>
            <span className="rounded bg-blood px-3 py-1 text-sm font-black uppercase text-bone">
              {intensity} / {tone}
            </span>
          </div>
          <p className="mt-5 text-2xl font-black leading-snug text-bone sm:text-3xl">
            {history[0]}
          </p>
        </div>

        <div className="grid gap-3">
          {history.slice(1).map((entry, index) => (
            <article
              className="rounded-md border border-bone/10 bg-night/45 p-4 text-bone/80"
              key={`${entry}-${index}`}
            >
              {entry}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
