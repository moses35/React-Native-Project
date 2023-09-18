import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../config";

export const writeDataToFirestore = async (
  userId,
  photoUrl,
  name,
  locationName,
  location
) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      owner: userId,
      url: photoUrl,
      title: name,
      country: locationName,
      locationOnMap: location,
      comments: [],
      likes: [],
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const getData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.log(error);
  }
};
