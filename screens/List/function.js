import { Permissions, Notifications } from "expo";
import firebase from "firebase";
import "firebase/firestore";

export default async function registerForPushNotificationAsync() {
  try {
    //現在のstatus
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return ;
    }

    let token = await Notifications.getExpoPushTokenAsync();

    return token;

  } catch (error) {
    console.log(error);
  }
}