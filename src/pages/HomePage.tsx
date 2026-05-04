import { Col, Layout, Row, Spin, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";
import { getNews } from "../API/newsAPI";
import { selectLoading, selectNews } from "../redux/newsReducer";
import { NewsCard } from "../components/NewsCard";
import { ButtonUpdate } from "../components/ButtonUpdate";

const { Title } = Typography;
const { Content } = Layout;

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const card = useAppSelector(selectNews);
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 48, color: "#722ed1" }} spin />
  );

  return (
    <Layout
      style={{
        padding: "0 50px",
        background: "linear-gradient(135deg, #91caff, #d3adf7, #ffadd2",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Content
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          width: "100%",
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

        {loading === "loading" ? (
          <div
            style={{ textAlign: "center", padding: "100px 0", width: "100%" }}
          >
            <Spin indicator={antIcon} />
            <p style={{ fontSize: "32px", color: "#FFF" }}>
              Зазрузка данных...
            </p>
          </div>
        ) : (
          <>
            <ButtonUpdate />

            <Row gutter={[24, 24]}>
              {card?.map((item, index) => (
                <Col
                  key={item.id || index}
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  xl={6}
                  style={{ display: "flex" }}
                >
                  <NewsCard key={item.id} cardInfo={item} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Content>
    </Layout>
  );
};
