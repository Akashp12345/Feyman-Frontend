import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Display,deleteTopic } from './data/reducer';
function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const data = useSelector(state => state.data)
  const { array } = data

  const changeflag = (flag2, ind) => {
    let flag1 = !flag2
    let f1 = array.find(item => item.id == id)
    let l1 = [...f1.list.slice(0, ind), { ...f1.list[ind], ["display"]: flag1 }, ...f1.list.slice(ind + 1)]

    dispatch(Display({ l1, id }))
  }
  const deletetopic=(ind)=>{
    
    dispatch(deleteTopic(ind))
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Card style={{ width: '18rem', marginTop: "50px", textAlign: "center" }} >
        <Card.Body >Welcome {array.map(item=>{
          if(item.id==id){
            return item.user
          }
        })}
          <Card.Title className='mt-3'>All Topic </Card.Title>
          <Button className='mt-3' variant="primary" onClick={() => navigate(`/topic/${id}`)}>Add Topic </Button>
          <ListGroup>
            {array[id - 1].list.map((item, index) =>
              <ListGroup.Item className='mt-3' style={{display:"flex",justifyContent:"space-between"}} onMouseOver={() => changeflag(item.display, index)} onMouseOut={() => changeflag(item.display, index)}><label>{item.TopicName}</label>  <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbSFJu0gx65SW6KybCcYLISKRhcCFaDvoWSg&usqp=CAU' width={20} onClick={()=>deletetopic(index)} style={item.display?{visibility:"visible"}:{display:"none"}} ></img>
                <div style={item.display ? {
                  visibility: "visible", position: "absolute", zIndex: "1", bottom: "-40%", left: "100%", marginLeft: "60px", width: "250px", backgroundColor: "purple", color: "#000", textAlign: "center", borderRadius: "6px", padding: "5px 0"
                } : { display: "none" }} >
                  <div style={{ fontWeight: "bold" }}>
                    <label>UnderStand:{item.Difficulty}%</label><br />
                    Topic Details:-<br /> {item.topicdetails.map(item =>
                      <label style={{ color: item.col }}>{item.label}</label>
                    )}
                  </div>


                </div>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Dashboard;