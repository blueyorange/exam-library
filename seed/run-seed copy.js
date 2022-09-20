const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");
const serviceAccount = require("./config/account.json");
const seedData = require("./data");
const uuid = require("uuid").v4;

const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "examweasel.appspot.com",
});
const storage = getStorage();
const bucket = storage.bucket();

const firestore = getFirestore();

async function uploadImage(path, filename) {
  const storage = await bucket.upload(path, {
    public: true,
    destination: filename,
    metadata: {
      firebaseStorageDownloadTokens: uuid(),
    },
  });
  return storage[0].metadata.mediaLink;
}

function uploadDocument(data, collectionName) {
  const collectionRef = firestore.collection(collectionName);
  collectionRef.add(data).then((documentReference) => {
    console.log(`Added document with name '${documentReference.id}'`);
  });
}

async function uploadUsers(userData) {
  userData.forEach((user) => {
    uploadDocument(user, "users");
  });
}

async function uploadQuestions(questionData) {
  const newQuestions = await Promise.all(
    questionData.map(async (question) => {
      const questionImagesPromises = await Promise.all(
        question.questionImages.map((path) =>
          uploadImage(`seed/data/${path}`, `${uuid()}.png`)
        )
      );
      const markSchemeImagesPromises = await Promise.all(
        question.markSchemeImages.map((path) =>
          uploadImage(path, `${uuid()}.png`)
        )
      );
      return {
        ...question,
        questionImages: questionImagesPromises,
        markSchemeImages: markSchemeImagesPromises,
      };
    })
  );
  newQuestions.forEach((question) => {
    uploadDocument(question, "questions");
  });
}

(async () => {
  await uploadUsers(seedData.users);
  await uploadQuestions(seedData.questions.slice(0, 10));
})();
