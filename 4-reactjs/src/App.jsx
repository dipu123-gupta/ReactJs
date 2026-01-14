import { useEffect, useState } from "react";
// // [<img>]

// function App(){
   
//    const [users,setUsers] = useState([]);
//   //  const [name,setName] = useState("");
//   const [count,setCount] = useState(30);

   
//   useEffect(()=>{
     
//     async function GithubProfile() {
       
//     const response = await fetch(`https://api.github.com/users?per_page=${count}`);
//     const data = await response.json();
//     setUsers(data);
//     console.log("Hello");
//    }

//    GithubProfile();

//   },[count]) 
  
//   function handleChange(e){
//     setName(e.target.value.toUpperCase());
//   }

//   return (
//     <>
//     <h1>Github User</h1>
//     <input type="number" value={count} onChange={(e)=>setCount(e.target.value)}></input>
//     <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap" , gap:"10px"}}>
//       {
//         users.map(user=>(
//           <img src={user.avatar_url} height={"100px"} width={"100px"} key={user.login}/>
//         ))
//       }
//     </div>
//     </>
//   )
// }

// export default App;



function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch('https://api.github.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.login}</li>
      ))}
    </ul>
  );
}

export default UserList;