import { Card, Typography, Space } from "antd";
import {
  ClockCircleOutlined,
  LinkOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { formatTime } from "../utils/formatTime";
import { useLocation } from "react-router-dom";

const { Title, Text, Link } = Typography;

export const NewsDetailCard = () => {
  const { state } = useLocation();

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
      <Link href={state?.url} target="_blank">
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
        {state?.title ?? undefined}
      </Title>

      <Space size="large">
        <Text>
          <ClockCircleOutlined /> {formatTime(state?.time ?? 0)}
        </Text>

        <Text>
          <UserOutlined /> {state?.by || "anonymous"}
        </Text>

        {(state?.kids?.length ?? 0) > 0 && (
          <Text type="secondary" style={{ fontSize: 13 }}>
            <MessageOutlined />
            {state?.kids?.length}
          </Text>
        )}
      </Space>
    </Card>
  );
};
