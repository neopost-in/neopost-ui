import "./posts.css";
import {Card, Col, Pagination, Row, Skeleton, Tag, Typography} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";
import {SERVER_ENDPOINT} from "../../configuration";

const {Text, Title} = Typography;

export const Posts = (props) => {
    const [posts, setPosts] = useState([]);
    const [postsFetched, setPostsFetched] = useState(false);
    const [postsFetching, setPostsFetching] = useState(false);

    const [totalPosts, setTotalPosts] = useState(0);

    const [postsPerPage, setPostsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchPageData(currentPage, postsPerPage)
    }, [])

    const fetchPageData = (reqPageNum, reqPostsPerPage) => {
        setPostsFetching(true)
        setPostsFetched(false)
        setTimeout(() => axios.get(`/v1/posts?pageNum=${reqPageNum - 1}&postsPerPage=${reqPostsPerPage}`)
            .then(resp => {
                setPostsFetching(false)
                setPostsFetched(true)
                setPosts(resp.data.content);
                setCurrentPage(resp.data.number + 1)
                setTotalPosts(resp.data.totalElements)
                window.scrollTo(0, 0)
            })
            .catch(e => console.log(e)), 1000)
    }

    const onPageChange = (page) => {
        setCurrentPage(page);
        fetchPageData(page, postsPerPage)
    }

    const onShowSizeChange = (curr, size) => {
        setPostsPerPage(size);
        fetchPageData(currentPage, size)
    }

    const titleCase = val => {
        return val.charAt(0).toUpperCase() + val.substr(1).toLowerCase()
    }

    return <div className={"PostsPage"}>
        <Col xs={{span: 18, offset: 3}} lg={{span: 12, offset: 6}}>
            <Title level={2}>Posts</Title>
            <Row gutter={[0, 16]}>
                {
                    postsFetched ? posts.map(post => (
                        <Card key={post.id} style={{width: "100%", cursor:"pointer"}} onClick={() => props.history.push({
                            pathname: `/posts/${post.id}`,
                            post: post
                        })}>
                            <Row>
                                <Col span={3}>
                                    <div className={"PostImagePlaceHolder"}>
                                    </div>
                                </Col>
                                <Col span={19} offset={2}>
                                    <Text className={"TitleText"}>{titleCase(post.title)}</Text>
                                    <Row>
                                        <Text ellipsis={true}>{post.body}</Text>
                                    </Row>
                                    <Row justify={"space-between"} style={{marginTop: "5px"}}>
                                        <Tag color="green">{post.category}</Tag>
                                        <Text>{"- " + post.author}</Text>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    )) :
                        postsFetching ?
                                [...Array(10)].map((i, ind) =>
                                    <Card key={ind} style={{width: "100%"}} bodyStyle={{padding: "12px"}}>
                                        <Row>
                                            <Col span={3}>
                                                <Skeleton.Image style={{maxHeight: "80px", maxWidth: "80px"}}/>
                                            </Col>
                                            <Col span={19} offset={2}>
                                                <Skeleton paragraph={{ rows: 2, width: "80%" }} active key={i} round className={"MySkeleton"}/>
                                            </Col>
                                        </Row>
                                    </Card>
                                )
                            : null
                }
            </Row>
            <Row justify={"center"} className={"PaginatorSection"}>
                <Pagination total={totalPosts} defaultCurrent={1} current={currentPage} onShowSizeChange={onShowSizeChange} onChange={onPageChange}/>
            </Row>
        </Col>
    </div>
}