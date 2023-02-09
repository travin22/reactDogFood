import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { validatorSignUp } from './validatorSignUp'
import signUpStyles from './signUpStyles.module.css'
import { withQuery } from '../../HOCs/withQuery'
import { dogFoodApi } from '../../Api/DogFoodApi'

function SignupInner({ mutateAsync }) {
  const navigate = useNavigate()
  const submitHandler = async (data) => {
    await mutateAsync(data)
    setTimeout(() => navigate('/signin'))
  }
  return (
    <Formik
      initialValues={{
        email: '',
        group: '',
        password: '',
      }}
      validationSchema={validatorSignUp}
      onSubmit={submitHandler}
    >
      {(formik) => {
        const { isValid } = formik
        return (
          <Form className={signUpStyles.form}>
            <Field
              name="email"
              placeholder="Email here"
              type="email"
              className={signUpStyles.input}
            />
            <ErrorMessage name="email" component="p" className={signUpStyles.error} />
            <Field name="group" placeholder="sm9" type="text" className={signUpStyles.input} />
            <ErrorMessage name="group" component="p" className={signUpStyles.error} />
            <Field
              name="password"
              placeholder="Password here"
              type="password"
              className={signUpStyles.input}
            />
            <ErrorMessage name="password" component="p" className={signUpStyles.error} />
            <button
              disabled={!isValid}
              type="submit"
              className={signUpStyles.btn}
            >
              Зарегистрироваться
            </button>
          </Form>
        )
      } }
    </Formik>
  )
}
const SignupWithQuery = withQuery(SignupInner)
export function SignUp() {
  const {
    mutateAsync, isError, error, isLoading,
  } = useMutation({
    mutationFn: (data) => dogFoodApi.signUp(data),
  })

  return (
    <SignupWithQuery
      mutateAsync={mutateAsync}
      isError={isError}
      error={error}
      isLoading={isLoading}
    />

  )
}
