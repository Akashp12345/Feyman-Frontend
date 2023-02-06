import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Add } from './data/reducer';
import { useState } from "react"
import axios from 'axios'
function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)
  const [username, setUsername] = useState("")
  const onchange = (e) => {
    let obj = {
      id: data.array.length + 1,
      user: username,
      list: []
    }
     axios.post("/",obj)
     .then(res=>
      {dispatch(Add(res.data.Topic))
        console.log(res.data)
        navigate(`/dashboard/${obj.id}`)
      }
     )
     .catch(err=>console.log(err))
   
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

      <Card style={{ width: '18rem', marginTop: "50px", textAlign: "center" }} >
        <Card.Body >
          <Card.Title className='mt-3'>Login</Card.Title>
          <input className='mt-3' placeholder='Username' onChange={(e) => setUsername(e.target.value)} type="text" />
          <Button className='mt-3' variant="primary" onClick={() => onchange()}>Login</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Home;