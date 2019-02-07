const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("es6-promise").polyfill();
require("isomorphic-fetch");

const serviceAccount = require("./config/service_account.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://react-native-cal.firebaseio.com"
});

const runtimeOpts = {
  timeoutSeconds: 300,
  memory: "128MB",
};


exports.pushNotifi = functions.runWith(runtimeOpts)
  .firestore
  .document("users/{user}/stores/{store}")
  .onCreate(async (snap, context) => {
    //フックしたした時のpath
    const store = context.params.store;
    const user = context.params.user;
    const data = snap.data();
    const collection = admin.firestore().collection("users").doc(user);
    const userData = await collection.get().then(user => user.data());
    const storeData = await collection.collection("stores").doc(store).get().then(store => store.data());
    const { token, uid } = userData;
    if (!token) {
      console.log("user don't have token");
      return true;
    }

    const response = fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      body: JSON.stringify([{
        to: token,
        badge: 1,
        title: "New Notification",
        body: "be added new Store",
      }]),
      headers: {
        "content-type": "application/json",
      }
    }).then(res => res.json())
    if (response.errors) {
      console.log("push failed")
    } else {
      console.log("push success")
    }
  })