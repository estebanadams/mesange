import { db } from "../services/firebase";

const sendMessage = (message: string, combinedUid: string, userId: string) => {
  if (!message.length) return null;
  try {
    db.ref("chats/" + combinedUid).push({
      message: message,
      timestamp: Date.now(),
      uid: userId
    });
  } catch (err) {
    console.log(err);
  }
};

export default sendMessage;
