import { useEffect, useState } from "react";
import isLoggedIn from "../components/isLoggedIn";
import firebase from "firebase/compat/app";
import firebaseConfig from "../components/config/firebaseConfig";
import "firebase/compat/database"
import { useNavigate } from 'react-router-dom';
export default function Dashboard() {

  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");
  const dept = localStorage.getItem("dept");
  const [name, setName] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    firebase.initializeApp(firebaseConfig)

    const isUserLoggedIn = isLoggedIn();
    if (!isUserLoggedIn) {
      window.location.href = "/";
      return null;
    }
    const userRef = firebase.database().ref("Departments").child(dept).child(role).child(user);
    const userData = userRef.on("value", snapshot => {
      setName(snapshot.val().name);
    }
    );

  }, [])

  



  return (
    <div className="container my-4 px-5 py-4 rounded shadow bg-body-tertiary">
      <h2 className="mb-4">Welcome, {name} </h2>
      <div>
        <h4>ASHE Report</h4>
        <p style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium eius a omnis impedit at quam, obcaecati eveniet. Quidem, quo alias. Doloribus molestias aspernatur commodi similique placeat dignissimos molestiae aliquid facilis autem. Suscipit quas quidem itaque veniam ipsa nam labore, quod corporis error asperiores tenetur vero unde officiis numquam modi, dicta libero dolorum quos maiores quam iste ea excepturi? Voluptatibus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Non rerum ad consequuntur! Eaque, magni repellendus sit, similique veniam aut omnis sequi vitae ea distinctio delectus maxime temporibus rem voluptatum corrupti.</p>
      </div>
      <div className="text-end">
        <button type="button" onClick={()=>{
          navigate("/aishe-report")
        }} class="btn btn-outline-success">Generate Report</button>
      </div>
    </div>
  );
}