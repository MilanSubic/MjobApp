import React, {useState, useEffect} from "react";
import "./index.css";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import korisnikService from "../../../services/korisnik.service";
import FormControl from "@mui/material/FormControl";

import { Button, List, Skeleton } from 'antd';
import TextField from "@mui/material/TextField";
import { Form} from "antd";

const UpravljanjeNalozima=()=>
{
    const [form] = Form.useForm();
    const [list, setList] = useState([]);
    const [user, setUser] = useState();
    const [ime, setIme] = useState();

    useEffect(() => {
        korisnikService.getAll().then((res) => {
            setList(res);
        })
    }, []);
    const setRightSide = (user) =>
    {
        setUser(user);
        setIme(user.ime);
    }
    return(
        <div className="upravljanjeNalozimaAdmin">
            <div className="left-side">
                <Box
                    sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <List
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={list}
                        renderItem={(item) => (
                        <ListItem >
                                <List.Item.Meta
                                    title={<Button type={"text"} onClick={setRightSide(item)}>{item.korisnickoIme+" "+item.prezime}</Button>}
                                />
                        </ListItem>)}
                            >
                    </List>
                </Box>
            </div>
            <div className="right-side">

                <Form form={form}>
                    <div className="modal">
                                <Form.Item
                                    name="ime"
                                    rules={[{ required: true, message: "fieldRequired" }]}
                                >
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
                                        <TextField
                                            type="text"
                                            defaultValue={ime}
                                        />
                                    </FormControl>                                </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    );
};
export default UpravljanjeNalozima;