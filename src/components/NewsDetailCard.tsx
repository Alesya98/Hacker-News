import { Card, Typography, Space } from "antd";
import {
  ClockCircleOutlined,
  LinkOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { formatTime } from "../utils/formatTime";
import { useAppSelector } from "../hooks/hooks";
import { selectNews } from "../redux/newsReducer";
import { useParams } from "react-router-dom";

const { Title, Text, Link } = Typography;

export const NewsDetailCard = () => {
  const { id } = useParams<{ id: string }>();
  const info = useAppSelector(selectNews);

  const newsCard = info?.find((item) => item.id === Number(id));

  return (
    <Card
      className="new__card"
      style={{
        borderRadius: 16,
        boxShadow: "0, 4px 12px rgba(0, 0, 0, 0.1",
        marginBottom: 24,
        padding: "32px",
        background: "rgba(255, 255, 255, 0.85)",
      }}
    >
      <Link href={newsCard?.url} target="_blank">
        <LinkOutlined /> Открыть новость
      </Link>
      <Title
        level={2}
        style={{
          marginBottom: 16,
          fontWeight: 600,
          fontSize: "26px",
          color: "#8A2BE2",
        }}
      >
        {newsCard?.title ?? undefined}
      </Title>

      <Space size="large">
        <Text>
          <ClockCircleOutlined /> {formatTime(newsCard?.time ?? 0)}
        </Text>

        <Text>
          <UserOutlined /> {newsCard?.by || "anonymous"}
        </Text>

        {(newsCard?.kids?.length ?? 0) > 0 && (
          <Text type="secondary" style={{ fontSize: 13 }}>
            <MessageOutlined />
            {newsCard?.kids?.length}
          </Text>
        )}
      </Space>
    </Card>
  );
};
