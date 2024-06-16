import auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'
import 'firebase'

firebase.initializeApp({
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    databaseURL: 'YOUR_DATABASE_URL',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID'
  })

  const writeDataToFirestore = async (collection, data) => {
    try {
      const ref = firebase.firestore().collection(collection).doc()
      const response = await ref.set(data)
      return response
    } catch (error) {
      return error
    }
  }