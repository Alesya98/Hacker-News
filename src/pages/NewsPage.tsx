import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { useEffect } from "react"
import { getNewsCard, textComments } from "../API/newsAPI"
import { selectComment, selectLoading, selectNew } from "../redux/newsReducer"
import { Button, Card, Layout, Space, Spin, Typography } from "antd"
import { ArrowLeftOutlined, ClockCircleOutlined, LinkOutlined , LoadingOutlined, MessageOutlined, RedoOutlined, UserOutlined} from '@ant-design/icons'
import { formatTime } from "../utils/formatTime"
import Link from "antd/es/typography/Link"
import { CommentItem } from "../components/CommentItem"



const { Content } = Layout;
const { Title, Text } = Typography; 

export const NewsPage = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const info = useAppSelector(selectNew)
    const loading = useAppSelector(selectLoading)
    const comment = useAppSelector(selectComment)
    const navigate = useNavigate()

    // console.log(comment)

    useEffect(() => {
        dispatch(getNewsCard(Number(id)))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(textComments(info?.kids))
    }, [dispatch, info?.kids])

    const handleClick = () => {
        navigate('/')
    }

    const handleClickUpdate = () => {
       dispatch(textComments(info?.kids))
    }
    
        const antIcon = (
  <LoadingOutlined style={{ fontSize: 48, color: "#722ed1" }} spin />
);

    
    return (
        <>
            {loading === 'loading' ? (
                <div style={{ textAlign: "center", padding: "100px 0", width: '100%', height: '100vh', background: 'linear-gradient(135deg, #91caff, #d3adf7, #ffadd2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection:'column' }}>
                      <Title level={2} style={{ textAlign: 'center', marginTop: '20px', marginBottom: '32px', color:'#8A2BE2', fontSize:'44px' }}>
                    Hacker News
                </Title>
                        <Spin indicator={antIcon} />
                        <p style={{fontSize:'32px', color:'#FFF'}}>Зазрузка данных...</p>
                    </div>
            ) : (
                    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #91caff, #d3adf7, #ffadd2' }}>
                        <Content style={{ padding: '24px', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
                            <div style={{
                                display: 'flex', gap: '40px',
                                justifyContent:'center'
                            }}>
                    <Button onClick={handleClick}
                        className="btn-date" variant="outlined" icon={<ArrowLeftOutlined />}> 
                        К списку новостей
                    </Button>

                    <Button onClick={handleClickUpdate}
                        className="btn-date" variant="outlined" icon={<RedoOutlined />}> 
                        Обновить коментарий
                        </Button>       
                            </div>
                            <Card className="new__card" style={{ borderRadius: 16, boxShadow: '0, 4px 12px rgba(0, 0, 0, 0.1', marginBottom: 24, padding: '32px',  background: 'rgba(255, 255, 255, 0.85)' }}>
                                <Link href={info?.url} target="_blank">
                                <LinkOutlined />    Открыть новость</Link>
                                <Title level={2} style={{marginBottom: 16, fontWeight: 600, fontSize: '26px', color:'#8A2BE2'}}>
                                    {info?.title}
                                </Title>
                                
                                <Space size="large">
                                    <Text >
                                        <ClockCircleOutlined />  {formatTime(info?.time)}
                                    </Text>

                                    <Text>
                                        <UserOutlined/> {info?.by || 'anonymous'}
                                    </Text>

                                    {info?.kids.length > 0 && (
                                    <Text type="secondary" style={{ fontSize:  13}}>
                                    <MessageOutlined/>{info?.kids.length}
                                        </Text>
                                    )}
                                 </Space>
                            </Card>
                            
                              <>
                                 {comment.length === 0 ? (<p style={{fontSize:'26px', color:'#FFFFFF'}}>Комментарии отсутствуют</p>) : (
                                    comment?.map((item) => (
                                <CommentItem key={item.id} comment={item} />
                                 ))
                                        )}  
                                    </>

                            
                        </Content>
                    </Layout>

         )}  
        </>
    )
}