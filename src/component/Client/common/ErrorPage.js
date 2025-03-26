import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
   useEffect(()=>{
      document.title = "Error"
    },[]);
  return (
    <div className="container text-center">
      <h1>403 - Forbidden</h1>
      <p>You do not have permission to access this page.</p>
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
}

export default ErrorPage;
