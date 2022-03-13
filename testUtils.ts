export const cleanDB = async () => {
  try {
    const res = await fetch("http://localhost:9099/emulator/v1/projects/demo-omerci/accounts", {
      method: 'DELETE'
    });
    const result = await res.json();
    console.log("DB CLEANED FROM ALL USER");
  } catch (err) {
    console.log('ERRRR', err);
  }
};


export const signOutTestUser = async():Promise<{email: string, password: string}>  => {
  const email = 'fake_user@gmail.com';
const password = 'password654fe6d4f*';
  const { signOut, createUserWithEmailAndPassword } = await import('firebase/auth');
  const {auth} = await import('./firebase/index');
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    await signOut(auth);
    console.log('signOutTestUser FAKE USER CREATED then SIGNED OUT');
    return { email, password };
  } catch(err: any) {
    console.log("signOutTestUser ERROR", err)
    return err;
  }
}