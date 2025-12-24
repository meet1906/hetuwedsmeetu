/**
 * 🛠 WEDDING CONTENT MANAGER
 * =========================
 * Use this file to update the Memories page at any time.
 * 
 * HOW TO USE:
 * 1. Update the 'MEMORIES_DATA' array below with your new content.
 * 2. Run this command in your terminal:
 *    node manage-memories.cjs YOUR_CLOUDINARY_API_SECRET
 * 
 * NOTE: 'YOUR_CLOUDINARY_API_SECRET' is EwHDM2wE-RBaTOqlDiLZAzzIcFQ
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

// --- FIREBASE CONFIG (Do not change) ---
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBZmHPTb7qSHQEcHbw_WBD-bnCOT6x6uRs",
  authDomain: "hetuwedsmeetu.firebaseapp.com",
  projectId: "hetuwedsmeetu",
  storageBucket: "hetuwedsmeetu.firebasestorage.app",
  messagingSenderId: "228775207252",
  appId: "1:228775207252:web:7c8ddf44c413c616d228c1"
};

// --- YOUR DATA (You can edit this!) ---
const MEMORIES_DATA = [
  {
    id: "welcome-ceremony",
    order: 1,
    title: "Welcome Ceremony",
    date: "13 & 15 Dec 2024",
    theme: "Home Welcoming",
    description: "13 Dec: Hetvi visited G2 901 Happy Glorious & 15 Dec: Meet visited Neelkamal. Family welcome, blessings, cake, and Gujarati snacks.",
    colors: "from-pink-300 to-purple-300",
    // These are public IDs from Cloudinary
    media: [
      { type: "photo", src: "wedding/welcome-ceremony/dsd5gtozjxurk1eyvkjl" },
      { type: "photo", src: "wedding/welcome-ceremony/heqid6r43fhnyf3e40ej" },
      { type: "photo", src: "wedding/welcome-ceremony/pdoua6ewo0ucmxyon822" },
      { type: "photo", src: "wedding/welcome-ceremony/lpjkm5s8urqz1pyrsoha" },
      { type: "photo", src: "wedding/welcome-ceremony/a3btanxdax0byi93btqq" },
      { type: "photo", src: "wedding/welcome-ceremony/eginnqht2k6bdobvp5kw" },
      { type: "photo", src: "wedding/welcome-ceremony/pmegvadws6lviyfzzlxq" },
      { type: "photo", src: "wedding/welcome-ceremony/iua2ahys2r5i60wxzmaa" },
      { type: "video", src: "wedding/welcome-ceremony/evknvwxwmelm2ksoruka" },
      { type: "video", src: "wedding/welcome-ceremony/cxuynhp1jacqy0k7vfvu" },
      { type: "video", src: "wedding/welcome-ceremony/prslp3axnyj4aga0e9bw" },
      { type: "photo", src: "wedding/welcome-ceremony/yppdrn1qggjyubbxwuho" },
      { type: "video", src: "wedding/welcome-ceremony/rtff4b1puzwa4skhq6br" },
      { type: "photo", src: "wedding/welcome-ceremony/nrvaafm4elo8upthuohp" },
      { type: "video", src: "wedding/welcome-ceremony/kuroxbfiqwihznawisl3" },
      { type: "photo", src: "wedding/welcome-ceremony/n1qj74xqxiiugpnxhdek" },
      { type: "video", src: "wedding/welcome-ceremony/nwwlwcdywri7kyolewpn" },
      { type: "photo", src: "wedding/welcome-ceremony/ko9rcofhf1hvdipyk2jf" },
      { type: "video", src: "wedding/welcome-ceremony/odpuudctw7lsgfxeljc5" },
      { type: "video", src: "wedding/welcome-ceremony/b1oeowwbre6b0wuywvsj" },
      { type: "photo", src: "wedding/welcome-ceremony/a53t50at3oeqe4mykbq1" },
      { type: "photo", src: "wedding/welcome-ceremony/pz2yedsbes95gtenzffz" },
      { type: "photo", src: "wedding/welcome-ceremony/kzqpbbkwvcv51dsafkiz" },
      { type: "photo", src: "wedding/welcome-ceremony/v76so88up38cjem32iek" },
      { type: "video", src: "wedding/welcome-ceremony/yi908eeen0slnoh3apwl" },
      { type: "photo", src: "wedding/welcome-ceremony/ovos1cvwexyge122zbx5" },
      { type: "video", src: "wedding/welcome-ceremony/dpyrsrhk6lt0uk6febkg" },
      { type: "photo", src: "wedding/welcome-ceremony/etrxtvvlsdssumfvbhtb" },
      { type: "photo", src: "wedding/welcome-ceremony/tz0s1rjtap7z6thxk3f8" },
      { type: "photo", src: "wedding/welcome-ceremony/vv8icqhfwc8fkfrlqjs8" }
    ]
  },
  {
    id: "engagement",
    order: 2,
    title: "Engagement",
    date: "9 Feb 2025",
    theme: "Ring Exchange",
    description: "The magical evening where we exchanged rings and promised forever.",
    colors: "from-purple-300 to-pink-300",
    media: [
      { type: "video", src: "https://youtu.be/sl02LXK0NHE?si=wWUIDqRKPp8o1aoP", isExternal: true },
      { type: "video", src: "https://youtu.be/La_PHwnouGw?si=HC08bogI0liNu1dd", isExternal: true },
      { type: "video", src: "wedding/engagement/faepaprtrgrtgzoywk0v" },
      { type: "photo", src: "wedding/engagement/jpyjjggnqlre0imtdy9q" },
      { type: "photo", src: "wedding/engagement/toqa3tf7tfwhxk27d4jp" },
      { type: "photo", src: "wedding/engagement/c4o48epcur9enrzpjhsn" },
      { type: "photo", src: "wedding/engagement/mzhzl5tpgledqby8xzh4" },
      { type: "photo", src: "wedding/engagement/pgpxwwrqgxlxxykutfey" },
      { type: "photo", src: "wedding/engagement/kf8mtuu2aecbi97bv9dl" },
      { type: "photo", src: "wedding/engagement/x5ve2fox6a1y0dxivaqf" },
      { type: "photo", src: "wedding/engagement/skj2b11yy3kgytp9fb5h" },
      { type: "photo", src: "wedding/engagement/ptj7lvs5cmxdvjrskkho" },
      { type: "photo", src: "wedding/engagement/cmqw4ayeksi1ayhys1a9" },
      { type: "photo", src: "wedding/engagement/j2ul9szar2lhhksti5jv" },
      { type: "photo", src: "wedding/engagement/st1wrkyaasekld3pnfxj" },
      { type: "photo", src: "wedding/engagement/wdg5nraj0oxqdxfbbje1" },
      { type: "photo", src: "wedding/engagement/sxi6aeiaeqragidfjjyf" },
      { type: "photo", src: "wedding/engagement/gtjtwiqxcwtlmqfmnpvw" },
      { type: "photo", src: "wedding/engagement/tl1rmsghuq2dkcbeu0sx" },
      { type: "photo", src: "wedding/engagement/hmdlxe0bm2mveqzjsskt" },
      { type: "photo", src: "wedding/engagement/qbn01yxvdkkixbvaqjza" },
      { type: "photo", src: "wedding/engagement/mke3ogz5xmth0lgj5fdf" },
      { type: "photo", src: "wedding/engagement/odqap0uhl5cetwpbdl3o" },
      { type: "photo", src: "wedding/engagement/u3cftnoq7lmli62qw2lm" },
      { type: "photo", src: "wedding/engagement/jnrcwco6sx4ts5ylumnk" },
      { type: "photo", src: "wedding/engagement/devjpqee5uahaqij8ymr" },
      { type: "photo", src: "wedding/engagement/elyanogzivxkcca8jjrq" },
      { type: "photo", src: "wedding/engagement/bvt54cv7vjphaafvhodc" },
      { type: "photo", src: "wedding/engagement/n8bistqr96wdm7609wom" }
    ]
  },
  {
    id: "shah-premier-league",
    order: 3,
    title: "Box Cricket - SPL",
    date: "12 July 2025",
    theme: "Cricket Showdown",
    description: "Family vs Family in the grand Shah Premier League tournament.",
    colors: "from-green-300 to-blue-300",
    media: [
      { type: "photo", src: "wedding/shah-premier-league/bwj52m7mz39wavxywydw" },
      { type: "photo", src: "wedding/shah-premier-league/e8x78bkd2o8v9m0m5jig" },
      { type: "photo", src: "wedding/shah-premier-league/oqlczfmwxaslujpu2fof" },
      { type: "video", src: "wedding/shah-premier-league/rdmesx4dtyb4hjj8mpba" },
      { type: "video", src: "wedding/shah-premier-league/ymsbfsjyqhu7ynlwikic" },
      { type: "video", src: "wedding/shah-premier-league/gqp7g0cymggrvs16py6n" },
      { type: "photo", src: "wedding/shah-premier-league/xkaeoqffaz029kw8wxkm" },
      { type: "video", src: "wedding/shah-premier-league/x6smkrfvzre3lnzuao6r" },
      { type: "photo", src: "wedding/shah-premier-league/qubqcrxytwl2gigecays" },
      { type: "video", src: "wedding/shah-premier-league/u7sltadhz752gdhcyqho" },
      { type: "photo", src: "wedding/shah-premier-league/nk9smtssoqvqxfsmnjjf" },
      { type: "video", src: "wedding/shah-premier-league/n9vdjxgvjwd4uv6sbmjs" },
      { type: "photo", src: "wedding/shah-premier-league/wzzbgy82yuts63hgduol" },
      { type: "video", src: "wedding/shah-premier-league/ndcpk0joxbtzuzcamioc" },
      { type: "photo", src: "wedding/shah-premier-league/enltmdopsiroffzdct9s" },
      { type: "video", src: "wedding/shah-premier-league/rynkvudrghbznhmpuppw" },
      { type: "photo", src: "wedding/shah-premier-league/wu0fum0ojcfrykhwyent" },
      { type: "video", src: "wedding/shah-premier-league/evviidg0b2qp4srbziyj" },
      { type: "photo", src: "wedding/shah-premier-league/sliebh7zjll7kci2aem2" },
      { type: "video", src: "wedding/shah-premier-league/sg7befeuyms9e8m3knqq" }
    ],
    scorecard: {
      matches: [
        { match: 1, teamMeet: "85/7", teamHetvi: "86/1", winner: "Team Hetvi" },
        { match: 2, teamMeet: "110/3", teamHetvi: "112/3", winner: "Team Hetvi" },
        { match: 3, teamMeet: "76/5", teamHetvi: "33/7", winner: "Team Hetvi" }
      ],
      finalWinner: "Team Hetvi",
      playerOfMatch: "Deep Shah (Team Hetvi), Yash Shah (Team Hetvi) & Parva Shah (Team Meet)",
      externalUrl: "https://cricheroes.com/tournament/1554550/shah-premier-league-/"
    }
  },
  {
    id: "hetvi-kankotri",
    order: 4,
    title: "Hetvi Kankotri Lekhan",
    date: "30 November 2025",
    theme: "Traditional Writing",
    description: "Celebrating the auspicious beginning of invitation writing at Hetvi's home.",
    colors: "from-pink-400 to-rose-100",
    media: [
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7361" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7363" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7388" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7394" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7404" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7422" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7429" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7438" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7445" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7446" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7448" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7449" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7450" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7451" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7456" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7468" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7475" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7480" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7519" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7561" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7569" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7576" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7593" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7601" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7606" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7623" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7652" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7657" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7659" },
      { type: "photo", src: "wedding/hetvi-kankotri/PSK_7664" }
    ] // Add Cloudinary IDs here later!
  },
  {
    id: "meet-kankotri",
    order: 5,
    title: "Meet Kankotri Lekhan",
    date: "07 December 2025",
    theme: "Traditional Writing",
    description: "Celebrating the auspicious beginning of invitation writing at Meet's home.",
    colors: "from-sky-400 to-blue-100",
    media: [] // Add Cloudinary IDs here later!
  }
];

// --- EXECUTION LOGIC ---
const app = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(app);

async function synchronize() {
  console.log('🚀 Syncing Wedding Memories to Cloud...');
  
  try {
    for (const data of MEMORIES_DATA) {
      await setDoc(doc(db, "memories", data.id), data);
      console.log(`✅ Synced: ${data.title} (Order: ${data.order})`);
    }
    console.log('\n✨ ALL DONE! Your website is now updated.');
  } catch (err) {
    console.error('❌ Sync Failed:', err.message);
  }
  process.exit(0);
}

synchronize();
