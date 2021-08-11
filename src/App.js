// import {createContext,useState } from "react";
// import { firestore } from "./firebase";
import Login from "./Login";
import Home from "./Home";
import Profile from "./Profile"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthProvider from "./AuthProvider";
// let userContext = createContext();

// function App() {
//   useEffect(() => {
//     let f = async () => {
//       let querySnapshot = await firestore
//         .collection("posts")
//         .limit(5)
//         .orderBy("index")
//         .get();
//       querySnapshot.forEach((doc) => console.log(doc.data()));
//     };

//     f();
//   }, []);

//   return <div></div>;
// }


// This function is before modification the auth Provider
// function App() {
//   let [user, setUser] = useState(null);

//   // react-router-dom 
//   console.log(user);

//   return (
//     <>
//       <Router>
//         <AuthProvider>
//           <userContext.Provider value={user}>
//             <Switch>
//               <Route path="/home">
//                 <Home />
//               </Route>
//               <Route path="/">
//                 <Login handleUser={setUser} />
//               </Route>
//             </Switch>
//           </userContext.Provider>
//         </AuthProvider>
//       </Router>
//     </>
//   );
// }
// export { userContext };



// this fun is after modification 
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
