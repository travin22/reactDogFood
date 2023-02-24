import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import React from 'react'
import { validatorSignIn } from './validatorSignIn'
import signInStyles from './signInStyles.module.css'
import { dogFoodApi } from '../../Api/DogFoodApi'
import { setNewUser } from '../../redux/slices/userSlice'
import { REDUX_CART_LS_KEY } from '../../redux/constants'
import { cartInitialize } from '../../redux/slices/cartSlice'
import { withQuery } from '../../components/HOCs/withQuery'

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
  const dispatch = useDispatch()
  const {
    mutateAsync, isError, error, isLoading,
  } = useMutation({
    mutationFn: (values) => dogFoodApi.signIn(values)
      .then((user) => {
        const cartFormLS = window.localStorage.getItem(REDUX_CART_LS_KEY)
        if (cartFormLS) {
          const cartForCurrentUser = JSON.parse(cartFormLS)[user.data._id]
          dispatch(cartInitialize(cartForCurrentUser ?? []))
        }
        dispatch(setNewUser(user.data._id, user.token, user.data.email))
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
export const SignInMemo = React.memo(Signin)
