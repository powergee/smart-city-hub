import React, { useState, useEffect } from 'react';
import { withCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { tryLogin } from "../shared/BackendRequests"
import getToken from "../shared/GetToken";
import { TextField, Button, Paper, Link, Checkbox, FormControlLabel } from '@material-ui/core';
import "./Login.scss"

function Login(props) {
    const [id,setId]= useState("");
    const [pw,setPw]= useState("");
    const [buttonText, setButtonText] = useState("Login");
    const [checked, setChecked] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (getToken(props.cookies)) {
            alert("이미 로그인 되어있습니다. 로그아웃을 한 뒤 다시 시도하십시오.");
            history.push("/");
        }

        if (props.cookies) {
            let savedId = props.cookies.get("savedId");
            if (savedId) {
                setId(String(savedId));
                setChecked(true);
            }
        }
    }, []);

    function changeId(event){
        setId(event.target.value);
    }

    function changePw(event){
        setPw(event.target.value);
    }

    function handleCheckboxChange(event) {
        setChecked(event.target.checked);
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            requestLogin();
            event.preventDefault();
        }
    }

    function redirectTo(path) {
        if (checked) {
            props.cookies.set("savedId", id, { path: '/' });
        } else {
            props.cookies.remove("savedId", { path: '/' });
        }

        history.push(path);
    }

    async function requestLogin() {
        try {
            setButtonText("로그인 중...");
            await tryLogin(id, pw);
            redirectTo("/");
        } catch (err) {
            if (err === 400) {
                alert("ID와 비밀번호를 모두 입력한 뒤 다시 시도해주세요.");
            } else if (err === 401 || err === 404) {
                alert("ID와 비밀번호가 잘못되었습니다.");
            } else if (err === 403) {
                alert("현재 이 계정은 등록된 이후 가입이 허용되지 않았습니다. 서버 관리자에게 문의하십시오.");
            } else {
                alert("알 수 없는 오류입니다. 잠시 뒤에 다시 시도하십시오: " + err);
            }
        } finally {
            setButtonText("로그인");
        }
    }

    return (
        <div className="login-root">
            <Paper variant="outlined" className="login-paper">
                <div className="login-container">
                    <div className="login-sign">
                        <h2>로그인</h2>
                    </div>
                    <TextField variant="outlined" id="userId" label="ID" required rows={1} rowsMax={10} onChange={changeId} onKeyPress={handleKeyPress} value={id}></TextField>
                    <TextField variant="outlined" id="userPw" label="Password" type="password" required rows={1} rowsMax={10} onChange={changePw} onKeyPress={handleKeyPress} value={pw}></TextField>
                    <FormControlLabel
                        control={<Checkbox checked={checked} onChange={handleCheckboxChange} color="secondary"></Checkbox>}
                        label="아이디 저장"
                    />

                    <Button className="login-button" size="large" variant="outlined" onClick={requestLogin}>{buttonText}</Button>

                    <div className="login-sign">
                        <Link onClick={() => redirectTo("/register")}>회원 가입</Link>
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default withCookies(Login);