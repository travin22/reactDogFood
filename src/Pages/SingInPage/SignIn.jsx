import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { validatorSignIn } from './validatorSignIn'
import signInStyles from './signInStyles.module.css'

const initialValues = {
  email: '',
  password: '',
}

export function SignIn() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validatorSignIn}
      onSubmit={(values) => {
        console.log(values)
      }}
    >
      <Form className={signInStyles.form}>
        <Field name="email" placeholder="Email here" type="email" className={signInStyles.input} />
        <ErrorMessage name="email" component="p" className={signInStyles.error} />
        <Field
          name="password"
          placeholder="Password here"
          type="password"
          className={signInStyles.input}
        />
        <ErrorMessage name="password" component="p" className={signInStyles.error} />
        <button type="submit" className={signInStyles.btn}>Войти</button>
      </Form>
    </Formik>
  )
}
