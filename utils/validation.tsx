import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Имя должно содержать минимум 2 символа.')
    .required('Имя обязательно для заполнения.'),
  email: Yup.string()
    .email('Некорректный email.')
    .required('Email обязателен для заполнения.'),
  password: Yup.string()
    .min(6, 'Пароль должен содержать минимум 6 символов.')
    .required('Пароль обязателен для заполнения.'),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Некорректный email.')
    .required('Email обязателен для заполнения.'),
  password: Yup.string().required('Пароль обязателен для заполнения.'),
});

export const validateRegister = async (
  name: string,
  email: string,
  password: string
) => {
  return registerSchema.validate({ name, email, password });
};

export const validateLogin = async (email: string, password: string) => {
  return loginSchema.validate({ email, password });
};
