import { useState, useEffect } from 'react'
import { auth } from './index';
import {
  sendSignInLinkToEmail, onAuthStateChanged, isSignInWithEmailLink,
  signOut, signInAnonymously, signInWithEmailLink,
  updateProfile, fetchSignInMethodsForEmail, updateEmail,
  EmailAuthProvider, linkWithCredential
} from 'firebase/auth';

interface authUserParams {
  uid: string | null,
  displayName: string | null,
  email: string | null,
  photoUrl: string | null,
  isAnonymous: boolean,
  emailVerified: boolean,
}
const formatAuthUser = (user: authUserParams) => {
  return {
    uid: user.uid,
    firstName: user?.displayName?.split(' ')[0],
    lastName: user?.displayName?.split(' ')[1],
    email: user.email,
    photoUrl: user.photoUrl,
    isAnonymous: user.isAnonymous,
    emailVerified: user.emailVerified,
  }
}
interface IformatedUser {
  uid: string | null,
  firstName: string | undefined,
  lastName: string | undefined,
  email: string | null,
  photoUrl: string | null,
  isAnonymous: boolean,
  emailVerified: boolean,
}

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<IformatedUser | null>(null);
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

  const getEnv = (email: string) => {
    let link = '';
    switch (process.env.NEXT_PUBLIC_VERCEL_ENV) {
      case 'development':
        link = `http://localhost:3000/login/?email=${email}`;
        break;
      case 'preview':
        link = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/login/?email=${email}`;
        break;
      case 'production':
        // TODO change to prod domain and add the domain in firebase settings too: https://console.firebase.google.com/project/omerci/authentication/providers
        link = `https://omerci.vercel.app/login/?email=${email}`;
        break;
    }
    return link;
  }

  const getEnvAnonymous = (email: string) => {
    let link = '';
    switch (process.env.NEXT_PUBLIC_VERCEL_ENV) {
      case 'development':
        link = `http://localhost:3000/login/?email=${email}&isAnonymous=true`;
        break;
      case 'preview':
        link = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/login/?email=${email}&isAnonymous=true`;
        break;
      case 'production':
        // TODO change to prod domain and add the domain in firebase settings too: https://console.firebase.google.com/project/omerci/authentication/providers
        link = `https://omerci.vercel.app/login/?email=${email}&isAnonymous=true`;
        break;
    }
    return link;
  }

  const magicSignInUp = (email: string, isAnonymous = false) => {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: isAnonymous ? getEnvAnonymous(email) : getEnv(email),
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

    // const auth = getAuth(firebaseApp);
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
        console.log('MAGIC SIGNUP errorCode:', error)
        const errorMessage = error.message;
        console.log('magic signup errorMessage:', errorMessage)
        // TODO: https://evandromacedo.github.io/react-simple-snackbar/
        // ...
      });
  }

  const afterGettingLink = () => {
    console.log('afterGettingLink: @@@@@@@@@@@@@@@@',)
    // const auth = getAuth(firebaseApp);
    let isNewUser, isAnonymous, emailVerified, uid;
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email: string = window.localStorage.getItem('emailForSignIn') as string;
      // if (!email) {
      //   // TODO check for email in Login component and ask for email if not present
      //   // User opened the link on a different device. To prevent session fixation
      //   // attacks, ask the user to provide the associated email again. For example:
      //   email = window.prompt('Please provide your email for confirmation') as string;
      // }
      // The client SDK will parse the code from the link for you.
      return signInWithEmailLink(auth, email, window.location.href)
        .then((result: any) => {
          // console.log('####result:', result)
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
          let resultToReturn = {
            isNewUser,
            isAnonymous,
            emailVerified,
            uid,
            email
          };
          return resultToReturn;
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log('AFTERGETTINGLINK errorCode:', error)
          const errorMessage = error.message;
          console.log('AFTERGETTINGLINK errorMessage:', errorMessage)
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
  }

  const anonymousSignIn = async () => {
    try {
      const credentials = await signInAnonymously(auth);
      return credentials.user;
    } catch (err: any) {
      const errorCode = err.code;
      const errorMessage = err.message;
      console.log("anonymousSignIn", `le code d'erreur est ${errorCode} et le message est ${errorMessage}`);
    }
  }

  const signInAnonymousUser = async (email: string, emailLink: string) => {
    // Example oof emailLink: /card/[cardId]
    let link = '';
    switch (process.env.NEXT_PUBLIC_VERCEL_ENV) {
      case 'development':
        link = `http://localhost:3000${emailLink}?email=${email}&isAnonymous=true`;
        break;
      case 'preview':
        link = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${emailLink}?email=${email}&isAnonymous=true`;
        break;
      case 'production':
        // TODO change to prod domain and add the domain in firebase settings too: https://console.firebase.google.com/project/omerci/authentication/providers
        link = `https://omerci.vercel.app${emailLink}?email=${email}&isAnonymous=true`;
        break;
    }
    const actionCodeSettings = {
      url: link,
      handleCodeInApp: true,
    };

    // const auth = getAuth(firebaseApp);
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      console.log("Sign in anonymousUser SUCCESS")
    }catch(err) {
      console.log("Err in signinAnonymousUser")
    }
  }


  const linkAnonymousUser = async(email: string, emailLink: string) => {
    const credential = EmailAuthProvider.credentialWithLink(email, emailLink);
    try {
      const user = await linkWithCredential(auth.currentUser, credential);
      console.log("Account linking success", user);
      return user;
    }catch(err) {
      console.log("Account linking error", err);
    }
  }



  const doesEmailAlreadyExist = async (email: string) => {
    const providers = await fetchSignInMethodsForEmail(auth, email);
    return providers.length > 0;
  }


  const signOutAccount = () => {
    // const auth = getAuth(firebaseApp);
    signOut(auth).then(clear);
  }

  interface IupdateName {
    firstName: string,
    lastName: string,
    email: string,
  }
  const updateAuthDisplayName = async ({ firstName, lastName, email }: IupdateName) => {
    // const auth = getAuth(firebaseApp);
    try {
      if (auth && auth.currentUser)
        await updateProfile(auth.currentUser, { displayName: `${firstName} ${lastName}` });
      await updateEmail(auth.currentUser, email);
      console.log('updateAuthDisplayName: Profile updated');
    } catch (e) {
      //TODO: Snackbar for eroor to user
      console.log("Eroor on updateAuthDisplayName", e);
    }
  }

  useEffect(() => {
    // const auth = getAuth(firebaseApp);
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     console.log("BAssainte", authUser)
    //     authStateChanged(user);
    //   } else {
    //     authStateChanged(null);
    //   }

    // })
    const unsuscribe = onAuthStateChanged(auth, authStateChanged);
    return () => {
      setLoading(false);
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
    updateAuthDisplayName,
    doesEmailAlreadyExist,
    signInAnonymousUser,
    linkAnonymousUser,
  };
}