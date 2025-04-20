import { useLocation, useNavigate } from "react-router-dom";

const GoBackButton = ({ fallback }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const backLink = location.state?.from ?? fallback;

  return <button onClick={() => navigate(backLink)}>Go back</button>;
};

export default GoBackButton;
