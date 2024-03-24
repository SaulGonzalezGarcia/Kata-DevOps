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