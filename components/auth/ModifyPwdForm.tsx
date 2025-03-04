'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import * as VALIDATION from '@util/validation'
import { sAlert } from '@util/sweetAlert'
import { Button, TextField } from '@mui/material'
import '@style/form.scss'

export default function ModifyPwdForm() {
    const router = useRouter()

    // Form 컨트롤 : onChange, 유효성 검사, submit
    const modifyFormikObj = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
        validationSchema: Yup.object({
            currentPassword: Yup.string()
                .required('비밀번호를 입력해주세요.')
                .min(8, '비밀번호를 8자 이상 입력해주세요.')
                .max(20, '비밀번호를 20자 이하로 입력해주세요.')
                .test(
                    'pwdValid',
                    '비밀번호는 8~20자리여야 하며, 숫자, 문자, 특수문자를 포함해야 합니다.',
                    VALIDATION.pwdRegExp,
                ),
            newPassword: Yup.string()
                .required('비밀번호를 입력해주세요.')
                .min(8, '비밀번호를 8자 이상 입력해주세요.')
                .max(20, '비밀번호를 20자 이하로 입력해주세요.')
                .test(
                    'pwdValid',
                    '비밀번호는 8~20자리여야 하며, 숫자, 문자, 특수문자를 포함해야 합니다.',
                    VALIDATION.pwdRegExp,
                ),
            newPasswordConfirm: Yup.string()
                .required('비밀번호를 입력해주세요.')
                .min(8, '비밀번호를 8자 이상 입력해주세요.')
                .max(20, '비밀번호를 20자 이하로 입력해주세요.')
                .test(
                    'pwdValid',
                    '비밀번호는 8~20자리여야 하며, 숫자, 문자, 특수문자를 포함해야 합니다.',
                    VALIDATION.pwdRegExp,
                ),
        }),
        initialValues: {
            currentPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
        },
        onSubmit: async (values: any) => {
            try {
                const response = await fetch('/api/auth/modify-pwd', {
                    method: 'POST',
                    body: JSON.stringify(values),
                })
                const data = await response.json()

                if (response.status === 200) {
                    await sAlert.success({ text: data.message })
                    router.push('/')
                } else if (response.status === 400 || response.status === 500) {
                    await sAlert.error({ text: data.message })
                }
            } catch (e) {
                console.error(e)
            }
        },
    })

    return (
        <div className="form-container">
            <h4>비밀번호 변경</h4>

            <form
                onSubmit={modifyFormikObj.handleSubmit}
                className="signUp-form"
            >
                <TextField
                    id="outlined-password-input"
                    type="password"
                    label="현재 비밀번호"
                    name="currentPassword"
                    variant="outlined"
                    value={modifyFormikObj.values.currentPassword ?? ''}
                    placeholder="비밀번호를 입력해주세요."
                    onChange={modifyFormikObj.handleChange}
                    size="small"
                    margin="normal"
                />
                {modifyFormikObj.touched.currentPassword &&
                    typeof modifyFormikObj.errors.currentPassword ===
                        'string' && (
                        <span>{modifyFormikObj.errors.currentPassword}</span>
                    )}
                <TextField
                    id="outlined-password-input"
                    type="password"
                    label="새 비밀번호"
                    name="newPassword"
                    variant="outlined"
                    value={modifyFormikObj.values.newPassword ?? ''}
                    placeholder="비밀번호를 입력해주세요."
                    onChange={modifyFormikObj.handleChange}
                    size="small"
                    margin="normal"
                />
                {modifyFormikObj.touched.newPassword &&
                    typeof modifyFormikObj.errors.newPassword === 'string' && (
                        <span>{modifyFormikObj.errors.newPassword}</span>
                    )}
                <TextField
                    id="outlined-password-input"
                    type="password"
                    label="새 비밀번호 확인"
                    name="newPasswordConfirm"
                    variant="outlined"
                    value={modifyFormikObj.values.newPasswordConfirm ?? ''}
                    placeholder="비밀번호를 입력해주세요."
                    onChange={modifyFormikObj.handleChange}
                    size="small"
                    margin="normal"
                />
                {modifyFormikObj.touched.newPasswordConfirm &&
                    typeof modifyFormikObj.errors.newPasswordConfirm ===
                        'string' && (
                        <span>{modifyFormikObj.errors.newPasswordConfirm}</span>
                    )}
                <div className="submitBtn">
                    <Button variant="outlined" size="small" type="submit">
                        변경하기
                    </Button>
                </div>
            </form>
        </div>
    )
}
