import {Col, Layout, Row, Typography} from "antd";
import "./my-header.css";
import logo from "../../static/neopost-rgb-flatten.svg"
import {Link} from "react-router-dom";

const {Header} = Layout;
const {Title} = Typography;

export const MyHeader = () => {
    return (
        <Header style={{backgroundColor: "white", height: "75px"}} className={"MyHeader"}>
            {/*Applying inline styles to override styles of Ant Design,
            just to skip the lengthy process of overriding by configuring custom webpack.config.js.*/}
            <Row justify={"space-between"}>
                <Col xs={{span: 5, offset: 1}} lg={{span: 8, offset: 4}}>
                    <Link to={"/"}>
                        <img src={logo} alt={"Logo"} className={"logo"}/>
                    </Link>
                </Col>
                <Col xs={{span: 10}} lg={{span: 8}}>
                    <Row gutter={16} align={"middle"} className={"MenuContainer"}>
                        <Col>
                            <Link to={"/posts"}>
                                <Title level={5}>Posts</Title>
                            </Link>
                        </Col>
                        <Col>
                            <Link to={"/create-post"}>
                                <Title level={5}>Create</Title>
                            </Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Header>
    )
}