import { Button } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../hooks/hooks";
import { getNews } from "../API/newsAPI";

export const ButtonUpdate = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(getNews());
  };
  return (
    <>
      <Button
        onClick={handleClick}
        className="btn-date"
        variant="outlined"
        icon={<RedoOutlined />}
      >
        UPDATE LIST
      </Button>
    </>
  );
};
