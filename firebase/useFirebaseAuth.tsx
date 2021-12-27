import { useState, useEffect } from 'react'
import firebaseApp from './index';
import { getAuth, sendSignInLinkToEmail, onAuthStateChanged, isSignInWithEmailLink, signOut, signInAnonymously, signInWithEmailLink } from 'firebase/auth';

interface authUserParams {
  uid: string | null,
  name: string | null,
  email: string | null,
  photoUrl: string | null,
  isAnonymous: boolean,
  emailVerified: boolean,
}
const formatAuthUser = (user: authUserParams) => ({
  uid: user.uid,
  name: user.name,
  email: user.email,
  photoUrl: user.photoUrl,
  isAnonymous: user.isAnonymous,
  emailVerified: user.emailVerified,
})

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<authUserParams | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const authStateChanged = async (authState: any) => {
    if (!authState) {
      setLoading(false)
      return;
    }

    setLoading(true)

    const formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  }

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  }

  const getEnv = () => {
    let link = '';
    switch(process.env.NEXT_PUBLIC_VERCEL_ENV) {
      case 'development':
        link = 'http://localhost:3000/login';
        break;
      case 'preview':
        link = 'https://omerci.vercel.app/login';
        break;
      case 'production':
        // TODO change to prod domain and add the domain in firebase settings too: https://console.firebase.google.com/project/omerci/authentication/providers
        link = 'https://omerci.vercel.app/login';
        break;
    }
    return link;
  }

  const magicSignInUp = (email: string) => {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: getEnv(),
      // This must be true.
      handleCodeInApp: true,
      // iOS: {
      //   bundleId: 'com.example.ios'
      // },
      // android: {
      //   packageName: 'com.example.android',
      //   installApp: true,
      //   minimumVersion: '12'
      // },
      // dynamicLinkDomain: 'example.page.link'
    };

    const auth = getAuth(firebaseApp);
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // TODO: https://evandromacedo.github.io/react-simple-snackbar/
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', email);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // TODO: https://evandromacedo.github.io/react-simple-snackbar/
        // ...
      });
  }

  const afterGettingLink = () => {
    const auth = getAuth(firebaseApp);
    let isNewUser, isAnonymous, emailVerified, uid;
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email: string = window.localStorage.getItem('emailForSignIn') as string;
      if (!email) {
        // TODO check for email in Login component and ask for email if not present
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation') as string;
      }
      // The client SDK will parse the code from the link for you.
      return signInWithEmailLink(auth, email, window.location.href)
        .then((result: any) => {
          console.log('####result:', result)
          isNewUser = result._tokenResponse.isNewUser;
          isAnonymous = result.user.isAnonymous;
          emailVerified = result.user.emailVerified;
          uid = result.user.uid;

          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn');
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
          let resultToReturn =  {
            isNewUser,
            isAnonymous,
            emailVerified,
            uid,
          };
          return resultToReturn;
        })
        .catch((error) => {
          console.log('error:', error)
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
  }

  const anonymousSignIn = () => {
    const auth = getAuth(firebaseApp);
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  }


  const signOutAccount = () => {
    const auth = getAuth(firebaseApp);
    signOut(auth).then(clear);
  }

  useEffect(() => {
    const auth = getAuth();
    const unsuscribe = onAuthStateChanged(auth, authStateChanged);
    return () => {
      unsuscribe();
    }
  }, [])

  return {
    authUser,
    loading,
    magicSignInUp,
    anonymousSignIn,
    signOutAccount,
    signOut,
    afterGettingLink,
  };
}