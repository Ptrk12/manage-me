import {addDoc,collection, deleteDoc, doc, DocumentData, getDoc, getDocs, QuerySnapshot, setDoc, updateDoc} from "firebase/firestore"
import {firestore} from "./firebase"

const refProject = collection(firestore,"project")
const refNotifications = collection(firestore,"notifications")
export class localStorageWorker {

  static async add(key: string, item: any) {
    try {
      const docRef = await setDoc(doc(refProject, key), item);
      console.log('Document written with key: ', key);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  static async addNotification(key: string, item: any) {
    try {
      const docRef = await setDoc(doc(refNotifications, key), item);
      console.log('Document written with key: ', key);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  static async getById(key: string): Promise<DocumentData | null> {
    try {
      const docRef = doc(firestore, "project", key);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (e) {
      console.error('Error getting document: ', e);
      return null;
    }
  }

  static async delete(key: string): Promise<void> {
    try {
      const docRef = doc(firestore, "project", key);
      await deleteDoc(docRef);
      console.log(`Document with ID: ${key} deleted`);
    } catch (e) {
      console.error(`Error deleting document with ID: ${key}`, e);
    }
  }

  static async deleteNotification(key: string): Promise<void> {
    try {
      const docRef = doc(firestore, "notifications", key);
      await deleteDoc(docRef);
      console.log(`Document with ID: ${key} deleted`);
    } catch (e) {
      console.error(`Error deleting document with ID: ${key}`, e);
    }
  }

  static async updateById(key: string, data: Partial<DocumentData>): Promise<void> {
    try {
      const docRef = doc(firestore, "project", key);
      await updateDoc(docRef, data);
      console.log(`Document with ID: ${key} updated`);
    } catch (e) {
      console.error(`Error updating document with ID: ${key}`, e);
    }
  }

  static async getAll(): Promise<DocumentData[]> {
    try {
      const querySnapshot: QuerySnapshot = await getDocs(refProject);
      const documents: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        documents.push({...doc.data() });
      });
      return documents;
    } catch (e) {
      console.error('Error getting documents: ', e);
      return [];
    }
  }
  
}