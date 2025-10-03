import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from "react-router";
import Root from './Componesnts/Root/Root.jsx';
import Mobiles from './Componesnts/Mobiles/Mobiles.jsx';
import Home from './Componesnts/Home/Home.jsx';
import Laptops from './Componesnts/Laptops/Laptops.jsx';
import Users from './Componesnts/Users.jsx/Users.jsx';
import Users2 from './Componesnts/Users2/Users2.jsx';
import UserDetails from './Componesnts/UserDetails/UserDetails.jsx';
import Posts from './Componesnts/Posts/Posts.jsx';
import PostDetail from './Componesnts/PostDetail/PostDetail.jsx';

const usersPromise = fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());

const router = createBrowserRouter([
  {  
    path: "/",
    Component: Root,
    children: [
        {index: true, Component: Home},
        {path: 'mobiles', Component: Mobiles},
        {path: 'laptops', Component: Laptops},
        {
          path: 'users',
          loader: () => fetch('https://jsonplaceholder.typicode.com/users'),
          Component:Users
        },
        {
          path: 'users2',
          element: <Suspense fallback={<span>Loading</span>}>
            <Users2 usersPromise={usersPromise}></Users2>
          </Suspense>
        },
        {
          path: 'users/:userId', 
          loader: ({params}) => fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}`),
          Component: UserDetails
        },
        {
          path: 'posts',
          loader: () => fetch('https://jsonplaceholder.typicode.com/posts'),
          Component: Posts
        },
        {
          path: 'posts/:postId',
          loader: ({params}) => fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`),
        Component: PostDetail
        },
       
    ]
  },
  {
    path: 'about',
    element: <div>About me here</div>
  },
  {
    path: 'blogs',
    element: <div>All my blogs are here</div>
  },
  {
    path: 'app',
    Component: App
  },
  {
    path: '/app2',
    element: <App></App>
  },
   {
          path: '*',
          element: <h3>Not Found: 404 status</h3>
        }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
