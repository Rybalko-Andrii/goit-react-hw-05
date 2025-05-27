import { useLocation, useNavigate } from "react-router-dom";

const GoBackButton = ({ fallback }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const backLink = location.state?.from ?? fallback;

  return (
    <button
      className=" bg-blue-900 text-amber-200 ml-4 mt-4 pl-2 pr-2 pt-2 pb-2 rounded-lg cursor-pointer"
      onClick={() => navigate(backLink)}
    >
      Go back
    </button>
  );
};

export default GoBackButton;
