import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../config";

const authStateChanged = async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log(user);
    } else {
    }
  });
};

const updateUser = async (name) => {
  updateProfile(auth.currentUser, {
    displayName: name,
  })
    .then(() => {
      console.log("Profile updated!");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateUserPhoto = async (imagePath) => {
  updateProfile(auth.currentUser, {
    photoURL: imagePath,
  })
    .then(() => {
      console.log("Profile updated!");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const registerDB = async (imagePath, name, email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateUser(name);
    await updateUserPhoto(imagePath);
  } catch (error) {
    alert("Invalid email");
    throw error;
  }
};

export const loginDB = async (email, password) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);

    authStateChanged();
    return credentials.user;
  } catch (error) {
    throw error;
  }
};

export const firebaseLogOut = async () => {
  signOut(auth)
    .then(() => {
      console.log("logOut");
    })
    .catch((error) => {
      console.log(error);
    });
};
