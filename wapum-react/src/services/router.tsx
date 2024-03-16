import { createBrowserRouter } from "react-router-dom";
import { Root } from "../components/views/Root";
import { Conversation } from "../components/views/private/Chat/Conversation";
import { MyChats } from "../components/views/private/Chat/MyChats";
import { CreateAd } from "../components/views/private/CreateAd/CreateAd";
import { PrivateAuthChecker } from "../components/views/private/PrivateAuthChecker";
import { Profile } from "../components/views/private/Profile/Profile";
import { AdExplore } from "../components/views/public/AdExplore";
import { AdView } from "../components/views/public/AdView";
import { AuthChecker } from "../components/views/public/Auth/AuthChecker";
import SignIn from "../components/views/public/Auth/SignIn";
import SignUp from "../components/views/public/Auth/SignUp";
import { CategoryView } from "../components/views/public/CategoryView";
import { Home } from "../components/views/public/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/explore",
        element: <AdExplore />,
      },
      {
        path: "/ad/:id",
        element: <AdView />,
      },
      {
        path: "/category/:category",
        element: <CategoryView />,
      },
      {
        path: "/auth",
        element: <AuthChecker />,
        children: [
          {
            path: "sign-in",
            element: <SignIn />,
          },
          {
            path: "sign-up",
            element: <SignUp />,
          },
        ],
      },

      {
        path: "/private",
        element: <PrivateAuthChecker />,
        children: [
          {
            path: "",
            element: <Profile />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "create-ad",
            element: <CreateAd />,
          },
          {
            path: "messages",
            element: <MyChats />,
          },
          {
            path: "conversation/:id",
            element: <Conversation />,
          },
        ],
      },
    ],
  },
]);
