import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react"
import { AddTpoic } from './data/reducer';
import "./App.css"
import axios from 'axios'
function Topic() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const data = useSelector(state => state.data)
  const [topic, setTopic] = useState("")
  const [textarea, setTextarea] = useState("")
  const [total, setTotal] = useState([])
  const [flag, setFlag] = useState(false)
  const [color, setColor] = useState("black")
  const [pntge, setPntge] = useState(0)
  const { array } = data
  const onchange = (e) => {
    setFlag(!flag)
    let arr2 = []
    if (!flag) {
      let arr = textarea.trim()
      let x = 0
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == "." || arr[i] == "," || arr[i] == "?" || arr[i] == "!" || arr[i] == "@" || arr[i] == "$" || arr[i] == "%") {
          x = i
          break
        }
      }
      let remain = arr.slice(x + 1)
     
      let m = textarea.match(/[^\.\!\?\,\@\#\$\%]+[\.\!\?\,\@\#\$\%]+/g)
      m.map(item => {
        let obj = {
          label: item,
          flag1: false,
          col: color,
          val: 0

        }
        arr2.push(obj)
      })
      let obj = {
        label: remain,
        flag1: false,
        col: color,
        val: 0
      }
      arr2.push(obj)
      setTotal([...arr2])
    }
    else if (flag) {
      let obj = {
        TopicName: topic,
        Topic: textarea,
        topicdetails: total,
        Difficulty: pntge,
        display: false
      }
      let l1 = [...array[0].list, obj]
      let obj1 = {
        user:array[0].user,
        list: l1
      }
      axios.post("/topic", obj1)
      dispatch(AddTpoic({ obj, id }))
      navigate(`/dashboard/${id}`)
    }
  }
  useEffect(() => {
    let totalpoints = 0, n = total.length
    total.map(item => {
      totalpoints += Number(item.val)
    })
    let percentage = (totalpoints / (n * 4)) * 100
    let finalperc = Math.round(percentage)
    setPntge(finalperc)
  }, [total])
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

      <Card style={{ width: '18rem', marginTop: "50px", textAlign: "center" }} >
        <Card.Body >
          <Card.Title className='mt-3'>Topic</Card.Title>

          {!flag && <div> Add Topic : <input className='mt-3' placeholder='Topic name' onChange={(e) => setTopic(e.target.value)} type="text" />
            <textarea className='mt-3 mx-4 ' style={{ maxWidth: "100%", height: "150px" }} type="text" onChange={(e) => setTextarea(e.target.value)} /></div>}<br />
          {flag &&
            <div>
              <h3>{topic}</h3><hr />
              {total.map((item, index) =>


                <label onMouseOver={() => setTotal([...total.slice(0, index), { ...total[index], ["flag1"]: true }, ...total.slice(index + 1)])} onMouseOut={() => setTotal([...total.slice(0, index), { ...total[index], ["flag1"]: false }, ...total.slice(index + 1)])} style={{ ...item.flag1 ? { border: "1px solid black", borderStyle: "dashed" } : {}, marginLeft: "2px", position: "relative", color: item.col }} > {item.label} <div style={item.flag1 ? {
                  visibility: "visible", position: "absolute", zIndex: "1", bottom: "100%", left: "50%", marginLeft: "-60px", width: "150px", backgroundColor: "black", color: "#fff", textAlign: "center", borderRadius: "6px", padding: "5px 0"
                } : { display: "none" }} >

                  <button className='bt' name="lightgreen" value={4} style={{ backgroundColor: "lightgreen" }} onClick={(e) => setTotal([...total.slice(0, index), { ...total[index], ["col"]: e.target.name, ["val"]: e.target.value }, ...total.slice(index + 1)])}>UNDERSTOOD</button><br />
                  <button className='bt' name="yellow" value={3} style={{ backgroundColor: "yellow" }} onClick={(e) => setTotal([...total.slice(0, index), { ...total[index], ["col"]: e.target.name, ["val"]: e.target.value }, ...total.slice(index + 1)])}>SOMEWHAT UNDERSTOOD</button><br />
                  <button className='bt' name="skyblue" value={2} style={{ backgroundColor: "skyblue" }} onClick={(e) => setTotal([...total.slice(0, index), { ...total[index], ["col"]: e.target.name, ["val"]: e.target.value }, ...total.slice(index + 1)])}>NOT CLEAR</button><br />
                  <button className='bt' name="red" value={1} style={{ backgroundColor: "red" }} onClick={(e) => setTotal([...total.slice(0, index), { ...total[index], ["col"]: e.target.name, ["val"]: e.target.value }, ...total.slice(index + 1)])}>WHAT RUBBISH</button>


                </div></label>
              )} </div>}<br />

          <Button className='mt-3' variant="primary" onClick={() => onchange()}>{flag ? "Submit" : "Save"}</Button><br />
          {flag && <label>{pntge}%</label>}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Topic;