import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { validatorSignIn } from './validatorSignIn'
import signInStyles from './signInStyles.module.css'
import { AppSetContext } from '../../context/AppContextProvider'
import { withQuery } from '../../HOCs/withQuery'
import { dogFoodApi } from '../../Api/DogFoodApi'

function SigninInner({ mutateAsync }) {
  const navigate = useNavigate()
  const submitHandler = async (values) => {
    await mutateAsync(values)
    setTimeout(() => navigate('/products'))
  }
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validatorSignIn}
      onSubmit={submitHandler}
    >
      {(formik) => {
        const { isValid } = formik
        return (
          <Form className={signInStyles.form}>
            <Field
              name="email"
              placeholder="Email here"
              type="email"
              className={signInStyles.input}
            />
            <ErrorMessage name="email" component="p" className={signInStyles.error} />
            <Field
              name="password"
              placeholder="Password here"
              type="password"
              className={signInStyles.input}
            />
            <ErrorMessage name="password" component="p" className={signInStyles.error} />
            <button
              disabled={!isValid}
              type="submit"
              className={signInStyles.btn}
            >
              Войти

            </button>
          </Form>
        )
      }}
    </Formik>
  )
}
const SigninWithQuery = withQuery(SigninInner)
function Signin() {
  console.log('render signin')
  const { setToken, setUserID } = useContext(AppSetContext)
  const {
    mutateAsync, isError, error, isLoading,
  } = useMutation({
    mutationFn: (values) => dogFoodApi.signin(values)
      .then((result) => {
        setToken(result.token)
        setUserID(result.data.id)
      }),
  })

  return (
    <SigninWithQuery
      mutateAsync={mutateAsync}
      isError={isError}
      error={error}
      isLoading={isLoading}
    />

  )
}
export const SigninMemo = React.memo(Signin)
