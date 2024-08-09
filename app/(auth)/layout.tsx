interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return <main>{children}</main>;
};

export default AuthLayout;
