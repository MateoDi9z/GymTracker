import { defineStore } from 'pinia'

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, type Firestore } from 'firebase/firestore';
import { Ejercicio } from '@/models/Ejercicio';
import { User } from '@/models/User';
import { Serie } from '@/models/Serie';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyD004TD47jKwi__fJZrqKJIA2rlpMS7jLQ",
  authDomain: "gym-track-app-90115.firebaseapp.com",
  projectId: "gym-track-app-90115",
  storageBucket: "gym-track-app-90115.appspot.com",
  messagingSenderId: "379610129326",
  appId: "1:379610129326:web:42c2714daa6a29476bde3f"
};


function firebaseTimestampToDate(timestamp: { seconds: number; nanoseconds: number }): Date {
  const milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);
  return new Date(milliseconds);
}

export const useFirebaseStore = defineStore('firebase', () => {
  const app = initializeApp(firebaseConfig);
  let db: Firestore = getFirestore(app);

  return {
    Ejercicios: {
      column: "ejercicio",

      /**
       * Retrieves a list of Ejercicios from the Firestore database.
       * @returns {Promise<Ejercicio[]>} A promise that resolves with an array of Ejercicio objects.
       */
      async get(): Promise<Ejercicio[]> {
        const ejerciciosCol = collection(db, this.column);
        const ejercicioSnapshot = await getDocs(ejerciciosCol);
        const dataList = ejercicioSnapshot.docs.map(doc => doc.data());
        
        const ejerciciosList: Ejercicio[] = []
        dataList.forEach((data) => {
          try {
            const { muscleGroup, name } = Ejercicio.checkSchema(data)
            ejerciciosList.push(new Ejercicio(muscleGroup, name))
          } catch (e) {
            alert(e)
            console.error("Error:", e);
          }
        })

        return ejerciciosList;
      }
    },

    Repetitions: {
      column: 'workouts',

      async get(user: User): Promise<Serie[]> {
        // Get repetitions where userId == user.id
        const repsRef = collection(db, this.column);
        const q = query(repsRef, where("userId", "==", user.getId()))
        const querySnapshot = await getDocs(q);
        const dataList = querySnapshot.docs.map(doc => doc.data());

        const repetitionsList: Serie[] = []
        dataList.forEach((data) => {
          try {
            const unparsed_datetime = firebaseTimestampToDate(data.datetime)
            delete data.datetime
            const { id, ejercicioName, userId, repetitions: reps, datetime } = Serie.checkSchema({ ...data, datetime: unparsed_datetime })
            repetitionsList.push(new Serie(id, datetime, reps, ejercicioName, userId))
          } catch (e) {
            alert(e)
            console.error("Error:", e);
          }
        })

        return repetitionsList;
      },
  },
  }
})

  // const count = ref(0)
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }