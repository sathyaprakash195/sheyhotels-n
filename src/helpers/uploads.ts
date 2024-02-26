import firebaseApp from "@/config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const UploadImagesToFirebaseAndReturnURLs = async (files: File[]) => {
  try {
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, "images");
    const uploadedImagesRefs = await Promise.all(
      files.map((file) => {
        const imageRef = ref(storageRef, file.name);
        return uploadBytes(imageRef, file);
      })
    );

    const urls = await Promise.all(
      uploadedImagesRefs.map((item) => getDownloadURL(item.ref))
    );

    return urls;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
