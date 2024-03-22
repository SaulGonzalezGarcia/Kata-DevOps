import React from 'react'
import useState from 'react'
import useEffect  from 'react'
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

  fetch(data);
  },[]);
}
