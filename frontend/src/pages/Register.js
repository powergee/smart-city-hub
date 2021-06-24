import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { tryRegister } from "../shared/BackendRequests"
import { TextField, Button, Paper } from '@material-ui/core';
import "./Register.scss";

export default function Register() {
    const [id, setId]= useState("");
    const [pw, setPw]= useState("");
    const [pwRe, setPwRe]= useState("");
    const [name, setName]= useState("");
    const [idError, setIdError] = useState(false);
    const [pwError, setPwError] = useState(false);
    const [pwReError, setPwReError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [buttonText, setButtonText] = useState("회원가입");
    const history = useHistory();

    function handleIdChange(event) {
        const value = event.target.value;
        if (value.length < 1) {
            setIdError(true);
        } else {
            setIdError(false);
        }
        setId(value);
    }

    function handlePwChange(event) {
        const value = event.target.value;
        if (value.length < 6) {
            setPwError(true);
        } else {
            setPwError(false);
        }
        setPw(value);
    }

    function handlePwReChange(event) {
        const value = event.target.value;
        if (value !== pw) {
            setPwReError(true);
        } else {
            setPwReError(false);
        }
        setPwRe(value);
    }

    function handleNameChange(event) {
        const value = event.target.value;
        if (value.length < 1) {
            setNameError(true);
        } else {
            setNameError(false);
        }
        setName(value);
    }

    async function requestRegister() {
        if (id.length < 1) {
            alert("ID를 입력해주세요.");
        } else if (pw.length < 6) {
            alert("비밀번호를 6자리 이상 입력해주세요.");
        } else if (pwRe !== pw) {
            alert("입력된 두 비밀번호가 서로 다릅니다.");
        } else if (name.length < 1) {
            alert("이름을 입력해주세요.");
        } else {
            try {
                setButtonText("회원가입 중...");
                await tryRegister(id, pw, name);
                alert("가입 신청이 완료되었습니다. 서버 관리자가 해당 계정을 활성화하면 그 때부터 로그인이 가능합니다.");
                history.push("/");
            } catch (err) {
                const status = err?.response?.status;
                if (status === 400) {
                    alert("ID, 비밀번호, 이름을 조건에 맞게 모두 입력한 뒤 다시 시도해주세요.");
                } else if (status === 409) {
                    alert("주어진 ID를 사용하는 계정이 이미 있습니다. 다른 ID를 선택해주세요.");
                } else {
                    alert("알 수 없는 오류입니다. 잠시 뒤에 다시 시도하십시오: " + err);
                }
            } finally {
                setButtonText("회원가입");
            }
        }
    }

    return (
        <div className="register-root">
            <Paper variant="outlined" className="register-paper">
                <div className="register-container">
                    <div className="register-sign">
                        <h2>회원 가입</h2>
                    </div>

                    <TextField
                        variant="outlined" helperText="사용하실 ID를 입력해주세요." id="userId" error={idError}
                        label="ID" required rows={1} onChange={handleIdChange} value={id}/>

                    <TextField 
                        variant="outlined" helperText="비밀번호는 6자리 이상이어야 합니다." id="userPw" error={pwError}
                        label="비밀번호" type="password" required rows={1} onChange={handlePwChange} value={pw}/>

                    <TextField 
                        variant="outlined" helperText="비밀번호를 다시 입력해주세요." id="userPwRetype" error={pwReError}
                        label="비밀번호 확인" type="password" required rows={1} onChange={handlePwReChange} value={pwRe}/>

                    <TextField 
                        variant="outlined" helperText="이름을 입력해주세요." id="userName" error={nameError}
                        label="이름" required rows={1} onChange={handleNameChange} value={name}/>

                    <Button className="register-button" size="large" variant="outlined" onClick={requestRegister}>{buttonText}</Button>
                </div>
            </Paper>
        </div>
    )
}
