import { Card, CardContent, TextField, Typography } from "@material-ui/core";
import { Field, Form, Formik } from "formik";

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
          initialValues={{
            password: "",
            repassword: "",
            comment: "",
          }}
          onSubmit={() => {}}
        >
          <Form autoComplet="off">
            <Field
              name="password"
              component={TextField}
              label="Crea tu Contraseña"
            />
            <Field
              name="repass"
              component={TextField}
              label="Repita su Contraseña"
            />

            <Typography variant="p">
              También puedes crear una pista que te ayude a recordar tu
              contraseña.
            </Typography>
            <Field
              name="comment"
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
