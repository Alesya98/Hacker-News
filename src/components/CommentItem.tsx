import { Card } from "antd";
import type { NewsType } from "../types/news";

type CommentsListProps = {
  comment: NewsType;
}

export const CommentItem = ({ comment }: CommentsListProps) => {
    // console.log(comment)
    return (
      <Card style={{marginBottom: '20px', background: 'rgba(255, 255, 255, 0.85)', fontSize:'16px' }}>
        {comment?.text}
      </Card>
    )
}