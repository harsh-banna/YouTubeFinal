import { StrictMode,lazy,Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
//import VideoPage from './pages/VideoPage.jsx';
//import LogIn from './pages/LogIn.jsx';
//import Channel from './pages/Channel.jsx';
//import Signin from './pages/Signin.jsx';

const LogIn = lazy(() => import('./pages/LogIn.jsx'));
const Signin = lazy(()=> import('./pages/Signin.jsx'));
const VideoPage = lazy(()=> import('./pages/VideoPage.jsx'));
const Channel = lazy(()=> import('./pages/Channel.jsx'));

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children: [{
      path:'/',
      element:<HomePage/>
    },
      {
        path:'/login',
        element:<Suspense fallback={<h1>Loading...</h1>} ><LogIn/></Suspense>
      },
      {
        path:'/signin',
        element:<Suspense fallback={<h1>Loading...</h1>} ><Signin/></Suspense>
      },
      {
        path: "/video/:id",
        element: <Suspense fallback={<h1>Loading...</h1>} ><VideoPage/></Suspense>
      },
      {
        path: "/channel",
        element: <Suspense fallback={<h1>Loading...</h1>} ><Channel/></Suspense>
      }
    ],
    errorElement:<Error/>
  },
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
