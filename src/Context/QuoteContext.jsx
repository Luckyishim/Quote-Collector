import { createContext, useContext, useReducer, useEffect } from 'react';

// Context for sharing quotes
const QuoteContext = createContext();

// Save quotes array to localStorage
const saveQuotes = (quotes) => {
  try {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  } catch (error) {
    console.error('Error saving quotes:', error);
  }
};

// Load quotes array from localStorage
const loadQuotes = () => {
  try {
    const storedQuotes = localStorage.getItem('quotes');
    return storedQuotes ? JSON.parse(storedQuotes) : [];
  } catch (error) {
    console.error('Error loading quotes:', error);
    return [];
  }
};

// Sample quotes 
const sampleQuotes = [
  {
    "id": "1",
    "text": "Strength isn't about never falling down. It's about getting up every time you do, dusting yourself off, and choosing to try again.",
    "author": "Marcus Chen",
    "tags": ["Be Strong", "Self-Development", "Life"],
    "favorite": true,
    "createdAt": "2025-08-01T08:30:00Z",
    "type": "quote"
  },
  {
    "id": "2",
    "text": "The most beautiful thing about acceptance is that it doesn't mean giving up on growth. It means loving yourself enough to start from where you are.",
    "tags": ["Accept yourself", "Self-Development", "Inner Peace"],
    "favorite": false,
    "createdAt": "2025-08-01T14:15:00Z",
    "type": "writing"
  },
  {
    "id": "3",
    "text": "Trust the process, even when you can't see the whole staircase. Every step forward is still progress.",
    "author": "Sarah Williams",
    "tags": ["Trust", "Self-Development", "Life"],
    "favorite": true,
    "createdAt": "2025-08-02T09:45:00Z",
    "type": "quote"
  },
  {
    "id": "4",
    "text": "Being an introvert isn't a limitation; it's a superpower. You recharge in solitude, think deeply before speaking, and find magic in quiet moments others miss.",
    "tags": ["Introvert", "Accept yourself", "Be Strong"],
    "favorite": false,
    "createdAt": "2025-08-02T16:20:00Z",
    "type": "writing"
  },
  {
    "id": "5",
    "text": "Forgiveness is not about forgetting. It's about freeing yourself from the prison of resentment.",
    "author": "Dr. Maya Patel",
    "tags": ["Forgiveness", "Inner Peace", "Life"],
    "favorite": true,
    "createdAt": "2025-08-03T11:30:00Z",
    "type": "quote"
  },
  {
    "id": "6",
    "text": "Your overthinking mind is trying to protect you, but sometimes protection becomes a cage. Thank your mind for caring, then gently set the thoughts free.",
    "tags": ["Overthinking", "Mindfulness", "Inner Peace"],
    "favorite": false,
    "createdAt": "2025-08-03T19:10:00Z",
    "type": "writing"
  },
  {
    "id": "7",
    "text": "Depression is not a sign of weakness. It takes incredible strength to keep going when your mind is telling you to stop.",
    "author": "James Morrison",
    "tags": ["Depression", "Be Strong", "Accept yourself"],
    "favorite": true,
    "createdAt": "2025-08-04T07:25:00Z",
    "type": "quote"
  },
  {
    "id": "8",
    "text": "Success isn't about reaching the destination faster than everyone else. It's about enjoying the journey and becoming who you're meant to be along the way.",
    "tags": ["Success", "Self-Development", "Life"],
    "favorite": false,
    "createdAt": "2025-08-04T13:50:00Z",
    "type": "writing"
  },
  {
    "id": "9",
    "text": "A true leader doesn't create followers; they create more leaders.",
    "author": "Elena Rodriguez",
    "tags": ["Leadership", "Success"],
    "favorite": true,
    "createdAt": "2025-08-05T10:15:00Z",
    "type": "quote"
  },
  {
    "id": "10",
    "text": "Hustle without purpose is just exhaustion wearing a motivational mask. Find your why first, then give it everything you've got.",
    "tags": ["Hustling", "Success", "Self-Development"],
    "favorite": false,
    "createdAt": "2025-08-05T17:35:00Z",
    "type": "writing"
  },
  {
    "id": "11",
    "text": "Life doesn't get easier; you get stronger. Every challenge is a chance to level up.",
    "tags": ["Life", "Be Strong", "Self-Development"],
    "favorite": true,
    "createdAt": "2025-08-06T08:40:00Z",
    "type": "quote"
  },
  {
    "id": "12",
    "text": "Karma isn't about revenge. It's about understanding that what you put into the world comes back to you, so choose your energy wisely.",
    "author": "Ancient Wisdom",
    "tags": ["Karma", "Life", "Mindfulness"],
    "favorite": false,
    "createdAt": "2025-08-06T15:20:00Z",
    "type": "writing"
  },
  {
    "id": "13",
    "text": "Mindfulness is not about emptying your mind. It's about becoming aware of what's already there without judgment.",
    "author": "Dr. Lin Chang",
    "tags": ["Mindfulness", "Inner Peace", "Self-Development"],
    "favorite": true,
    "createdAt": "2025-08-07T09:30:00Z",
    "type": "quote"
  },
  {
    "id": "14",
    "text": "Inner peace isn't found in the absence of chaos. It's discovered in your ability to remain calm within the storm.",
    "tags": ["Inner Peace", "Be Strong", "Mindfulness"],
    "favorite": false,
    "createdAt": "2025-08-07T18:45:00Z",
    "type": "writing"
  },
  {
    "id": "15",
    "text": "Discipline is choosing between what you want now and what you want most.",
    "author": "Abraham Lincoln",
    "tags": ["Discipline", "Success", "Self-Development"],
    "favorite": true,
    "createdAt": "2025-08-08T06:50:00Z",
    "type": "quote"
  },
  {
    "id": "16",
    "text": "Your body is not just a vessel; it's your home. Treat it with the respect and care it deserves through movement, nourishment, and rest.",
    "tags": ["Fitness", "Self-Development", "Tips to be Happy"],
    "favorite": false,
    "createdAt": "2025-08-08T14:25:00Z",
    "type": "writing"
  },
  {
    "id": "17",
    "text": "Happiness isn't a destination you arrive at. It's a way of traveling through life.",
    "tags": ["Tips to be Happy", "Life", "Inner Peace"],
    "favorite": true,
    "createdAt": "2025-08-09T12:10:00Z",
    "type": "quote"
  },
  {
    "id": "18",
    "text": "The strongest people aren't those who never break. They're the ones who break apart and still find the courage to put themselves back together.",
    "author": "Maya Angelou",
    "tags": ["Be Strong", "Self-Development", "Life"],
    "favorite": false,
    "createdAt": "2025-08-09T20:30:00Z",
    "type": "quote"
  },
  {
    "id": "19",
    "text": "Self-development isn't about becoming someone else. It's about becoming more authentically yourself.",
    "tags": ["Self-Development", "Accept yourself", "Life"],
    "favorite": true,
    "createdAt": "2025-08-10T11:45:00Z",
    "type": "writing"
  },
  {
    "id": "20",
    "text": "You don't have to be perfect to be worthy of love and acceptance. You just have to be human.",
    "tags": ["Accept yourself", "Inner Peace", "Tips to be Happy"],
    "favorite": false,
    "createdAt": "2025-08-10T16:55:00Z",
    "type": "writing"
  },
  {
    "id": "21",
    "text": "Trust yourself. You've survived 100% of your bad days so far.",
    "author": "Unknown",
    "tags": ["Trust", "Be Strong", "Self-Development"],
    "favorite": true,
    "createdAt": "2025-08-11T09:20:00Z",
    "type": "quote"
  },
  {
    "id": "22",
    "text": "In a world that profits from your insecurities, loving yourself is a radical act. Being an introvert who values depth over superficiality is revolutionary.",
    "tags": ["Introvert", "Accept yourself", "Be Strong", "Life"],
    "favorite": false,
    "createdAt": "2025-08-11T15:40:00Z",
    "type": "writing"
  },
  {
    "id": "23",
    "text": "Forgiveness is giving up the hope that the past could have been different.",
    "author": "Oprah Winfrey",
    "tags": ["Forgiveness", "Inner Peace", "Life"],
    "favorite": true,
    "createdAt": "2025-08-12T08:15:00Z",
    "type": "quote"
  },
  {
    "id": "24",
    "text": "Overthinking is like sitting in a rocking chair. It gives you something to do but doesn't get you anywhere. Sometimes you need to trust your first instinct and take action.",
    "tags": ["Overthinking", "Trust", "Self-Development"],
    "favorite": false,
    "createdAt": "2025-08-12T19:25:00Z",
    "type": "writing"
  },
  {
    "id": "25",
    "text": "Your mental health is more important than your performance, your productivity, or your perfectionism.",
    "tags": ["Depression", "Accept yourself", "Inner Peace", "Life"],
    "favorite": true,
    "createdAt": "2025-08-13T10:50:00Z",
    "type": "quote"
  },
  {
    "id": "26",
    "text": "Success is not about how fast you reach the top. It's about how many people you lift up along the way and who you become in the process.",
    "tags": ["Success", "Leadership", "Life"],
    "favorite": false,
    "createdAt": "2025-08-13T17:15:00Z",
    "type": "writing"
  },
  {
    "id": "27",
    "text": "Leadership is not about being in charge. It's about taking care of those in your charge.",
    "author": "Simon Sinek",
    "tags": ["Leadership", "Success"],
    "favorite": true,
    "createdAt": "2025-08-14T07:35:00Z",
    "type": "quote"
  },
  {
    "id": "28",
    "text": "The hustle is important, but so is the pause. Rest is not a reward for work completed; it's a requirement for work to continue.",
    "tags": ["Hustling", "Inner Peace", "Self-Development"],
    "favorite": false,
    "createdAt": "2025-08-14T14:20:00Z",
    "type": "writing"
  },
  {
    "id": "29",
    "text": "Life is 10% what happens to you and 90% how you react to it.",
    "author": "Charles Swindoll",
    "tags": ["Life", "Mindfulness", "Be Strong"],
    "favorite": true,
    "createdAt": "2025-08-15T11:30:00Z",
    "type": "quote"
  },
  {
    "id": "30",
    "text": "What goes around comes around, but remember: kindness multiplies faster than cruelty. Plant seeds of compassion and watch your world bloom.",
    "tags": ["Karma", "Life", "Tips to be Happy"],
    "favorite": false,
    "createdAt": "2025-08-15T18:45:00Z",
    "type": "writing"
  },
  {
    "id": "31",
    "text": "Mindfulness means being present in this moment, even if this moment is difficult.",
    "tags": ["Mindfulness", "Inner Peace", "Be Strong"],
    "favorite": true,
    "createdAt": "2025-08-16T09:10:00Z",
    "type": "quote"
  },
  {
    "id": "32",
    "text": "Peace is not the absence of trouble. It's the presence of calm in the middle of trouble. You can find your center even when the world spins chaotically around you.",
    "tags": ["Inner Peace", "Mindfulness", "Be Strong"],
    "favorite": false,
    "createdAt": "2025-08-16T16:25:00Z",
    "type": "writing"
  },
  {
    "id": "33",
    "text": "Discipline is the bridge between goals and accomplishment.",
    "author": "Jim Rohn",
    "tags": ["Discipline", "Success", "Self-Development"],
    "favorite": true,
    "createdAt": "2025-08-17T08:40:00Z",
    "type": "quote"
  },
  {
    "id": "34",
    "text": "Fitness is not about being better than someone else. It's about being better than you used to be. Every rep, every step, every breath is a victory over the person who wanted to quit.",
    "tags": ["Fitness", "Self-Development", "Discipline"],
    "favorite": false,
    "createdAt": "2025-08-17T15:55:00Z",
    "type": "writing"
  },
  {
    "id": "35",
    "text": "Happiness is not something ready-made. It comes from your own actions.",
    "author": "Dalai Lama",
    "tags": ["Tips to be Happy", "Self-Development", "Life"],
    "favorite": true,
    "createdAt": "2025-08-18T12:20:00Z",
    "type": "quote"
  },
  {
    "id": "36",
    "text": "Strength grows in the moments when you think you can't go on, but you keep going anyway. Those moments define who you really are.",
    "tags": ["Be Strong", "Life", "Self-Development"],
    "favorite": false,
    "createdAt": "2025-08-18T19:35:00Z",
    "type": "writing"
  },
  {
    "id": "37",
    "text": "The curious paradox is that when I accept myself just as I am, then I can change.",
    "author": "Carl Rogers",
    "tags": ["Accept yourself", "Self-Development", "Inner Peace"],
    "favorite": true,
    "createdAt": "2025-08-19T10:45:00Z",
    "type": "quote"
  },
  {
    "id": "38",
    "text": "Trust is like a paper; once crumpled, it can never be the same again. But remember, even crumpled paper can still hold beautiful words.",
    "tags": ["Trust", "Forgiveness", "Life"],
    "favorite": false,
    "createdAt": "2025-08-19T17:50:00Z",
    "type": "writing"
  },
  {
    "id": "39",
    "text": "Introversion is not about being shy. It's about how you process the world - deeply, thoughtfully, with intention.",
    "tags": ["Introvert", "Accept yourself", "Self-Development"],
    "favorite": true,
    "createdAt": "2025-08-20T09:15:00Z",
    "type": "quote"
  },
  {
    "id": "40",
    "text": "To forgive is to set a prisoner free and discover that the prisoner was you. Liberation comes not from holding onto pain, but from letting it go.",
    "tags": ["Forgiveness", "Inner Peace", "Life", "Be Strong"],
    "favorite": false,
    "createdAt": "2025-08-20T16:30:00Z",
    "type": "writing"
  },
  {
    "id": "41",
    "text": "You can't control your thoughts, but you can control your attention.",
    "tags": ["Overthinking", "Mindfulness", "Self-Development"],
    "favorite": true,
    "createdAt": "2025-08-21T11:40:00Z",
    "type": "quote"
  },
  {
    "id": "42",
    "text": "Depression lies. It whispers that you're not enough, that tomorrow won't be better, that no one understands. But you are enough, tomorrow can be different, and you are not alone in this fight.",
    "tags": ["Depression", "Be Strong", "Life", "Tips to be Happy"],
    "favorite": false,
    "createdAt": "2025-08-21T18:55:00Z",
    "type": "writing"
  },
  {
    "id": "43",
    "text": "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "author": "Winston Churchill",
    "tags": ["Success", "Be Strong", "Life"],
    "favorite": true,
    "createdAt": "2025-08-22T08:25:00Z",
    "type": "quote"
  },
  {
    "id": "44",
    "text": "True leadership isn't about commanding from the front. It's about serving from the heart, empowering others to discover their own strength and potential.",
    "tags": ["Leadership", "Success", "Self-Development"],
    "favorite": false,
    "createdAt": "2025-08-22T15:10:00Z",
    "type": "writing"
  },
  {
    "id": "45",
    "text": "Don't mistake activity for productivity. The hustle should have direction, purpose, and rest stops.",
    "tags": ["Hustling", "Success", "Self-Development", "Inner Peace"],
    "favorite": true,
    "createdAt": "2025-08-23T12:35:00Z",
    "type": "quote"
  },
  {
    "id": "46",
    "text": "Life isn't about waiting for the storm to pass. It's about learning to dance in the rain, finding joy even in difficult moments.",
    "tags": ["Life", "Tips to be Happy", "Be Strong"],
    "favorite": false,
    "createdAt": "2025-08-23T19:20:00Z",
    "type": "writing"
  },
  {
    "id": "47",
    "text": "Karma has no menu. You get served what you deserve.",
    "tags": ["Karma", "Life"],
    "favorite": true,
    "createdAt": "2025-08-24T10:50:00Z",
    "type": "quote"
  },
  {
    "id": "48",
    "text": "Mindfulness is about paying attention to the present moment without getting lost in stories about the past or worries about the future. Right here, right now, you have everything you need.",
    "tags": ["Mindfulness", "Inner Peace", "Overthinking"],
    "favorite": false,
    "createdAt": "2025-08-24T17:15:00Z",
    "type": "writing"
  },
  {
    "id": "49",
    "text": "Peace cannot be kept by force; it can only be achieved by understanding.",
    "author": "Albert Einstein",
    "tags": ["Inner Peace", "Mindfulness", "Life"],
    "favorite": true,
    "createdAt": "2025-08-25T09:30:00Z",
    "type": "quote"
  },
  {
    "id": "50",
    "text": "Discipline is not punishment. It's training yourself to act in accordance with your decisions rather than your impulses. It's self-love in action.",
    "tags": ["Discipline", "Self-Development", "Accept yourself"],
    "favorite": false,
    "createdAt": "2025-08-25T16:45:00Z",
    "type": "writing"
  },
  {
    "id": "51",
    "text": "Take care of your body. It's the only place you have to live.",
    "author": "Jim Rohn",
    "tags": ["Fitness", "Self-Development", "Life"],
    "favorite": true,
    "createdAt": "2025-08-26T11:20:00Z",
    "type": "quote"
  },
  {
    "id": "52",
    "text": "Happiness is not about having everything go your way. It's about finding your way through everything that comes. It's a skill you develop, not a destination you reach.",
    "tags": ["Tips to be Happy", "Life", "Inner Peace", "Be Strong"],
    "favorite": false,
    "createdAt": "2025-08-26T18:35:00Z",
    "type": "writing"
  },
  {
    "id": "53",
    "text": "You are stronger than you believe, more talented than you know, and capable of more than you imagine.",
    "tags": ["Be Strong", "Self-Development", "Accept yourself"],
    "favorite": true,
    "createdAt": "2025-08-27T08:50:00Z",
    "type": "quote"
  },
  {
    "id": "54",
    "text": "Self-development is not about fixing what's broken. It's about watering what's already growing and nurturing the seeds of potential within you.",
    "tags": ["Self-Development", "Accept yourself", "Inner Peace"],
    "favorite": false,
    "createdAt": "2025-08-27T15:25:00Z",
    "type": "writing"
  },
  {
    "id": "55",
    "text": "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    "author": "Ralph Waldo Emerson",
    "tags": ["Accept yourself", "Be Strong", "Life"],
    "favorite": true,
    "createdAt": "2025-08-01T21:10:00Z",
    "type": "quote"
  },
  {
    "id": "56",
    "text": "Trust the timing of your life. Everything happens for a reason, even when that reason isn't immediately clear. Your journey is unfolding exactly as it should.",
    "tags": ["Trust", "Life", "Inner Peace"],
    "favorite": false,
    "createdAt": "2025-08-02T12:40:00Z",
    "type": "writing"
  },
  {
    "id": "57",
    "text": "Introverts don't need to become extroverts to succeed. They need to become themselves, fully and unapologetically.",
    "tags": ["Introvert", "Accept yourself", "Success"],
    "favorite": true,
    "createdAt": "2025-08-03T14:55:00Z",
    "type": "quote"
  },
  {
    "id": "58",
    "text": "Forgiveness doesn't excuse their behavior. It prevents their behavior from destroying your heart. You forgive for your peace, not their comfort.",
    "tags": ["Forgiveness", "Inner Peace", "Be Strong", "Life"],
    "favorite": false,
    "createdAt": "2025-08-04T20:15:00Z",
    "type": "writing"
  },
  {
    "id": "59",
    "text": "Stop overthinking. You can't control everything. Let it be.",
    "tags": ["Overthinking", "Inner Peace", "Mindfulness"],
    "favorite": true,
    "createdAt": "2025-08-05T13:30:00Z",
    "type": "quote"
  },
  {
    "id": "60",
    "text": "Depression is not a choice, but recovery is. Every small step toward healing is an act of courage. You're braver than you know for continuing to fight.",
    "tags": ["Depression", "Be Strong", "Self-Development", "Life"],
    "favorite": false,
    "createdAt": "2025-08-06T18:45:00Z",
    "type": "writing"
  },
  {
    "id": "61",
    "text": "Success is not about the destination. It's about who you become on the journey.",
    "tags": ["Success", "Self-Development", "Life"],
    "favorite": true,
    "createdAt": "2025-08-07T11:20:00Z",
    "type": "quote"
  },
  {
    "id": "62",
    "text": "Leadership is not about titles, positions, or power. It's about influence, inspiration, and impact. You can lead from wherever you are with whatever you have.",
    "tags": ["Leadership", "Success", "Self-Development"],
    "favorite": false,
    "createdAt": "2025-08-08T16:35:00Z",
    "type": "writing"
  },
  {
    "id": "63",
    "text": "Hustle with purpose, rest with intention, and remember that your worth isn't measured by your productivity.",
    "tags": ["Hustling", "Inner Peace", "Accept yourself"],
    "favorite": true,
    "createdAt": "2025-08-09T09:50:00Z",
    "type": "quote"
  },
  {
    "id": "64",
    "text": "Life has a funny way of teaching you lessons you didn't know you needed to learn. Embrace the unexpected curriculum; it's preparing you for something greater.",
    "tags": ["Life", "Self-Development", "Trust"],
    "favorite": false,
    "createdAt": "2025-08-10T22:25:00Z",
    "type": "writing"
  },
  {
    "id": "65",
    "text": "What you give out, you get back. Choose your energy wisely.",
    "tags": ["Karma", "Life", "Mindfulness"],
    "favorite": true,
    "createdAt": "2025-08-11T12:40:00Z",
    "type": "quote"
  },
  {
    "id": "66",
    "text": "Mindfulness is the art of being present without being perfect. You don't need to clear your mind; you just need to notice what's there with kindness.",
    "tags": ["Mindfulness", "Inner Peace", "Accept yourself"],
    "favorite": false,
    "createdAt": "2025-08-12T17:55:00Z",
    "type": "writing"
  },
  {
    "id": "67",
    "text": "Inner peace begins the moment you choose not to allow another person or event to control your emotions.",
    "author": "Pema Chödrön",
    "tags": ["Inner Peace", "Be Strong", "Mindfulness"],
    "favorite": true,
    "createdAt": "2025-08-13T14:10:00Z",
    "type": "quote"
  },
  {
    "id": "68",
    "text": "Discipline is freedom. It's the freedom to choose your response instead of being enslaved by your impulses. Every disciplined choice is a vote for the person you want to become.",
    "tags": ["Discipline", "Self-Development", "Success", "Be Strong"],
    "favorite": false,
    "createdAt": "2025-08-14T19:25:00Z",
    "type": "writing"
  },
  {
    "id": "69",
    "text": "Your body keeps score of how you treat it. Make deposits of movement, nutrition, and rest.",
    "tags": ["Fitness", "Self-Development", "Discipline"],
    "favorite": true,
    "createdAt": "2025-08-15T10:40:00Z",
    "type": "quote"
  },
  {
    "id": "70",
    "text": "Happiness is not a permanent state, and that's perfectly okay. It's meant to be felt in moments, appreciated when it comes, and remembered when it goes. The pursuit itself brings meaning.",
    "tags": ["Tips to be Happy", "Life", "Accept yourself", "Inner Peace"],
    "favorite": false,
    "createdAt": "2025-08-16T15:55:00Z",
    "type": "writing"
  },
  {
    "id": "71",
    "text": "You have been assigned this mountain to show others it can be moved.",
    "tags": ["Be Strong", "Success", "Life"],
    "favorite": true,
    "createdAt": "2025-08-17T13:15:00Z",
    "type": "quote"
  },
  {
    "id": "72",
    "text": "Self-development is a lifelong conversation with yourself. Be patient with your progress, gentle with your setbacks, and proud of your commitment to growth.",
    "tags": ["Self-Development", "Accept yourself", "Be Strong"],
    "favorite": false,
    "createdAt": "2025-08-18T20:30:00Z",
    "type": "writing"
  },
  {
    "id": "73",
    "text": "You yourself, as much as anybody in the entire universe, deserve your love and affection.",
    "author": "Buddha",
    "tags": ["Accept yourself", "Inner Peace", "Tips to be Happy"],
    "favorite": true,
    "createdAt": "2025-08-19T11:45:00Z",
    "type": "quote"
  },
  {
    "id": "74",
    "text": "Trust is earned in drops and lost in buckets. Build it carefully, protect it fiercely, and when it's broken, remember that repair is possible but takes time and consistent action.",
    "tags": ["Trust", "Life", "Forgiveness"],
    "favorite": false,
    "createdAt": "2025-08-20T16:20:00Z",
    "type": "writing"
  },
  {
    "id": "75",
    "text": "In a loud world, your quiet strength is a superpower. Use it wisely.",
    "tags": ["Introvert", "Be Strong", "Accept yourself"],
    "favorite": true,
    "createdAt": "2025-08-21T09:35:00Z",
    "type": "quote"
  },
  {
    "id": "76",
    "text": "Forgiveness is not about condoning actions or forgetting pain. It's about choosing freedom over resentment, peace over anger, and healing over holding onto hurt.",
    "tags": ["Forgiveness", "Inner Peace", "Be Strong", "Life"],
    "favorite": false,
    "createdAt": "2025-08-22T14:50:00Z",
    "type": "writing"
  },
  {
    "id": "77",
    "text": "Your thoughts are not facts. Question them, don't obey them.",
    "tags": ["Overthinking", "Mindfulness", "Self-Development"],
    "favorite": true,
    "createdAt": "2025-08-23T12:05:00Z",
    "type": "quote"
  }
];

const initialState = {
  quotes: [],
  loading: true,
  searchTerm: '',
  selectedTags: [],
  availableTags: ['Be Strong','Self-Development','Accept yourself','Trust','Introvert','Forgiveness','Overthinking','Depression','Success','Leadership','Hustling','Life','Karma','Mindfulness','Inner Peace','Discipline','Fitness','Tips to be Happy']
};

function quoteReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'LOAD_QUOTES':
      return { ...state, quotes: action.payload, loading: false };

    case 'ADD_QUOTE':
      return { ...state, quotes: [...state.quotes, action.payload] };

    case 'DELETE_QUOTE':
      return { ...state, quotes: state.quotes.filter(q => q.id !== action.payload) };

    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        quotes: state.quotes.map(q => q.id === action.payload ? { ...q, favorite: !q.favorite } : q)
      };

    case 'UPDATE_QUOTE':
      return {
        ...state,
        quotes: state.quotes.map(q => q.id === action.payload.id ? action.payload : q)
      };

    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };

case 'TOGGLE_TAG_FILTER':
  return {
    ...state,
    selectedTags: state.selectedTags.some(tag => tag.toLowerCase() === action.payload.toLowerCase())
      ? state.selectedTags.filter(tag => tag.toLowerCase() !== action.payload.toLowerCase())
      : [...state.selectedTags, action.payload]
  };

    case 'CLEAR_FILTERS':
      return { ...state, searchTerm: '', selectedTags: [] };

    default:
      return state;
  }
}

export function QuoteProvider({ children }) {
  const [state, dispatch] = useReducer(quoteReducer, initialState);

  // Initialize quotes from localStorage or sample
  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const storedQuotes = loadQuotes();
    if (storedQuotes.length) {
      dispatch({ type: 'LOAD_QUOTES', payload: storedQuotes });
    } else {
      dispatch({ type: 'LOAD_QUOTES', payload: sampleQuotes });
      saveQuotes(sampleQuotes);
    }
  }, []);

  // Sync quotes to localStorage whenever they change
  useEffect(() => {
    if (!state.loading) saveQuotes(state.quotes);
  }, [state.quotes, state.loading]);

  // Action methods
  const addQuote = (quoteData) => {
    const newQuote = {
      id: Date.now().toString(),
      favorite: false,
      createdAt: new Date().toISOString(),
      type: 'quote',
      ...quoteData
    };
    dispatch({ type: 'ADD_QUOTE', payload: newQuote });
  };

  const deleteQuote = (id) => dispatch({ type: 'DELETE_QUOTE', payload: id });
  const toggleFavorite = (id) => dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
  const updateQuote = (updatedQuote) => dispatch({ type: 'UPDATE_QUOTE', payload: updatedQuote });
  const setSearchTerm = (term) => dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  const toggleTagFilter = (tag) => dispatch({ type: 'TOGGLE_TAG_FILTER', payload: tag });
  const clearFilters = () => dispatch({ type: 'CLEAR_FILTERS' });

  // Filtering method
  const getFilteredQuotes = (type = null) => {
    let filtered = [...state.quotes];

    if (type) filtered = filtered.filter(q => q.type === type);

    if (state.searchTerm) {
      const term = state.searchTerm.toLowerCase();
      filtered = filtered.filter(q =>
        q.text.toLowerCase().includes(term) ||
        (q.author?.toLowerCase().includes(term)) ||
        q.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    if (state.selectedTags.length) {
      filtered = filtered.filter(q =>
        state.selectedTags.every(tag => q.tags.includes(tag)) // ensures all selected tags are matched
      );
    }

    return filtered;
  };

  return (
    <QuoteContext.Provider
      value={{
        ...state,
        addQuote,
        deleteQuote,
        toggleFavorite,
        updateQuote,
        setSearchTerm,
        toggleTagFilter,
        clearFilters,
        getFilteredQuotes
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export const useQuotes = () => {
  const context = useContext(QuoteContext);
  if (!context) throw new Error('useQuotes must be used within a QuoteProvider');
  return context;
};
