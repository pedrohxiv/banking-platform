import { AuthForm } from "../_components/auth-form";

const SignInPage = () => {
  return (
    <section className="flex items-center justify-center size-full max-sm:px-6">
      <AuthForm type="sign-in" />
    </section>
  );
};

export default SignInPage;
