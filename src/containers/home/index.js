import "./home.css";
import logo from "../../static/neopost-logo.svg"
import {Button, Col, Row, Typography} from "antd";
import {RecentPosts} from "../../components/recent-posts";

const {Text} = Typography;

export const Home = (props) => {
    return (
        <div className={"HomeComponent"}>
            <div className={"CenterLogo"}>
                <img src={logo} alt={"Center Logo"}/>
            </div>
            <div className={"TitleContainer"}>
                <Text className={"TitleText"}>Welcome to Neopost</Text>
                <Text className={"TitleText"}>Read, Create, Manage all the latest posts. Even in offline mode.</Text>
                <Row justify={"center"}>
                    <Col span={12} className={"DescriptionContainer"}>
                        <Text>
                            quia et suscipit suscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae
                            ut
                            ut quas totam nostrum rerum est autem sunt rem eveniet architecto
                        </Text>
                    </Col>
                </Row>
            </div>
            <Row justify={"center"} className={"ButtonContainer"}>
                <Button shape="round" size={"large"} className={"ReadMoreBtn"} onClick={() => props.history.push("/posts")}>
                    Read Posts
                </Button>
            </Row>
            <RecentPosts props={props}/>
        </div>
    )
}