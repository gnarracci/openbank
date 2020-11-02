import { Card, CardContent, TextField, Typography } from "@material-ui/core";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Home() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Crea tu Password Manager</Typography>
        <Typography variant="h5">Cómo Funciona</Typography>
        <Typography variant="p">
          En primer lugar debes crear una contraseña diferente para sus
          pertenencias electrónicas. No pdrás recuperar tu contraseña, así que
          recuérdala bien.
        </Typography>
        <Typography variant="h5">Qué datos puedes guardar</Typography>
        <Typography variant="p">
          Por ejemplo, el número de tu tarjeta, el PIN y el PUK de tu teléfono
          móvil, el número de seria de uno de tus dispositivos o cualquier
          información que necesites tener en un lugar seguro.
        </Typography>

        <Typography variant="h4">Crea tu Password Manager</Typography>
        <Typography variant="p">
          En primer lugar, debes crear una contraseña diferente para sus
          pertenencias electronicas. No podrás recuperar tu contraseña, así que
          recuerdala bien.
        </Typography>

        <Formik
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

            <Typography variant="p">
              También puedes crear una pista que te ayude a recordar tu
              contraseña.
            </Typography>
            <Field
              name="comments"
              type="text"
              component={TextField}
              label="Crea tu pista (opcional)"
            />
          </Form>
        </Formik>

        <Typography variant="h4">
          Tu Contraseña a sido Creada Satisfactoriamente!
        </Typography>
      </CardContent>
    </Card>
  );
}
