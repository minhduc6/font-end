import getUrlParameter from '../../ultil/TokenUltil';
import { Navigate } from "react-router-dom";
import { Button, Result } from 'antd';



const OAuth2RedirectHandler = () => {
    let token = getUrlParameter('token')
    console.log("token" , token)
    let status = getUrlParameter('status')
    console.log("status" , status)
    localStorage.setItem("ACCESS_TOKEN", token);

    return (
      <div>
        {(token != null && status == 0) ? (
          <Navigate to="/login" replace={true} />
        ) : (token != null && status == 1) ? ( <Navigate to="/profile" replace={true} />)  :
    (<Result
        status="500"
        title="500"
        subTitle="Hình Như Có Lỗi Server."
        extra={<Button type="primary">Back Home</Button>}
      />) }
      </div>
    );
  }
  
  export default OAuth2RedirectHandler;