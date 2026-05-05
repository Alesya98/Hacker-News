import { Card, Space, Tag, Typography } from "antd";
import {
  ClockCircleOutlined,
  LikeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { NewsType } from "../types/news";
import { formatTime } from "../utils/formatTime";
import { useNavigate } from "react-router-dom";

type CardProps = {
  cardInfo: NewsType;
};

const { Title, Text } = Typography;

export const NewsCard = ({ cardInfo }: CardProps) => {
  const navigate = useNavigate();

  const handeleClick = () => {
    navigate(`/news/${cardInfo.id}`, { state: cardInfo });
  };

  return (
    <Card
      className="card"
      hoverable
      style={{
        marginBottom: "16",
        borderRadius: 12,
        transition: "all 0.3s ease-in-out",
        border: "2px solid #f0f0f0",
        padding: "20px 24px",
        background: "rgba(255, 255, 255, 0.85)",
      }}
      onClick={handeleClick}
    >
      <Title level={5} style={{ marginBottom: 12, fontWeight: "500" }}>
        {cardInfo.title}
      </Title>
      <Space size="middle" wrap>
        <Tag color="blue" style={{ borderRadius: 16, margin: 0 }}>
          <LikeOutlined /> {cardInfo.score || 0}
        </Tag>

        <Text type="secondary" style={{ fontSize: 13 }}>
          <UserOutlined /> {cardInfo.by || "anonymous"}
        </Text>

        <Text type="secondary" style={{ fontSize: 13 }}>
          <ClockCircleOutlined /> {formatTime(cardInfo.time)}
        </Text>
      </Space>
    </Card>
  );
};
