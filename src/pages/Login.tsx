import { Box, Checkbox, FormControlLabel, InputAdornment } from '@mui/material';
import { EyeCloseIcon, EyeOpenIcon, LockIcon, SMSIcon } from 'assets';
import { Button } from 'components/atoms/Button';
import { Card } from 'components/atoms/Card';
import Input from 'components/atoms/Input';
import { Typography } from 'components/atoms/Typography';
import WrapAuth from 'components/organisms/WrapAuth';
import { PATHNAME } from 'configs/pathname';
import { useRouter } from 'hooks/useRouter';
import { useToast } from 'hooks/useToast';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { colors } from 'themes/common/colors';
import { isValidEmail } from 'utils/validation';

export type LoginFormData = {
  username: string;
  password: string;
  remember?: boolean;
};

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {},
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toast = useToast();

  const handleLogin = async (values: LoginFormData) => {
    try {
      router.push(PATHNAME.HOME);
      toast('Login successfully!', 'success');
    } catch (error: any) {
      const { message } = error || {};
      toast(message, 'error');
    }
  };

  return (
    <WrapAuth>
      <Card
        cardStyles={{
          width: '100%',
          maxWidth: { xs: '95%', md: '700px' },
          minWidth: '400px',
        }}
      >
        <Box
          sx={{
            padding: '32px',
          }}
          component="form"
          onSubmit={handleSubmit(handleLogin)}
        >
          <Box sx={{ mb: 5 }}>
            <Typography.Title variant="h1" styles={{ color: colors.black, textAlign: 'center' }}>
              Login to watch movies
            </Typography.Title>
          </Box>
          <Input
            id="username"
            placeholder="Email"
            fullWidth
            wrapInputStyles={{
              mb: 2,
            }}
            inputProps={{
              startAdornment: (
                <InputAdornment sx={{ mr: 0 }} position="start">
                  <SMSIcon />
                </InputAdornment>
              ),
              ...register('username', {
                required: 'Please typing email!',
                validate: (value) => {
                  const isValid = isValidEmail(value);
                  if (isValid) return undefined;
                  return 'Format email is not correctly!';
                },
              }),
            }}
            error={errors && Boolean(errors?.username?.message)}
            errorMessage={errors?.username?.message}
          />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            fullWidth
            wrapInputStyles={{
              mb: 2,
            }}
            inputProps={{
              startAdornment: (
                <InputAdornment sx={{ mr: 0 }} position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  sx={{ cursor: 'pointer' }}
                  onClick={() => setShowPassword((prev) => !prev)}
                  position="end"
                >
                  {showPassword ? <EyeOpenIcon /> : <EyeCloseIcon />}
                </InputAdornment>
              ),
              ...register('password', {
                required: 'Please typing password!',
                validate: (value) => {
                  if (!value) return;
                  if (value.length < 6) return 'Password need min 6 characters!';
                  return undefined;
                },
              }),
            }}
            error={errors && Boolean(errors?.password?.message)}
            errorMessage={errors?.password?.message}
          />
          <Box
            sx={{
              width: '100%',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
              <FormControlLabel
                sx={{
                  m: 0,
                  userSelect: 'none',
                  '& .MuiFormControlLabel-label': {
                    paddingLeft: '5px',
                  },
                }}
                label="Save password"
                control={
                  <Checkbox
                    sx={{ padding: 0 }}
                    disableRipple
                    {...register('remember')}
                    id="remember"
                  />
                }
              />
            </Box>
            <Link
              onClick={() => {
                toast(
                  'The function is updating, please enter the required login format correctly!',
                  'error',
                );
              }}
              to={''}
              style={{ textDecoration: 'none' }}
            >
              <Typography.Text variant="h6" styles={{ color: colors.main }}>
                Forgot password?
              </Typography.Text>
            </Link>
          </Box>
          <Button fullWidth buttonProps={{ type: 'submit' }}>
            Sign in
          </Button>
          <Typography.Text variant="h6" styles={{ mt: 2, textAlign: 'center' }}>
            Do you not account?{' '}
            <Link
              onClick={() => {
                toast(
                  'The function is updating, please enter the required login format correctly!',
                  'error',
                );
              }}
              style={{ color: colors.main, textDecoration: 'none' }}
              to={''}
            >
              Sign up
            </Link>
          </Typography.Text>
          <Typography.Text
            variant="body1"
            styles={{
              color: colors.black,
              textAlign: 'center',
              marginTop: '10px',
            }}
          >
            Contact: <strong>(+84) 37 6600 676</strong>
          </Typography.Text>
        </Box>
      </Card>
    </WrapAuth>
  );
};

export default Login;
