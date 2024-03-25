import React from 'react'
import {useState} from 'react'
import {useEffect}  from 'react'
import axios from 'axios'
import CardComponent from '../components/CardComponent'

interface User {  
  id: number;
  name: string;
  email: string;
}
export default function Home() {
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'localhost:4000';
const [users, setUsers] = useState<User[]>([]);
const [newUser, setNewUser] = useState<User>({name: '', email: ''});
const [updateUser, setUpdateUser] = useState({id:'', name:'', email:''});

//fetch users

useEffect(()=>{
  const fetchData = async () => {
    try{
      const response = await axios.get(`${apiUrl}/users`);
      setUsers(response.data.reverse());
    } catch(error) {
      console.error('Error fetching data',error);
    }
  };

  fetchData();
  },[]);

//Create User
const createUSer = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try{
    const response = await axios.post(`${apiUrl}/users`, newUser);
    setUsers([response.data, ...users]);
    setNewUser({name:'',email:''});
  }catch(error){
    console.error('error creating user',error);
  }
};

{/*Update users */}

const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try{
    await axios.put(  `${apiUrl}/users/${updateUser.id}`, {name: updateUser.name, email: updateUser.email});
    setUpdateUser({id:'', name:'', email:''});
    setUsers(
    
      users.map((user) => {
        if(user.id===parseInt(updateUser.id)) {
          return{...user, name:updateUser.name, email: updateUser.mail};
        }
        return user;
        }));
  } catch(error){
    console.error('Error updating user',error);
  }
};


return (
  <main className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100'>
  <div className='space-y-4 w-full max-w-2x1'>
  <h1 className='text 2x1 font-bold text-gray-800 text-center'>User Management App</h1>


{/* Create User */ }
<form onSubmit={createUSer} className='p-4 blue-100 rounded shadow'>
  <input
  placeholder='Name'
  value={newUser.name}
  onChange={e => setNewUser({...newUser, name : e.target.value})}
  className='mb-2 w-full p-2 border border-gray-300 rounded'
/>
<input
placeholder='Email'
value={newUser.email}

onChange={(e) => setNewUser({...newUser, email: e.target.value})}
className='mb-2 w-full p-2 border border-gray-300 rounded'
/>
</form>
<button type="submit" className='w-full p-2 text-white bg-blue-500 rounded'>
  Add user
  </button>


{/*Update Users */}

<form onSubmit={handleUpdateUser} className='p-4 bg-green-100 rounded shadow'>
<input
placeholder='User ID'
value={updateUser.id}
onChange={(e) => setUpdateUser({...updateUser, id: e.target.value})}
className='mb-2 w-full p-2 border border-gray-300 rounded'
/>
<input
placeholder='New Name'
value={updateUser.name}
onChange={(e)=>setUpdateUser({...updateUser, name:e.target.value})}
className='mb-2 w-full p-2 border border-gray-300 rounded'
/>

<input
placeholder='New Email'
value={updateUser.email}
onChange={(e)=>setUpdateUser({...updateUser, email:e.target.value})}
className='mb-2 w-full p-2 border border-gray-300 rounded'
/>
</form>
<button type='submit' className='w-full p-2 text-white bg-green-500 rounded hover'>
  Update User
</button>






 {/* Display users*/}
  

 <div className='space-y-2'>
 </div>
  {users.map((user)=>(
     <div className='flex items-center justify-beetween bg-white'>
      <CardComponent card={user} />
     </div>
    ))}
  </div>
  </main>
);
}