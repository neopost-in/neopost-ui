import React from 'react';
import './App.css';
import {Layout, Row} from "antd";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import {Home} from "./containers/home";
import {Posts} from "./containers/posts";
import {CreatePost} from "./containers/create-post";
import {About} from "./containers/about";
import {MyHeader} from "./components/my-header";
import {PostViewer} from "./components/post-viewer";

const {Footer, Content} = Layout;

function App() {
    return (
        <Router>
            <Layout className={"App"}>
                <MyHeader/>
                <Content className={"ContentBody"} style={{minHeight:"auto"}}>
                    <Switch>
                        <Route exact path={"/"} component={Home}/>
                        <Route exact path={"/posts"} component={Posts}/>
                        <Route path={"/posts/:id"} component={PostViewer}/>
                        <Route path={"/create-post"} component={CreatePost}/>
                        <Route path={"/about"} component={About}/>
                    </Switch>
                </Content>
                <Footer className={"MyFooter"}>
                    <Row justify={"space-between"}>
                        <div>Neopost 2021</div>
                        <div>Developed By - Anshuman</div>
                    </Row>
                </Footer>
            </Layout>
        </Router>
    );
}

export default App;
