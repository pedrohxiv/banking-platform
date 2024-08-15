import Image from "next/image";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <main className="flex min-h-screen w-full justify-between">
      {children}
      <div className="flex h-screen w-full sticky top-0 items-center justify-end bg-sky-50 max-lg:hidden">
        <Image
          src="/icons/auth-image.svg"
          height={500}
          width={500}
          alt="auth-image"
        />
      </div>
    </main>
  );
};

export default AuthLayout;
