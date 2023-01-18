import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { validatorSignUp } from './validatorSignUp'
import signUpStyles from './signUpStyles.module.css'

const initialValues = {
  email: '',
  group: '',
  password: '',
}

export function SignUp() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validatorSignUp}
      onSubmit={(values) => {
        console.log(values)
      }}
    >
      <Form className={signUpStyles.form}>
        <Field name="email" placeholder="Email here" type="email" className={signUpStyles.input} />
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
        <button type="submit" className={signUpStyles.btn}>Зарегистрироваться</button>
      </Form>
    </Formik>
  )
}
