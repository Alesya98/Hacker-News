import { Button, Card } from "antd";
import type { NewsType } from "../types/news";
import HTMLReactParser from "html-react-parser/lib/index";
import { useAppDispatch } from "../hooks/hooks";
import { kidsComments } from "../API/newsAPI";
import { useState } from "react";

type CommentsListProps = {
  comment: NewsType;
};

export const CommentItem = ({ comment }: CommentsListProps) => {
  const [replies, setReplies] = useState<NewsType[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useAppDispatch();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isVisible && comment.kids && comment.kids.length > 0) {
      try {
        const result = await dispatch(kidsComments(comment.kids)).unwrap();
        setReplies(result);
      } catch (e) {
        console.error("Ошибка загрузки ответов:", e);
      }
    }
    setIsVisible(!isVisible);
  };

  return (
    <Card
      style={{
        marginBottom: "20px",
        background: "rgba(255, 255, 255, 0.85)",
        fontSize: "16px",
      }}
    >
      <div>{HTMLReactParser(comment?.text || "")}</div>

      {comment.kids && comment.kids.length > 0 && (
        <Button
          type="link"
          onClick={handleClick}
          style={{ padding: 0, marginTop: "10px", display: "block" }}
        >
          {isVisible
            ? "Скрыть ответы"
            : `Показать ответы (${comment.kids.length})`}
        </Button>
      )}

      {isVisible && (
        <div
          style={{
            marginTop: "10px",
            paddingLeft: "20px",
            borderLeft: "2px solid #f0f0f0",
          }}
        >
          {replies?.map((reply) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </Card>
  );
};
