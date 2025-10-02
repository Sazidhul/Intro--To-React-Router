import React from 'react';
import { useLoaderData, useRouteLoaderData } from 'react-router';

const UserDetails = () => {

   const user = useLoaderData();
   
   const {website, name} = user;

   return (
      <div>
         <h3>User Details here</h3>
         <h5>Name: {name}</h5>
         <p>Website: {website}</p>
      </div>
   );
};

export default UserDetails;