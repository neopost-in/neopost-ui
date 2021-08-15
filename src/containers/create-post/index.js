import {Button, Col, Form, Input, message, Typography} from "antd";
import axios from "axios";
import {SERVER_ENDPOINT} from "../../configuration";

const {Title} = Typography;

export const CreatePost = (props) => {
    const [form] = Form.useForm();

    const onFormSubmit = (values) => {
        axios.post("/v1/posts", values)
            .then(resp => {
                message.success(`Post ${resp.data.title} created successfully.`);
                props.history.push("/posts")
            })
            .catch(err => {
                console.log(err)
                message.error(`Post creation failed.`);
            })
    }

    return (
        <div className={"CreatePostFormsContainer"}>
            <Col xs={{span: 18, offset: 3}} lg={{span: 12, offset: 6}}>
                <Title level={2}>Create Post</Title>
                <Form
                    name="create-post"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    form={form}
                    onFinish={onFormSubmit}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{required: true, message: 'Please input post title!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Author"
                        name="author"
                        rules={[{required: true, message: 'Please input post author!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{required: true, message: 'Please input post category!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Language"
                        name="language"
                        rules={[{required: true, message: 'Please input post language!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Tags"
                        name="tags"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Body"
                        name="body"
                        rules={[{required: true, message: 'Please input post body!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item style={{display: "flex", justifyContent: "flex-end"}}>
                        <Button type="primary" htmlType={"submit"}>Create</Button>
                    </Form.Item>
                </Form>
            </Col>
        </div>
    )
}