import {Button, Col, Descriptions, message, PageHeader, Typography} from "antd";
import "./post-viewer.css"
import {useEffect} from "react";
import axios from "axios";
import {SERVER_ENDPOINT} from "../../configuration";

const {Paragraph} = Typography;

export const PostViewer = (props) => {

    useEffect(() => {
        console.log(props)
    })

    const onPostDelete = id => {
        axios.delete(`/v1/posts/${id}`)
            .then(resp => {
                if (resp) {
                    props.history.push("/posts")
                    message.success("Post deleted successfully.")
                } else {
                    message.success("Post deletion failed.")
                }
            })
            .catch( err => {
                message.error("Post deletion failed.")
            })
    }

    return (
        <div className={"PostViewerContainer"}>
            <Col xs={{span: 18, offset: 3}} lg={{span: 12, offset: 6}}>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title={props.location.post.title}
                    subTitle="10 Minutes Read"
                    extra={[
                        <Button key="3" type={"danger"} onClick={() => onPostDelete(props.location.post.id)}>Delete</Button>,
                    ]}
                    >
                    <Descriptions size="small" column={2}>
                        <Descriptions.Item label="Author">{props.location.post.author}</Descriptions.Item>
                        <Descriptions.Item label="Category">{props.location.post.category}</Descriptions.Item>
                        <Descriptions.Item label="Tags">{props.location.post.tags}</Descriptions.Item>
                        <Descriptions.Item label="Language">{props.location.post.language}</Descriptions.Item>
                    </Descriptions>
                </PageHeader>

                <Typography>
                    <Paragraph>
                        {props.location.post.body}
                    </Paragraph>
                </Typography>
            </Col>
        </div>
    )
}