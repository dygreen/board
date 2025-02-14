'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import * as VALIDATION from '@util/validation'
import { useRouter } from 'next/navigation'
import { Button, TextField } from '@node_modules/@mui/material'
import React from 'react'
import '@style/form.scss'
import { sAlert } from '@util/sweetAlert'

export default function Register() {
    const router = useRouter()

    // Form 컨트롤 : onChange, 유효성 검사, submit
    const registerFormikObj = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
        validationSchema: Yup.object({
            name: Yup.string()
                .required('이름을 입력해주세요.')
                .min(1, '이름을 1자 이상 입력해주세요.')
                .test(
                    'nameValid',
                    '이름 형식이 올바르지 않습니다.',
                    VALIDATION.nameRegExp,
                ),
            email: Yup.string()
                .required('이메일을 입력해주세요.')
                .test(
                    'emailValid',
                    '이메일 형식이 올바르지 않습니다.',
                    VALIDATION.emailRegExp,
                ),
            password: Yup.string()
                .required('비밀번호를 입력해주세요.')
                .min(4, '비밀번호를 4자 이상 입력해주세요.')
                .max(20, '비밀번호를 20자 이하로 입력해주세요.')
                .test(
                    'pwdValid',
                    '비밀번호 형식이 올바르지 않습니다.',
                    VALIDATION.pwdRegExp,
                ),
        }),
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        onSubmit: async (values: any) => {
            try {
                const response = await fetch('/api/auth/signUp', {
                    method: 'POST',
                    body: JSON.stringify(values),
                })
                const data = await response.json()

                if (response.status === 200) {
                    await sAlert.success({ text: data.message })
                    router.push('/')
                } else if (response.status === 500) {
                    await sAlert.error({ text: data.message })
                }
            } catch (e) {
                console.error(e)
            }
        },
    })

    return (
        <div className="form-container">
            <h4>회원가입</h4>

            <form
                onSubmit={registerFormikObj.handleSubmit}
                className="signUp-form"
            >
                <TextField
                    id="outlined-basic"
                    label="name"
                    name="name"
                    variant="outlined"
                    value={registerFormikObj.values.name ?? ''}
                    placeholder="이름을 입력해주세요."
                    onChange={registerFormikObj.handleChange}
                    size="small"
                    margin="normal"
                />
                {registerFormikObj.touched.name &&
                    typeof registerFormikObj.errors.name === 'string' && (
                        <span>{registerFormikObj.errors.name}</span>
                    )}
                <TextField
                    id="outlined-basic"
                    label="email"
                    name="email"
                    variant="outlined"
                    value={registerFormikObj.values.email ?? ''}
                    placeholder="이메일을 입력해주세요."
                    onChange={registerFormikObj.handleChange}
                    size="small"
                    margin="normal"
                />
                {registerFormikObj.touched.email &&
                    typeof registerFormikObj.errors.email === 'string' && (
                        <span>{registerFormikObj.errors.email}</span>
                    )}
                <TextField
                    id="outlined-password-input"
                    type="password"
                    label="password"
                    name="password"
                    variant="outlined"
                    value={registerFormikObj.values.password ?? ''}
                    placeholder="비밀번호를 입력해주세요."
                    onChange={registerFormikObj.handleChange}
                    size="small"
                    margin="normal"
                />
                {registerFormikObj.touched.password &&
                    typeof registerFormikObj.errors.password === 'string' && (
                        <span>{registerFormikObj.errors.password}</span>
                    )}
                <div className="submitBtn">
                    <Button variant="outlined" size="small" type="submit">
                        가입하기
                    </Button>
                </div>
            </form>
        </div>
    )
}
