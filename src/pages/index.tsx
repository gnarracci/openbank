import { Card, CardContent, TextField, Typography } from "@material-ui/core";
import { Field, Form, Formik, FormikConfig, FormikValues } from "formik";
import * as Yup from "yup";

export default function Home() {
  return (
    <Card>
      <CardContent>
        <FormikStepper
          validationSchema={Yup.object().shape({
            password: Yup.string()
              .max(25, "Máximo 25 caracteres")
              .min(8, "Mínimo 8 caracteres")
              .required("No ha ingresado Contraseña")
              .matches(
                /^[^A-Z]*[A-Z][^A-Z][0-9]*$/,
                "La Contraseña debe contener al menos un número y una Mayúscula."
              ),
            repassword: Yup.string()
              .max(25, "Máximo 25 caracteres")
              .min(8, "Mínimo 8 caracteres")
              .oneOf(
                [Yup.ref("password"), null],
                "Las Contraseñas deben coincidir"
              )
              .required("Debe repetir la Contraseña")
              .matches(/[a-zA-Z]/, "La Contraseña solo debe contener letras."),
            comments: Yup.string().max(255, "Máximo 255 caracteres"),
          })}
          initialValues={{
            password: "",
            repassword: "",
            comments: "",
          }}
          onSubmit={() => {}}
        >
          <Form autoComplete="off">
            <div>
              <h2>Crea tu Password Manager</h2>
              <h4>Cómo Funciona</h4>
              <p>
                En primer lugar debes crear una contraseña diferente para sus
                pertenencias electrónicas. No pdrás recuperar tu contraseña, así
                que recuérdala bien.
              </p>
              <h4>Qué datos puede guardar</h4>
              <p>
                Por ejemplo, el número de tu tarjeta, el PIN y el PUK de tu
                teléfono móvil, el número de seria de uno de tus dispositivos o
                cualquier información que necesites tener en un lugar seguro.
              </p>
            </div>

            <div>
              <h2>Crea tu Password Manager</h2>
              <p>
                En primer lugar, debes crear una contraseña diferente para sus
                pertenencias electronicas. No podrás recuperar tu contraseña,
                así que recuerdala bien.
              </p>
              <Field
                name="password"
                type="password"
                component={TextField}
                label="Crea tu Contraseña"
              />
              <Field
                name="repassword"
                type="password"
                component={TextField}
                label="Repita su Contraseña"
              />

              <p>
                También puedes crear una pista que te ayude a recordar tu
                contraseña.
              </p>
              <Field
                name="comments"
                type="text"
                component={TextField}
                label="Crea tu pista (opcional)"
              />
            </div>

            <div>
              <h2>Tu Contraseña ha sido creada satisfactoriamente!</h2>
            </div>
          </Form>
        </FormikStepper>
      </CardContent>
    </Card>
  );
}

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues>) {
  return (
    <Formik {...props}>
      <Form autoComplete="off">{children}</Form>
    </Formik>
  );
}
