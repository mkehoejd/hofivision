
export const messageBuckets = {
  facebook: [],
  instagram: [],
};

export function hofiPushMessage({ platform, senderId, text, timestamp }) {
  messageBuckets[platform].push({
    id: crypto.randomUUID(),
    senderId,
    text,
    timestamp: timestamp || Date.now(),
    unread: true,
  });
}
