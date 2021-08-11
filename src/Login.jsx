import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { signInWithGoogle } from "./firebase";

import { AuthContext } from "./AuthProvider"
import "./Login.css"
let Login = () => {
  let value = useContext(AuthContext);


  // useEffect(() => {
  //   auth.onAuthStateChanged(async (user) => {
  //     //if login-> user info
  //     //if logout-> user = null
  //     if (user) {
  //       let { displayName, email, uid } = user;

  //       let docRef = firestore.collection("users").doc(uid);
  //       let document = await docRef.get();
  //       if (!document.exists) {
  //         docRef.set({
  //           displayName,
  //           email,
  //           posts: [],
  //         });
  //       }

  //       props.handleUser({ displayName, email, uid });
  //     } else {
  //       props.handleUser(user);
  //     }
  //   });
  // }, []);

  return (
    <div className = "reel_pic">
      {value? <Redirect to="/home" /> : ""}

      <img src="https://img.icons8.com/ios/500/instagram-reel.png" alt="" className="app_logo"/>
        <h1 className ="freels">Freels</h1>

      <button
        onClick={signInWithGoogle}
        type="submit"
        className="btn btn-primary m-4"
      >
        Login With Google
      </button>
      <footer style={{}}>  Freels - Post Freely Your Emotions<br /> It's a Clone of the Instagram Reels <br />
      </footer>
    </div>
  );
};

export default Login;