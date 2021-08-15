import {Card, Col, Divider, Row, Skeleton, Typography} from "antd";
import "./recent-posts.css";
import image1 from "../../static/images/solar1.png";
import image2 from "../../static/images/small-image1.png";
import image3 from "../../static/images/small-image2.png";
import image4 from "../../static/images/small-image3.png";
import image5 from "../../static/images/small-image4.png";
import {useEffect, useState} from "react";
import axios from "axios";
import {SERVER_ENDPOINT} from "../../configuration";

const {Text, Title, Paragraph} = Typography;

export const RecentPosts = (props) => {
    const [postsFetching, setPostsFetching] = useState(false);
    const [postsFetched, setPostsFetched] = useState(false)
    const [recentPosts, setRecentPosts] = useState([]);

    const images = [image1, image2, image3, image4, image5];

    useEffect(() => {
        setPostsFetching(true)
        setTimeout(() => axios.get("/v1/posts?pageNum=0&postsPerPage=5")
            .then(resp => {
                setPostsFetching(false)
                setRecentPosts(resp.data.content)
                setPostsFetched(true)
            })
            .catch(e => console.log(e)), 500);
    }, [props])

    const openRecentPost = (post) => {
        props.props.history.push({
            pathname: `/posts/${post.id}`,
            post: post
        })
        window.scrollTo(0, 0)
    }

    return (
        <div className={"RecentPostContainer"}>
            <Col xs={{span: 16, offset: 4}} lg={{span: 12, offset: 6}}>
                <Row className={"TitleContainer"}>
                    <Divider plain>
                        <Text className={"TitleText"}>
                            Recent Posts
                        </Text>
                    </Divider>
                </Row>

                <Row className={"PostContainerRow"}>
                    <Row gutter={[0, 6]} style={{width: "100%"}}>
                        {
                            postsFetched ?
                                recentPosts.map((post, index) => {
                                    return <Card key={post.id} className={"RecentPostCard"}
                                                 bodyStyle={{padding: "12px"}} onClick={() => openRecentPost(post)}>
                                        <Row>
                                            <Col xs={{span: 8}} sm={{span: 3}} md={{span: 2}} lg={{span: 2}}>
                                                <Row>
                                                    <img src={images[index]} alt={"post"}
                                                         className={"PostSmallImage"}/>
                                                </Row>
                                            </Col>
                                            <Col xs={{span: 12, offset: 4}} sm={{span: 16, offset: 4}} md={{span: 18, offset: 4}} lg={{span: 20, offset: 2}}>
                                                <Row>
                                                    <Title level={5}>{post.title}</Title>
                                                </Row>
                                                <Row>
                                                    <Paragraph ellipsis={{rows: 2}}>{post.body}</Paragraph>
                                                </Row>
                                                <Row>
                                                    <Text>{"- " + post.author}</Text>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Card>
                                })
                                : postsFetching ?
                                <Row gutter={[0, 6]} style={{width: "100%"}}>
                                    {[...Array(5)].map((i, ind) =>
                                        <Card key={ind} style={{width: "100%"}} bodyStyle={{padding: "12px"}}>
                                            <Row>
                                            <Col xs={{span: 8}} sm={{span: 3}} md={{span: 2}} lg={{span: 2}}>
                                                <Skeleton.Image className={"SkeletonImage"}/>
                                            </Col>
                                            <Col xs={{span: 12, offset: 4}} sm={{span: 16, offset: 4}} md={{span: 18, offset: 4}} lg={{span: 20, offset: 2}}>
                                                <Skeleton paragraph={{ rows: 2, width: "80%" }} active key={i} round className={"MySkeleton"}/>
                                            </Col>
                                            </Row>
                                        </Card>
                                    )}
                                </Row>: null
                        }
                    </Row>
                </Row>
            </Col>
        </div>
    )
}