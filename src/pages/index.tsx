import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Step,
  StepLabel,
  Stepper,
} from "@material-ui/core";
import { Field, Form, Formik, FormikConfig, FormikValues } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import React, { useState } from "react";
import { mixed, number, object } from "yup";

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

export default function Home() {
  return (
    <Card>
      <CardContent>
        <FormikStepper
          initialValues={{
            firstName: "",
            lastName: "",
            millionaire: false,
            money: 0,
            description: "",
          }}
          onSubmit={async (values) => {
            await sleep(3000);
            console.log("values", values);
          }}
        >
          <FormikStep label="Crea tu Contraseña Maestra">
            <Box paddingBottom={2}>
              <div>
                <h2>Crea tu Password Manager</h2>
                <h4>Cómo Funciona</h4>
                <p>
                  En primer lugar debes crear una contraseña diferente para sus
                  pertenencias electrónicas. No pdrás recuperar tu contraseña,
                  así que recuérdala bien.
                </p>
                <h4>Qué datos puede guardar</h4>
                <p>
                  Por ejemplo, el número de tu tarjeta, el PIN y el PUK de tu
                  teléfono móvil, el número de seria de uno de tus dispositivos
                  o cualquier información que necesites tener en un lugar
                  seguro.
                </p>
              </div>
            </Box>
          </FormikStep>
          <FormikStep
            label="Crea tu Contraseña Maestra"
            validationSchema={object({
              money: mixed().when("millionaire", {
                is: true,
                then: number()
                  .required()
                  .min(
                    1_000_000,
                    "Because you said you are a millionaire you need to have 1 million"
                  ),
                otherwise: number().required(),
              }),
            })}
          >
            <p>
              En primer lugar, debes crear una contraseña diferente para sus
              pertenencias electronicas. No podrás recuperar tu contraseña, así
              que recuerdala bien.
            </p>

            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="password"
                type="password"
                component={TextField}
                label="Crea tu Contraseña Maestra"
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="repassword"
                type="password"
                component={TextField}
                label="Repite tu Contraseña Maestra"
              />
            </Box>

            <p>
              También puedes crear una pista que te ayude a recordar tu
              contraseña.
            </p>

            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="comment"
                type="password"
                component={TextField}
                label="Crea tu pista para recordar tu contraseña (opcional)"
              />
            </Box>
          </FormikStep>
          <FormikStep label="Confirmación">
            <Box paddingBottom={2}>
              <h3>Contraseña Maestra Configurada! Desea Registrar?</h3>
            </Box>
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  );
}

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<
    FormikStepProps
  >[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}

          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Atrás
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting
                  ? "Registrando"
                  : isLastStep()
                  ? "Registrar"
                  : "Próximo"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
