import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";
import { getNews, textComments } from "../API/newsAPI";
import { selectComment, selectLoading, selectNew } from "../redux/newsReducer";
import { Button, Layout, Spin, Typography } from "antd";
import {
  ArrowLeftOutlined,
  LoadingOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { CommentItem } from "../components/CommentItem";
import { NewsDetailCard } from "../components/NewsDetailCard";

const { Content } = Layout;
const { Title } = Typography;

export const NewsPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectNew);
  const loading = useAppSelector(selectLoading);
  const comment = useAppSelector(selectComment);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(textComments(info?.kids ?? []));
  }, [dispatch, info?.kids]);

  const handleClick = () => {
    navigate("/");
  };

  const handleClickUpdate = () => {
    dispatch(textComments(info?.kids ?? []));
  };

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 48, color: "#722ed1" }} spin />
  );

  return (
    <>
      {loading === "loading" ? (
        <div
          style={{
            textAlign: "center",
            padding: "100px 0",
            width: "100%",
            height: "100vh",
            background: "linear-gradient(135deg, #91caff, #d3adf7, #ffadd2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Title
            level={2}
            style={{
              textAlign: "center",
              marginTop: "20px",
              marginBottom: "32px",
              color: "#8A2BE2",
              fontSize: "44px",
            }}
          >
            Hacker News
          </Title>
          <Spin indicator={antIcon} />
          <p style={{ fontSize: "32px", color: "#FFF" }}>Зазрузка данных...</p>
        </div>
      ) : (
        <Layout
          style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #91caff, #d3adf7, #ffadd2",
          }}
        >
          <Content
            style={{
              padding: "24px",
              maxWidth: 1400,
              margin: "0 auto",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "40px",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={handleClick}
                className="btn-date"
                variant="outlined"
                icon={<ArrowLeftOutlined />}
              >
                К списку новостей
              </Button>

              <Button
                onClick={handleClickUpdate}
                className="btn-date"
                variant="outlined"
                icon={<RedoOutlined />}
              >
                Обновить коментарий
              </Button>
            </div>
            <NewsDetailCard />

            <>
              {comment?.length === 0 ? (
                <p style={{ fontSize: "26px", color: "#FFFFFF" }}>
                  Комментарии отсутствуют
                </p>
              ) : (
                comment?.map((item) => (
                  <CommentItem key={item.id} comment={item} />
                ))
              )}
            </>
          </Content>
        </Layout>
      )}
    </>
  );
};
