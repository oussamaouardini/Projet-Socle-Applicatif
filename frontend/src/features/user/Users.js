import React from 'react';
import '../../App.css'
import { Layout, Menu, theme, Empty, Spin  } from "antd";
import { useState, useEffect } from 'react';
import {UserOutlined } from '@ant-design/icons';
import {addUser, fetchUsers, dropUser} from "./userSlice";
import {useDispatch, useSelector} from "react-redux";
import './users.css';

const { Header, Content, Footer, Sider } = Layout;
const items = [
    getItem('Users', '1', <UserOutlined />),
];

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

function Users() {

    const dispatch = useDispatch();
    const [displayForm, setdisplayForm] = useState('none');
    const [collapsed, setCollapsed] = useState(false);
    const { users, errors, status, } = useSelector((state) => state.user);
    const {token: { colorBgContainer },} = theme.useToken();
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");

    useEffect(()=>{
        dispatch(fetchUsers());
    }, [dispatch]);

    const renderUsers =()=>{
        if(status){
            return <Spin />
        }
        if(users.length <=0){
            return <Empty />;
        }
        return<div className='mainContent'>
            <table>
                <thead><tr>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Action</th>
                </tr></thead>
                <tbody>
                {users.map((user, index) => {
                    return <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.nom}</td>
                        <td>{user.prenom}</td>
                        <td>{user.email}</td>
                        <td>{user.gender}</td>
                        <td>
                            <button className='btn btn-warning' onClick={()=> deleteUser(user.id) } > Delete </button>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>;
    }

    const add_hide_user = (event) => {
        event.preventDefault();
        if(displayForm==='none'){
            setdisplayForm('block');
        }else{
            setdisplayForm('none');
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addUser({'nom':nom, 'prenom':prenom, 'email':email, 'gender':gender}))
        dispatch(fetchUsers());
    }
    const deleteUser = (id) => {
        dispatch(dropUser(id));
        dispatch(fetchUsers());
    }

    return (
        <>
        <div className="tt">

            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div
                        style={{
                            height: 32,
                            margin: 16,
                            background: 'rgba(255, 255, 255, 0.2)',
                        }}
                    />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
                </Sider>
                <Layout className="site-layout">
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    />
                    <Content
                        style={{
                            margin: '0 16px',
                        }}
                    >
                        <button className='btn btn-info' style={{marginTop:'5px', marginBottom:'5px', float:'right'}} onClick={add_hide_user} >Ajouter un utilisateur</button>
                        <div className="adduser" style={{display:displayForm}}>
                            <div className="justify-content-center" style={{width:'50%', margin:'2% auto'}}>
                                <form className="form-horizontal" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2" htmlFor="nom">Nom:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="nom" placeholder="Enter nom" value={nom} onChange={(e) => setNom(e.target.value)}/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-2" htmlFor="prenom">Prenom:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="prenom" placeholder="Enter prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)}/>
                                        </div>
                                    </div>



                                    <div className="form-group">
                                        <label className="control-label col-sm-2" htmlFor="email">Email:</label>
                                        <div className="col-sm-10">
                                            <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2" htmlFor="gender">Gender:</label>
                                        <div className="col-sm-10">
                                            <select className="form-control" name="gender" required defaultValue={'DEFAULT'} onChange={(e) => setGender(e.target.value)}  >
                                                <option disabled value="DEFAULT">Default select</option>
                                                <option value="0">MAN</option>
                                                <option value="1">WOMAN</option>
                                                <option value="2">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-sm-offset-2 col-sm-10">
                                            <button type="submit" className="btn btn-success">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {renderUsers()}
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        ©2023 Created by Oussama Ouardini
                    </Footer>
                </Layout>
            </Layout>

        </div>
        </>
    );
}

export default Users;
