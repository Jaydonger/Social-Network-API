// Seed data!

const users = [
  { userName: "jaytizzle", email: "jp93@hotmail.com", thoughts: [] },
  { userName: "jaydong", email: "jpace42@yahoo.com", thoughts: [] },
  { userName: "jaydonger", email: "jdog@gmail.com", thoughts: [] },
];

const thoughts = [
  { thoughtText: "You're telling me a shrimp fried this rice?", userName: "jaytizzle", reactions: [{ reactionBody: "Would I lie to you?", userName: "jaydong" }] },
  { thoughtText: "A priest, a minister, and a rabbit walk in to donate blood", userName: "jaydong", reactions: [{ reactionBody: "The rabbit says, I think I might be a type-O", userName: "jaydonger" }] },
  { thoughtText: "Being dead can't be that bad, no one comes back to complain!", userName: "jaydonger", reactions: [{ reactionBody: "Har har har", userName: "jaytizzle" }] },
];

module.exports = { users, thoughts };