// Seed data!

// unique users!
const users = [
  { username: "jaytizzle", email: "jp93@hotmail.com", thoughts: [] },
  { username: "jaydong", email: "jpace42@yahoo.com", thoughts: [] },
  { username: "jaydonger", email: "jdog@gmail.com", thoughts: [] },
];

// unique thoughts!
const thoughts = [
  { thoughtText: "You're telling me a shrimp fried this rice?", username: "jaytizzle", reactions: [{ reactionBody: "Would I lie to you?", username: "jaydong" }] },
  { thoughtText: "A priest, a minister, and a rabbit walk in to donate blood", username: "jaydong", reactions: [{ reactionBody: "The rabbit says, I think I might be a type-O", username: "jaydonger" }] },
  { thoughtText: "Being dead can't be that bad, no one comes back to complain!", username: "jaydonger", reactions: [{ reactionBody: "Har har har", username: "jaytizzle" }] },
];

module.exports = { users, thoughts };