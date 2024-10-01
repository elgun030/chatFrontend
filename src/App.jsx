// Pages
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import Home from "./pages/Home";

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="container rounded-2xl bg-[#eeeeee]  p-5">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;